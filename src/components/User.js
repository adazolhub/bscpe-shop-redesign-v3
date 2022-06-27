import { UserAuth } from '../lib/Auth';


const User = () => {

    const { currentUser } = UserAuth()

    return (
        <>
            <p>{currentUser?.email}</p>
            <p>{currentUser?.displayName}</p>

        </>
    )
}

export default User