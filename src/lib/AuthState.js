import { auth } from "../auth/firebase"
import { onAuthStateChanged } from "firebase/auth"


async function getInitialAuthState() {
    return new Promise((resolve) => {
        setTimeout(() => {
            let unsub = onAuthStateChanged(auth, (currentUser) => {
                resolve(currentUser)
                unsub();
            })
        }, 10);
    })

}

export { getInitialAuthState }