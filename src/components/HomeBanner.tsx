import banner_image from "../assets/banner_image.png";

const HomeBanner = () => {
  return (
    <div className="w-full flex justify-between p-4 my-5 bg-[#0C253F] rounded-lg text-white shadow-xl shadow-slate-800">
        <div className="flex flex-col gap-3 w-1/2">
            <h1 className='text-4xl max-sm:text-lg tracking-wide leading-wide'>Talk to Experts</h1>
            <div className='flex items-center gap-3 max-sm:gap-1 '>
                <div className='w-4 h-4 max-sm:w-[5px] max-sm:h-[5.70px] bg-white rounded-full'/>
                <p className='opacity-60 text-slate-50 text-lg tracking-wider max-sm:text-xs font-normal'>Access to Expertise</p>
            </div>
            <div className='flex items-center gap-3 max-sm:gap-1 '>
                <div className='w-4 h-4 max-sm:w-[5px] max-sm:h-[5.70px] bg-white rounded-full'/>
                <p className='opacity-60 text-slate-50 text-lg tracking-wider max-sm:text-xs font-normal'>Convenient</p>
            </div>
            <div className='flex items-center gap-3 max-sm:gap-1 '>
                <div className='w-4 h-4 max-sm:w-[5px] max-sm:h-[5.70px] bg-white rounded-full'/>
                <p className='opacity-60 text-slate-50 text-lg tracking-wider max-sm:text-xs font-normal'>Time-Saving</p>
            </div>
            <div className='flex items-center gap-3 max-sm:gap-1 '>
                <div className='w-4 h-4 max-sm:w-[5px] max-sm:h-[5.70px] bg-white rounded-full'/>
                <p className='opacity-60 text-slate-50 text-lg tracking-wider max-sm:text-xs font-normal'>Confidential</p>
            </div>
            <div className='flex items-center gap-3 max-sm:gap-1 '>
                <div className='w-4 h-4 max-sm:w-[5px] max-sm:h-[5.70px] bg-white rounded-full'/>
                <p className='opacity-60 text-slate-50 text-lg tracking-wider max-sm:text-xs font-normal'>Cost effective</p>
            </div>
            <a 
                href='/search' 
                className="bg-white text-[#0C253F] font-semibold text-lg max-sm:text-xs tracking-wider flex justify-center items-center 
                w-fit my-2 px-4 py-2 max-sm:p-1 rounded-full
                transition:hover duration-300 ease-in-out hover:scale-105"
                >
                Consult Now
            </a>
        </div>
        <div className='flex items-center justify-end items-end bg-red-400'>
            <img src={banner_image} alt="banner image" className='w-80 h-80 max-md:h-40 max-md:w-40 object-contain bg-green-400'/>
        </div>
    </div>
  )
}

export default HomeBanner