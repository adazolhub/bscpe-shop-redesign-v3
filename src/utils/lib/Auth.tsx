import { useState, useEffect, createContext, useContext } from "react";
import { auth, db } from "../../auth/firebase";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  Unsubscribe,
  Auth,
} from "firebase/auth";
import { collection, limit, onSnapshot, query } from "firebase/firestore";
import AccountState from "./AccountState";

const AuthContext = createContext({});

interface JSX {
  [key: string]: JSX.Element | JSX.Element[] | null;
}

interface ViewProduct {
  get(): void;
}

let productRef = collection(db, "products");

class Item implements ViewProduct {
  product_id?: string;
  product_name?: string;
  product_description?: string;
  product_image?: string;
  product_quantity?: number;
  product_price?: number;
  product_category?: string;
  get(): never;

  get() {
    return {
      product_id: this.product_id,
      product_name: this.product_name,
      product_description: this.product_description,
      product_image: this.product_image,
      product_quantity: this.product_quantity,
      product_price: this.product_price || null,
      product_category: this.product_category,
    };
  }
}

class Product extends Item {
  constructor(
    product_id?: string,
    product_name?: string,
    product_description?: string,
    product_image?: string,
    product_quantity?: number,
    product_price?: number,
    product_category?: string
  ) {
    super();
    this.product_id = product_id;
    this.product_name = product_name;
    this.product_description = product_description;
    this.product_image = product_image;
    this.product_quantity = product_quantity;
    this.product_price = product_price;
    this.product_category = product_category;
  }
}

export const AuthProvider = ({ children }: JSX) => {
  /** This suspend code used as buffer for initial auth state
   *   as getting initial state value of null when page is hard reloaded from url
   *  the auth state observer is not updating the global user state at context provider realtime (BUG)
   */

  const [privateUser, setPrivateUser] = useState(null);

  const [isLoggedIn] = useState(
    localStorage.getItem("user-logged-in") === "yes"
  );

  //Account Reducer - (getUser) listen for change on login state
  let {
    user: currentUser,
    getUser,
  }: {
    user: {} | null | undefined;
    payment: {} | null | undefined;
    shipping: {} | null | undefined;
    getUser?: (auth: Auth) => Unsubscribe;
  } = AccountState();

  //EMAIL AND PASSWORD FIREBASE AUTH PROVIDER (SIGN UP)
  const createUser = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //EMAIL AND PASSWORD FIREBASE AUTH PROVIDER (SIGN IN)
  const signin = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  //LOGOUT FIREBASE AUTH
  const logout = () => {
    // setCurrentUser(null);
    return signOut(auth).then(() => {
      localStorage.setItem("user-logged-in", "no");
      setPrivateUser(null);
    });
  };

  //FIREBASE CURRENT LOGGED USER OBSERVER
  useEffect(() => {
    let unsubscribe = getUser!(auth);
    return () => {
      localStorage.setItem("user-logged-in", "no");
      if (unsubscribe) {
        unsubscribe();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let [list, setList] = useState([]);

  useEffect(() => {
    let q = query(productRef, limit(24));
    let unsub = onSnapshot(q, (snapshot) => {
      let qList: [] = [];
      snapshot.forEach((doc: any) => {
        let item = new Product(
          doc?.id,
          doc?.data()?.product_name,
          doc?.data()?.product_description,
          doc?.data()?.product_image,
          doc?.data()?.product_quantity,
          doc?.data()?.price,
          doc?.data()?.product_category
        );
        qList.push(item?.get());
      });
      setList([...qList]);
    });
    return () => {
      unsub();
    };
  }, []);

  console.log("> auth provider re-rendered");

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        privateUser,
        createUser,
        logout,
        signin,
        list,
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
