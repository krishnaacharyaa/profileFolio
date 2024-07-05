import { useFormContext } from "react-hook-form"

interface Language {
    language: string;
    fluency: string;
}

export default function Languages() {
    const { watch } = useFormContext();
    const languages: Language[] = watch("languages");

    const formattedLanguages = languages?.map(lang =>
        lang.fluency ? `${lang.language}(${lang.fluency})` : lang.language
    ).join(", ");

    return languages?.length > 0 ? (
        <div className="flex flex-col gap-1 mt-2">
            <h1 className='text-xl font-semibold border-b border-slate-500'>Languages</h1>
            <div className="px-2">
                <span className="capitalize font-semibold text-sm">{formattedLanguages}</span>
            </div>
        </div>
    ) : null;
}
