export const Navbar = ()=>{
    return(
        <div className="flex justify-between items-center h-8 font-semibold bg-blue-300 px-4 top-0 sticky z-10">
            <div>ProfileFolio</div>
            <div className="flex gap-2 justify-evenly items-center">
                <div>Resume</div>
                <div>Portfolio</div>
                <div>Profile</div>
            </div>
        </div>
    )
}