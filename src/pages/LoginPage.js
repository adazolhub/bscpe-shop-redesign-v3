const LoginPage = () => {
    return (
        <div className="grid place-content-center min-h-[calc(100vh-70px)] w-full">
            <div className=" bg-gray-200 shadow-lg rounded-lg p-4">
                <h1>Sign in</h1>
                <form action="/" method="post" className="flex flex-col gap-2">
                    <input type="text" name="username" />
                    <input type="password" name="password" />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage