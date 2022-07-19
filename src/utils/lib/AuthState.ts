import { auth } from "../../auth/firebase"
import { onAuthStateChanged } from "firebase/auth"


function getInitialAuthState() {
    return new Promise((resolve) => {

        let unsub = onAuthStateChanged(auth, (currentUser) => {
            resolve(currentUser)
            unsub();
        })
    })

}

export { getInitialAuthState }