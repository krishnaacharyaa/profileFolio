import React from 'react'
import { Resume } from './Resume'

export default function ResumeView() {
    return (
        <div className='bg-[#f3f7f7] overflow-hidden mb-4'>
            <div className='flex justify-center overflow-y-scroll h-screen scrollbar-thin'>
                <Resume />
            </div>
        </div>
    )
}
