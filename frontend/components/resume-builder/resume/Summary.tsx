import { useFormContext } from 'react-hook-form'

export default function Summary() {
    const { watch } = useFormContext()

    const summary = watch('personalInfo.summary')
    return summary && (
        <div className='flex flex-col gap-1 mt-2'>
            <h1 className='text-xl font-semibold border-b border-slate-500'>Summary</h1>
            <p className='text-base font-light px-2'>{summary}</p>
        </div>
    )
}
