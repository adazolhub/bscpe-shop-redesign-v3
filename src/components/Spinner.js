
function Spinner() {
    return (
        <div className="grid w-full place-content-center">
            <svg className="animate-spin" width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 2.66663V7.99996" stroke="#212121" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 24V29.3333" stroke="#BDBDBD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6.5733 6.57336L10.3466 10.3467" stroke="#424242" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21.6533 21.6533L25.4267 25.4267" stroke="#BDBDBD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2.66666 16H7.99999" stroke="#757575" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M24 16H29.3333" stroke="#BDBDBD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6.5733 25.4267L10.3466 21.6533" stroke="#9E9E9E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21.6533 10.3467L25.4267 6.57336" stroke="#BDBDBD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

        </div>
    )
}

export default Spinner