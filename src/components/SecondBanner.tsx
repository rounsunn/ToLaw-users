interface BannerContent {
    title: string;
    content: string[];
    button: string
    link: string
}

const SecondBanner = ({title, content, button, link} : BannerContent) => {
  return (
    <div className='w-full flex flex-col justify-evenly p-4 my-5 bg-[#0C253F] rounded-lg text-white shadow-xl shadow-slate-800'>
        <h2 className='text-4xl max-sm:text-lg tracking-wide leading-wide mb-2'>{title}</h2>
        <ul className='mt-2 mb-3 flex flex-col gap-[12px]'>
            {content.map((item, index) => (
            <li key={index} className='opacity-60 text-slate-50 text-lg tracking-wider max-sm:text-xs font-light'>{item}</li>
            ))}
        </ul>
        <a 
          href={`/${link}` }
          className="bg-white text-[#0C253F] font-semibold text-lg max-sm:text-xs tracking-wider flex justify-center items-center 
                    w-fit max-md:w-full my-2 px-4 py-2 max-sm:p-1 rounded-full lg:px-8 lg:py-4
                    transition:hover duration-300 ease-in-out hover:scale-105">
          {button}
        </a>
    </div>
  )
}

export default SecondBanner