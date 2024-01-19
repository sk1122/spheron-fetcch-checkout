import React from "react"

export default function Demo() {
  return (
    <section className="flex min-h-[440px] w-full items-center bg-white">
      <div className="relative mx-auto min-h-[310px] w-full max-w-[1220px] bg-[#263238] lg:rounded-2xl">
        <div className="absolute inset-y-0 right-0 hidden w-1/2 lg:block xl:w-fit">
          <DemoImage />
        </div>
        <div className="flex min-h-[310px] flex-col justify-center pl-8">
          <h3 className="mb-4 uppercase text-white">Get Started</h3>
          <h2 className="max-w-xl text-2xl font-semibold text-white xl:text-4xl">
            Book a demo with Fetcch today and add payment request button
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href="https://calendly.com/ray-fetcch/fetcch-demo"
              target="_blank"
              className="mt-8 inline-block max-w-fit rounded-full border-2 border-primary bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary/90"
            >
              Book Demo
            </a>
            <a
              href="https://docs.fetcch.xyz/"
              target="_blank"
              className="mt-8 inline-block max-w-fit rounded-full border-2 border-primary bg-transparent px-6 py-3 text-sm font-semibold text-white hover:bg-primary/90"
            >
              Integrate
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

const DemoImage = () => {
  return (
    <svg
      width="571"
      height="283"
      viewBox="0 0 571 283"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M183 217C200.121 217 214 230.879 214 248V248C214 265.121 200.121 279 183 279L49 279C31.8792 279 18 265.121 18 248V248C18 230.879 31.8792 217 49 217L183 217Z"
        fill="#32444D"
      />
      <path
        d="M76.5 29C85.0604 29 92 35.9396 92 44.5V44.5C92 53.0604 85.0604 60 76.5 60L15.5 60C6.93959 60 -1.82905e-06 53.0604 -1.93113e-06 44.5V44.5C-2.03321e-06 35.9396 6.93958 29 15.5 29L76.5 29Z"
        fill="#32444D"
      />
      <path
        d="M444.698 122.175C432.318 134.151 415.608 141 398.384 141V141C361.721 141 332 111.279 332 74.6161L332 2.6432e-05L396.719 2.38261e-05C460.094 2.12742e-05 490.249 78.1126 444.698 122.175V122.175Z"
        fill="#3461FF"
      />
      <path
        d="M255.497 127C240.5 127 228.5 178.5 202.5 178.5C168.5 178.5 156.497 162.5 142.997 150M142.997 150L131.997 127M142.997 150H116.997L109.171 132M131.997 127H106.997M131.997 127C129.997 124.667 127.197 114.7 131.997 109.5M106.997 127H87.997C81.4953 130.5 108.91 126.4 109.171 132M106.997 127L109.171 132"
        stroke="white"
        stroke-width="2"
      />
      <path
        d="M131.996 109L128.713 113.5C126.993 117 126.013 124.5 131.213 126.5"
        stroke="white"
        stroke-width="2"
      />
      <path
        d="M214 155.5C214 85.636 270.636 29 340.5 29H571V282H340.5C270.636 282 214 225.364 214 155.5V155.5Z"
        fill="#FDAE40"
      />
      <path
        d="M571 37L351 37C285.278 37 232 90.2781 232 156V156C232 221.722 285.278 275 351 275L571 275"
        stroke="url(#paint0_linear_1701_193)"
        stroke-width="15"
      />
      <path
        d="M483 37L339 37C273.278 37 220 90.2781 220 156V156C220 221.722 273.278 275 339 275L483 275"
        stroke="url(#paint1_linear_1701_193)"
        stroke-width="15"
      />
      <path
        d="M571 236L458.5 236C420.668 236 390 205.331 390 167.5V167.5C390 129.668 420.668 99 458.5 99L571 99L571 236Z"
        fill="#EB951B"
      />
      <path
        d="M293.836 102.696L286.237 97.4386L286.448 94.9515L294.825 91.0377L294.564 94.1107L287.717 96.7452L287.79 95.8843L294.097 99.6229L293.836 102.696ZM309.081 85.6959L300.678 105.673L297.689 105.419L306.092 85.4422L309.081 85.6959ZM309.243 98.8607L309.436 96.5888L318.152 97.3284L317.96 99.6003L309.243 98.8607Z"
        fill="#2D2D2D"
      />
      <path
        d="M285.07 135.658C292.026 140.831 309.828 146.854 325.383 129.569"
        stroke="#2D2D2D"
        stroke-width="2"
      />
      <rect
        x="320.836"
        y="121.639"
        width="12.8993"
        height="12.8993"
        transform="rotate(-8.5889 320.836 121.639)"
        fill="#2D2D2D"
      />
      <path
        d="M417.497 213C397 215.5 394.917 255.467 368.997 257.5C343.5 259.5 318.497 248.5 304.997 236M304.997 236L293.997 213M304.997 236H278.997L271.171 218M293.997 213H268.997M293.997 213C291.997 210.667 289.197 200.7 293.997 195.5M268.997 213H249.997C243.495 216.5 270.91 212.4 271.171 218M268.997 213L271.171 218"
        stroke="#2D2D2D"
        stroke-width="2"
      />
      <path
        d="M293.996 195L290.713 199.5C288.993 203 288.013 210.5 293.213 212.5"
        stroke="#2D2D2D"
        stroke-width="3"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1701_193"
          x1="253.319"
          y1="105.039"
          x2="571"
          y2="105.039"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FFBF65" />
          <stop offset="1" stop-color="#FFBF65" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1701_193"
          x1="248.253"
          y1="105.039"
          x2="669.263"
          y2="105.039"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FFD59A" />
          <stop offset="0.203125" stop-color="#FFBF65" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}
