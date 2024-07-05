'use client'

import { FieldValues, FormProvider, useForm } from "react-hook-form"

export const FormProviders = ({children}:Readonly<{
    children: React.ReactNode;
  }>)=>{
    const methods = useForm();
    const onSubmit = async (data: FieldValues)=>console.log(data)
    return <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
            {children}
        </form>
    </FormProvider>
}