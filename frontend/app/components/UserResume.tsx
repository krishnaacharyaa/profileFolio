'use client'
import React, { useState } from 'react'

const UserResume = () => {
    const [selectedButton, setSelectedButton] = useState('resume');
    const lib: any = { 'resume': [1, 2, 3], 'portfolio': ['1'] }

    const handleClick = (buttonId: any) => {
        setSelectedButton(buttonId);
    };

    return (
        <div className='my-4 mx-2'>
            <h1 className='text-xl font-bold'>My Collection</h1>
            <div className='my-2 grid grid-cols-2'>
                <div>
                    <h3 className='font-medium mb-2'>Resume</h3>
                    <div className='grid grid-cols-4 w-fit gap-4'>
                        {lib ? lib['resume'].map((element: any) => {
                            console.log(element)
                            return <div className='h-44 w-32 bg-black'>{element}</div>
                        }) : null}
                        <div className='h-44 w-32 flex justify-center items-center bg-slate-100'>New +</div>
                    </div>
                </div>
                <div>
                    <h3 className='font-medium mb-2'>Portfolio</h3>
                    <div className='grid grid-cols-4 w-fit gap-4'>
                        {lib ? lib['portfolio'].map((element: any) => {
                            console.log(element)
                            return <div className='h-44 w-32 bg-black'>{element}</div>
                        }) : null}
                        <div className='h-44 w-32 flex justify-center items-center bg-slate-100'>New +</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

{/* <div className='flex flex-col'>
                    <h3 className='text-lg font-semibold'>Resume</h3>
                </div> */}

export default UserResume
