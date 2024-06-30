import { useFormContext } from 'react-hook-form'

export const BasicDetails = ()=>{
    const { watch } = useFormContext()
    
    return <div className="flex flex-col">
    <div className="text-3xl text-center font-medium">{watch('name')}</div>
    <div className="text-center text-sm font-light">{watch('label')}</div>
    <div className="flex justify-center text-sm font-light">
        <div className=" border-r-2 border-gray-500 px-1">{watch('email')}</div>
        <div className="px-1 border-r-2 border-gray-500">{watch('phone')}</div>
        <div  className="border-r-2 border-gray-500 px-1">
           <a href="http://www.github.com/PatelYash7" target="_blank">
                Github
           </a>
        </div>
        <div  className="px-1">
            <a href="http://www.linkedin.com/in/yash-patel-86666b1b9" target="_blank">
                LinkedIN
           </a>
        </div>
    </div>
  </div>
}