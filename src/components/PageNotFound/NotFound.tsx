import React from 'react'

const NotFound = () => {
    return (
        <>
            <div className="grid w-full min-h-[calc(100vh-10em)] place-content-center">
                {" "}
                <h2 className="font-medium text-center text-gray-600 text-8xl">404</h2>
                <p className="text-lg font-thin text-center text-gray-500">
                    {" "}
                    Page not found
                </p>
            </div>
            <div className="flex w-full pb-8">
                <a href="/#list" className="mx-auto btn-secondary">
                    {" "}
                    Go back
                </a>
            </div>
        </>
    );
}

export default NotFound