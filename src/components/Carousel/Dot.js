import React from 'react'

const Dot = ({ length, activeIndex, setActiveIndex }) => {
    return (
        <div className='absolute -translate-x-1/2 bottom-2 left-1/2'>
            {new Array(length).fill("").map((_, i) => (

                <span className={['rounded-full mx-1 inline-block cursor-pointer transition-transform delay-150 scale-90',
                    i === activeIndex ? " bg-gray-100/40 w-2 h-2 ring-1 ring-offset-0 ring-gray-200 scale-110" : "w-2 h-2 bg-gray-200/20 scale-90"
                ].join(" ")}
                    onClick={() => setActiveIndex(i)}
                />
            ))}
        </div>
    )
}

export default Dot