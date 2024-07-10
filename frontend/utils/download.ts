import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'


export const handelDownload = async (filename:string,id:string)=>{
    try {
        const Capture :HTMLElement | null = document.getElementById(id)
        if(!Capture){
            throw 'err'
        }

        const Canvas = await html2canvas(Capture)
        const Imagedata = Canvas.toDataURL("img/png")
        const Doc = new jsPDF('p','px','a4')
        const Width = Doc.internal.pageSize.getWidth()
        const Height = Doc.internal.pageSize.getHeight()
        Doc.addImage(Imagedata,'PNG',0,0,Width,Height)
        Doc.save(filename)
    } catch (error) {
        throw error
        
    }
}