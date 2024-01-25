import { LawyerInterface } from "../interface/lawyerSchema"
import LawyerBox from "./LawyerBox"

interface Lawyers {
    title: string,
    lawyers: LawyerInterface[],
    free: boolean
}

const LawyersCarasouel = ({title, lawyers, free} : Lawyers) => {
    console.log("LawyersCarasouel - lawyers[0]:", lawyers[0]);
  return (
    <div className="w-full my-5">
        <div className="w-full flex justify-between items-center">
            <h2 className="text-black text-4xl max-sm:text-base font-medium">{title}</h2>
            <a href='/search' className="text-sky-400 text-lg max-md:text-[13px] font-normal hover:underline cursor-pointer p-3">View all</a>
        </div>
        <div className="w-full overflow-auto min-h-[100px]">
            <div className="w-[300%] flex gap-4 sm:p-2 md:py-10">
                {lawyers.map((lawyer, index) => (
                    <div key={index}>
                        <LawyerBox  lawyer={lawyer} free={free}/>
                    </div> 
                ))}
            </div>
        </div>
    </div>
  )
}

export default LawyersCarasouel