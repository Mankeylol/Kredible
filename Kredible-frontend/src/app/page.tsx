'use client'
import Navbar from '../components/Navbar'

export default function Home() {
  return (
    <div className="bg-[#14141A]">
      <main>
        {/* Hero section */}
        <div className="relative isolate overflow-hidden">

          <div
            className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(20%-30rem)] lg:left-48 lg:top-[calc(50%-40rem)] xl:left-[calc(50%-50rem)]"
            aria-hidden="true"
          >
            <div
              className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#59205C] to-[#14141A] opacity-90 absolute"
              style={{
                clipPath:
                  'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
              }}
            />
          </div>
          <div className="">
            <Navbar />
          </div>
          <div className="">
            <div></div>
            <div></div>
          </div>
        </div>

      </main>
    </div>
  )
}
