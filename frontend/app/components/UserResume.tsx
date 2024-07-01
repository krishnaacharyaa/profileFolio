/**
 * v0 by Vercel.
 * @see https://v0.dev/t/S6uM1zptq3L
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from 'next/link';

export default function UserResume() {
  return (
    <div className="w-full max-w-6xl mx-auto py-4 md:py-4 lg:py-4">
      <h2 className="text-3xl font-bold tracking-tight mb-8 md:mb-10 lg:mb-12">My Collection</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
        <div>
          <h3 className="text-xl font-semibold mb-4 md:mb-6">Resume</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            <div className="relative overflow-hidden rounded-lg border p-2 shadow-lg group hover:shadow-xl ">
              <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                <span className="sr-only">View</span>
              </Link>
              <img
                src="/placeholder.svg"
                alt="Resume Image 1"
                width={300}
                height={400}
                className="object-cover w-full aspect-[3/4]"
              />
            </div>

            <div className="relative overflow-hidden rounded-lg border p-2 shadow-lg group hover:shadow-xl ">
              <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                <span className="sr-only">View</span>
              </Link>
              <img
                src="/placeholder.svg"
                alt="Resume Image 2"
                width={300}
                height={400}
                className="object-cover w-full aspect-[3/4]"
              />
            </div>

            <div className="relative overflow-hidden rounded-lg border p-2 shadow-lg group hover:shadow-xl ">
              <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                <span className="sr-only">View</span>
              </Link>
              <img
                src="/placeholder.svg"
                alt="Resume Image 3"
                width={300}
                height={400}
                className="object-cover w-full aspect-[3/4]"
              />
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4 md:mb-6">Portfolio</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            <div className="relative overflow-hidden rounded-lg border p-2 shadow-lg group hover:shadow-xl ">
              <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                <span className="sr-only">View</span>
              </Link>
              <img
                src="/placeholder.svg"
                alt="Portfolio Image 1"
                width={300}
                height={400}
                className="object-cover w-full aspect-[3/4]"
              />
            </div>

            <div className="relative overflow-hidden rounded-lg border p-2 shadow-lg group hover:shadow-xl ">
              <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                <span className="sr-only">View</span>
              </Link>
              <img
                src="/placeholder.svg"
                alt="Portfolio Image 2"
                width={300}
                height={400}
                className="object-cover w-full aspect-[3/4]"
              />
            </div>

            <div className="relative overflow-hidden rounded-lg border p-2 shadow-lg group hover:shadow-xl ">
              <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                <span className="sr-only">View</span>
              </Link>
              <img
                src="/placeholder.svg"
                alt="Portfolio Image 3"
                width={300}
                height={400}
                className="object-cover w-full aspect-[3/4]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
