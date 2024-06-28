import React, { useState } from 'react'
import RadialProfileCard from '../components/radialProfileCard'
import UserResume from '../components/UserResume'

const Dashboard = () => {

    return (
        <div className='flex flex-col px-8 py-4 bg-slate-200'>
            <div className='flex'>
                <RadialProfileCard />
                <div className='w-9/12 mx-2 flex flex-col'>
                    <div className='bg-[#a8c7e0] rounded-md px-4 pr-8 py-3'>
                        <p className='text-sm'>Fun fact from your Profile</p>
                        <div className='flex justify-between'>
                            <h1 className='font-semibold text-lg'>You Are 5% Likely To Be Replaced By AI</h1>
                            <p className='font-semibold text-lg underline cursor-pointer tracking-tighter'>Why!?</p>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-3 my-4'>
                        <div className='bg-slate-100 rounded-lg py-3 px-4'>
                            <h3 className='font-bold'>Generate AI Resume</h3>
                            <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime at aliquid quisquam velit ducimus eos.</p>
                        </div>
                        <div className='bg-slate-100 rounded-lg py-3 px-4'>
                            <h3 className='font-bold'>Generate AI Cover Letter</h3>
                            <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime at aliquid quisquam velit ducimus eos.</p>
                        </div>
                        <div className='bg-slate-100 rounded-lg py-3 px-4'>
                            <h3 className='font-bold'>Generate AI Resume</h3>
                            <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime at aliquid quisquam velit ducimus eos.</p>
                        </div>
                        <div className='bg-slate-100 rounded-lg py-3 px-4'>
                            <h3 className='font-bold'>Generate AI Resume</h3>
                            <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime at aliquid quisquam velit ducimus eos.</p>
                        </div>
                    </div>
                </div>
            </div>
            <UserResume/>
        </div>
    )
}

export default Dashboard
