import React from 'react'

const MaxWidth = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className=' max-w-11/12 mx-auto  ' >
            {children}
        </div>
    )
}

export default MaxWidth