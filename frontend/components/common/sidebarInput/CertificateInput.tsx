"use client"
import { Button } from '@/components/ui/button'
import { ChevronDown, Star, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { InputWithLabel } from '../InputWithLabel'
import { DatePickerDemo } from '@/components/ui/date'

export default function CertificateInput() {
    const [certificate, setShowCertificate] = useState(false)
    return (
        <div className='py-4 px-3 flex flex-col gap-4'>
            <div className='flex justify-between items-center cursor-pointer' onClick={() => setShowCertificate(!certificate)}>
                <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 rounded-full flex justify-center items-center bg-slate-300'>
                        <Star size={15} />
                    </div>
                    <span className='text-slate-500 text-base'>Certificates</span>
                </div>
                <ChevronDown className={`text-slate-400 cursor-pointer transform transition-transform duration-300 ${certificate ? 'rotate-180' : ''}`} size={20} />
            </div>
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${certificate ? 'block' : 'hidden'}`}>
                <ListOfCertificates />
            </div>
        </div>
    )
}

interface Props {
    showInputs: boolean;
}

export function ListOfCertificates() {
    const [certificates, setCertificates] = useState<Props[]>([]);

    const toggleInputs = (index: number) => {
        const newCertificate = [...certificates];
        newCertificate[index].showInputs = !newCertificate[index].showInputs;
        setCertificates(newCertificate);
    };

    const addCertificate = () => {
        setCertificates([...certificates, { showInputs: false }]);
    };

    const deleteCertificate = (index: number) => {
        const newCertificate = certificates.filter((_, i) => i !== index);
        setCertificates(newCertificate);
    };
    return (
        <div className='flex flex-col gap-3 px-2'>
            {certificates.map((certificate, index) => (
                <div key={index}>
                    <div
                        className='flex justify-between items-center px-4 py-4 cursor-pointer'
                        onClick={() => toggleInputs(index)}
                    >
                        <h1 className='text-slate-600 font-semibold text-base'>Certificate name</h1>
                        <div className='flex gap-3 items-center'>
                            <Trash2 size={20} className='text-slate-400 cursor-pointer' onClick={(e) => {
                                e.stopPropagation();
                                deleteCertificate(index);
                            }} />
                            <ChevronDown size={20} className={`text-slate-400 cursor-pointer transform transition-transform duration-300 ${certificate.showInputs ? 'rotate-180' : ''}`} />
                        </div>
                    </div>
                    {certificate.showInputs && <CertificateInputs />}
                </div>
            ))}
            <Button variant={'outline'} onClick={addCertificate}>
                + Add Certificate
            </Button>
        </div>
    )
}

function CertificateInputs() {
    return (

        <div className='flex flex-col gap-3 px-4'>
            <InputWithLabel label='Certificate name' name='name' type='text' placeholder='Full stack developer' />
            <InputWithLabel label='Certificate link' name='url' type='url' placeholder='Certificate link' />
            <InputWithLabel label='Issued by' name='issuer' type='text' placeholder='Udemy , Coursera' />
            <DatePickerDemo />
        </div>
    )
}
