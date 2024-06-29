import Sidebar from "@/components/common/Sidebar";
import ResumeHeader from "@/components/resume-builder/ResumeHeader";
import ResumeView from "@/components/resume-builder/ResumeView";



export default function Page() {
    return (
        <div className="h-full px-12">
            <ResumeHeader />
            <hr />
            <div className="mt-7 flex justify-between h-full">
                <Sidebar />
                <ResumeView />
            </div>
        </div>
    )
}