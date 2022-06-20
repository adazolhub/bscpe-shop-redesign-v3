const Heading = () => {

    return (
        <header className="bg-gray-800 px-2 text-gray-300 font-thin text-xs shadow-gray-400 shadow-md">
            <nav className="flex justify-between items-center container mx-auto min-h-[48px]">
            <div className="logo ">
                BSCPE STORE <span className="bg-gray-900 px-2 py-1 rounded-md text-center items-center font-light text-emerald-500 text-[0.75em] ml-2">Beta</span>
            </div>
            <div className="side flex items-center gap-2">
                <ul>
                    <li>

                    </li>
                </ul>
                <a className="px-1  rounded-md" href="/">
                <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M20.6485 40.212C21.6845 41.366 23.0145 42 24.3945 42H24.3965C25.7825 42 27.1185 41.366 28.1565 40.21C28.7125 39.596 29.6605 39.546 30.2745 40.1C30.8905 40.654 30.9405 41.604 30.3865 42.218C28.7705 44.012 26.6445 45 24.3965 45H24.3925C22.1505 44.998 20.0285 44.01 18.4185 42.216C17.8645 41.602 17.9145 40.652 18.5305 40.1C19.1465 39.544 20.0945 39.594 20.6485 40.212ZM24.4941 2C33.3841 2 39.3561 8.924 39.3561 15.39C39.3561 18.716 40.2021 20.126 41.1001 21.622C41.9881 23.098 42.9941 24.774 42.9941 27.942C42.2961 36.036 33.8461 36.696 24.4941 36.696C15.1421 36.696 6.69011 36.036 6.00009 28.07C5.99411 24.774 7.00011 23.098 7.88811 21.622L8.2016 21.0943C8.97346 19.7677 9.63211 18.3247 9.63211 15.39C9.63211 8.924 15.6041 2 24.4941 2ZM24.4941 5C17.5041 5 12.6321 10.476 12.6321 15.39C12.6321 19.548 11.4781 21.47 10.4581 23.166C9.64011 24.528 8.99411 25.604 8.99411 27.942C9.32811 31.714 11.8181 33.696 24.4941 33.696C37.1001 33.696 39.6681 31.626 40.0001 27.812C39.9941 25.604 39.3481 24.528 38.5301 23.166C37.5101 21.47 36.3561 19.548 36.3561 15.39C36.3561 10.476 31.4841 5 24.4941 5Z" fill="#B2B4BA"/>
                </svg>



                </a>
            </div>
            </nav>
        </header>
    )
}


export default Heading