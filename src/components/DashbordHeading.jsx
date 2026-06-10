import React from 'react'

const DashbordHeading = ({title,description}) => {
    return (
        <div className='p-5'>
            <div className='border-b border-white/10 space-y-3 pb-3'>
                <h1 className='text-3xl font-extrabold '>{title}</h1>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default DashbordHeading
