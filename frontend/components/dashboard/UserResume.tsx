'use client';

import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IoMdAdd } from 'react-icons/io';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function UserResume() {
  const router = useRouter();

  const handleNewResume = () => {
    router.push('/resume-builder');
  };

  const handlePortfolio = () => {
    router.push("/portfolio-builder")
  }

  return (
    <div className="w-full mx-3 py-4 md:py-4 lg:py-4">
      <h2 className="text-3xl font-bold tracking-tight mb-8 md:mb-10 lg:mb-12">My Collections</h2>
      <div className="grid w-full border-2 border-red-600 grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
        <div>
          <h3 className="text-xl font-semibold mb-4 md:mb-6">Resume</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            <div className="relative overflow-hidden rounded-lg border p-2 shadow-lg group hover:shadow-xl ">
              <Link href="#" className="absolute z-10" prefetch={false}>
                <span className="sr-only">View</span>
              </Link>
              <img
                src="/svg/portfolio.jpeg"
                alt="Resume Image 1"
                width={300}
                height={400}
                className="object-cover w-full aspect-[3/4]"
              />
              <div className="flex mx-3 justify-between">
                <h3>Name</h3>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Image
                      width={100}
                      height={100}
                      alt="menu"
                      className="h-5 w-5"
                      src={'/svg/dots.png'}
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div
              onClick={handleNewResume}
              className="relative overflow-hidden cursor-pointer rounded-lg border p-2 shadow-lg group hover:shadow-xl flex justify-between items-center"
            >
              <p className="mx-auto">
                <IoMdAdd className="text-2xl" />
              </p>
            </div>
          </div>
        </div>
        <div className=' border-2 border-blue-700' onClick={handlePortfolio}>
          <h3 className="text-xl font-semibold mb-4 md:mb-6">Portfolio</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            <div className="relative border-yellow-500 justify-self-end overflow-hidden rounded-lg border p-2 shadow-lg group hover:shadow-xl ">
              <Link href="#" className="absolute z-10" prefetch={false}>
                <span className="sr-only">View</span>
              </Link>
              <img
                src="/svg/portfolio.jpeg"
                alt="Portfolio Image 1"
                width={300}
                height={400}
                className="object-cover w-full aspect-[3/4]"
              />
              <div className="flex mx-3 justify-between">
                <h3>Name</h3>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Image
                      width={100}
                      height={100}
                      alt="menu"
                      className="h-5 w-5"
                      src={'/svg/dots.png'}
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
