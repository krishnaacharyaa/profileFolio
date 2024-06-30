import Link from "next/link"


export default function Mainhome() {
    
    return (
        <div className="flex items-center justify-center mt-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Homepage</h1>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
            <Link href={"/dashboard"}>
            Dashboard
            </Link>
          
          </button>
        </div>
      </div>
    )
}