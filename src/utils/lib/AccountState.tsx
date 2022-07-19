import { Auth, onAuthStateChanged, Unsubscribe } from "firebase/auth";
import { doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { createContext, useContext, useReducer } from "react";
import { db } from "../../auth/firebase";
import accountReducer, { initialAcountState } from "./accountReducer";
import config from "../../config.json";



interface UID { uid?: string | null } 



const AccountContext = createContext(initialAcountState);

export const AccountStateProvider = ({ children } : { children: JSX.Element | JSX.Element[] | null } ) => {
  const [state, dispatch] = useReducer(accountReducer, initialAcountState);

  //User state listener
  const getUser = (auth: Auth ) => {
    let unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        let { auth, accessToken, stsTokenManager, ...userAuth } : any = user;

        console.log("😉 > logged in");
        getPaymentInfo(userAuth);
        getShipping(userAuth);

        dispatch({
          type: "GET_USER",
          payload: {
            user: userAuth,
          },
        });
      } else {
        getPaymentInfo(null);
        getShipping(null);

        dispatch({
          type: "GET_USER",
          payload: {
            user: null,
          },
        });
      }
    });
    return unsubscribe;
  };

  //get payment information (virtual card) from firestore database dependent with currentuser logged in
  const getPaymentInfo = (user :  UID | null ) => {
    if (user) {
      let paymentRef = doc(db, `${config.USER}${user?.uid}${config.PAYMENT}`);
      onSnapshot(paymentRef, (doc) => {
        dispatch({
          type: "GET_PAYMENT",
          payload: {
            payment: doc.data(),
          },
        });
      });
    } else {
      dispatch({
        type: "GET_PAYMENT",
        payload: {
          payment: null,
        },
      });
    }
  };



  const updatePaymentInfo = async (user : UID, cardNumber: number, cardHolder: string, bank: string) => {
    if (user) {
      let paymentRef = doc(db, `${config.USER}${user?.uid}${config.PAYMENT}`);

      if (cardNumber || cardHolder || bank) {
        updateDoc(paymentRef, {
          cardNumber: cardNumber || state?.payment?.cardNumber,
          cardHolder: cardHolder || state?.payment?.cardHolder,
          bank: bank || state?.payment?.bank,
        })
          .then((data) => {
            console.log("> modfied payment successfully ", data);
          })
          .catch((error) => {
            console.log("> modifying payment error occurred :", error);
          });
      }
    }
  };

  //get shipping address information from firestore database dependent with currentuser logged in
  const getShipping = (user :  UID | null ) => {
    if (user) {
      let shippingRef = doc(db, `${config.USER}${user?.uid}${config.ADDRESS}`);
      onSnapshot(shippingRef, (doc) => {
        dispatch({
          type: "GET_SHIPPING",
          payload: {
            shipping: doc.data(),
          },
        });
      });
    } else {
      dispatch({
        type: "GET_SHIPPING",
        payload: {
          shipping: null,
        },
      });
    }
  };

  const addShipping = async (
    user : UID,
    recipient : string,
    address : string,
    city : string,
    zipcode : number,
    contact : number
  ) => {
    if (user) {
      let docRef = doc(db, `${config.USER}${user?.uid}${config.ADDRESS}`);

      if (recipient || address || city || zipcode || contact) {
        setDoc(docRef, {
          uid: user?.uid,
          recipient: recipient || state?.shipping?.recipient,
          address: address || state?.shipping?.address,
          city: city || state?.shipping?.city,
          zipcode: zipcode || state?.shipping?.zipcode,
          contact: contact || state?.shipping?.contact,
        })
          .then((data) => {
            console.log("> address successfully added", data);
          })
          .catch((error) => {
            console.log("> address error occurred :", error);
          });
      }
    }
  };

  const updateShipping = async (
    user : UID,
    recipient : string,
    address : string,
    city : string,
    zipcode : number,
    contact : number
  ) => {
    if (user) {
      if (recipient || address || city || zipcode || contact) {
        updateDoc(doc(db, `${config.USER}${user?.uid}${config.ADDRESS}`), {
          recipient: recipient || state?.shipping?.recipient,
          address: address || state?.shipping?.address,
          city: city || state?.shipping?.city,
          zipcode: zipcode || state?.shipping?.zipcode,
          contact: contact || state?.shipping?.contact,
        })
          .then((data) => {
            console.log("> modfied address successfully ", data);
          })
          .catch((error) => {
            console.log("> modifying address error occurred :", error);
          });
      }
    }
  };

  let value: {
    user: {} | null,
    payment: {} | null,
    shipping: {} | null,
    getUser: (auth: Auth) => Unsubscribe,
    getPaymentInfo(user: UID | null): void,
    updatePaymentInfo(user: UID, cardNumber: number, cardHolder: string, bank: string) : Promise<void>,
    getShipping(user: UID | null): void,
    addShipping(uuser: UID, recipient: string, address: string, city: string, zipcode: number, contact: number): Promise<void>,
    updateShipping(user: UID, recipient: string, address: string, city: string, zipcode: number, contact: number): Promise<void>,
  } = {
    user: state?.user,
    payment: state?.payment,
    shipping: state?.shipping,
    getUser,
    getPaymentInfo,
    updatePaymentInfo,
    getShipping,
    addShipping,
    updateShipping,
  };

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
};

const AccountState = () => {
  return useContext(AccountContext);
};

export default AccountState;
