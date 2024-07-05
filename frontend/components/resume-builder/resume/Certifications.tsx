import { ExternalLink } from "lucide-react"
import { useFormContext } from "react-hook-form"

interface Certificates {
    name: ""
    url?: ""
    issuer?: ""
}
export default function Certifications() {
    const { watch } = useFormContext()
    const certificates = watch("certificates") as Certificates[]
    return certificates?.length > 0 && (
        <div className="flex flex-col gap-1 mt-2">
            <h1 className='text-xl font-semibold border-b border-slate-500'>Certificates</h1>
            {
                certificates?.map((certificate, index) => (
                    <div key={index} className="px-2">
                        <div className="flex items-center justify-between">
                            {certificate?.url ? (
                                <div className='flex items-center gap-2'>
                                    <a href={certificate.url} target="_blank" className="font-semibold text-xl">{certificate.name}</a>
                                    <ExternalLink size={15} />
                                </div>
                            ) : (
                                <h1 className="font-semibold text-xl">{certificate.name}</h1>
                            )}
                            <p className="font-light text-sm">{certificate.issuer}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
