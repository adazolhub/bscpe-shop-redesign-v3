import { useState, useEffect, createContext, useContext } from "react";
import { auth, db } from "../auth/firebase";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { collection, limit, onSnapshot, query } from "firebase/firestore";
import AccountState from "./AccountState";

const AuthContext = createContext();

let productRef = collection(db, "products");

class Product {
  constructor(
    product_id,
    product_name,
    product_description,
    product_image,
    product_quantity,
    product_price,
    product_category
  ) {
    this.product_id = product_id;
    this.product_name = product_name;
    this.product_description = product_description;
    this.product_image = product_image;
    this.product_quantity = product_quantity;
    this.product_price = product_price;
    this.product_category = product_category;
  }

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

export const AuthProvider = ({ children }) => {
  /** This suspend code used as buffer for initial auth state
   *   as getting initial state value of null when page is hard reloaded from url
   *  the auth state observer is not updating the global user state at context provider realtime (BUG)
   */

  const [privateUser, setPrivateUser] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("user-logged-in") === "yes"
  );

  //Account Reducer - (getUser) listen for change on login state
  let { getUser, user: currentUser } = AccountState();

  //EMAIL AND PASSWORD FIREBASE AUTH PROVIDER (SIGN UP)
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //EMAIL AND PASSWORD FIREBASE AUTH PROVIDER (SIGN IN)
  const signin = (email, password) => {
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
    let unsubscribe = getUser(auth);

    return () => {
      localStorage.setItem("user-logged-in", "no");
      unsubscribe();
    };
  }, []);

  let [list, setList] = useState([]);

  useEffect(() => {
    let q = query(productRef, limit(24));
    let unsub = onSnapshot(q, (snapshot) => {
      let qList = [];
      snapshot.forEach((doc) => {
        qList.push(
          new Product(
            doc.id,
            doc.data().product_name,
            doc.data().product_description,
            doc.data().product_image,
            doc.data().product_quantity,
            doc.data().price,
            doc.data().product_category
          ).get()
        );
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
