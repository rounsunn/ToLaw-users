import React from 'react';
import appointment1 from "../assets/appointment1.png"
import appointment2 from "../assets/appointment2.png"
import appointment3 from "../assets/appointment3.png"
import appointment4 from "../assets/appointment4.png"

const Appointment = () => {
  return (
    <div className="flex flex-col gap-2 my-5">
        <h2 className="text-black text-4xl max-sm:text-base font-medium">Steps to book an appointment</h2>
        <div className="opacity-50 text-black text-lg max-sm:text-[10px] font-normal mb-2">4 Simple steps to book an appointment with the lawyer.</div>
        <div className="grid grid-cols-4 max-sm:grid-cols-2 gap-3">
            <div className='w-full h-full rounded-2xl p-3' style={{backgroundImage:`url(${appointment1})`}}>
                <h3 className='text-slate-50 text-2xl max-sm:text-xs font-semibold mb-2'>Search</h3>
                <p className='text-slate-50 text-lg max-sm:text-[10px] font-normal my-3 leading-normal'>Search for lawyer in required area of practice.</p>
            </div>
            <div className='w-full h-full rounded-2xl p-3' style={{backgroundImage:`url(${appointment2})`}}>
                <h3 className='text-slate-50 text-2xl max-sm:text-xs font-semibold mb-2'>Know More</h3>
                <p className='text-slate-50 text-lg max-sm:text-[10px] font-normal my-3 leading-normal'>Know more about the lawyer.</p>
            </div>
            <div className='w-full h-full rounded-2xl p-3' style={{backgroundImage:`url(${appointment3})`}}>
                <h3 className='text-slate-50 text-2xl max-sm:text-xs font-semibold mb-2'>Select date & time</h3>
                <p className='text-slate-50 text-lg max-sm:text-[10px] font-normal my-3 leading-normal'>Select the date and time to reserve a spot for consultation.</p>
            </div>
            <div className='w-full h-full rounded-2xl p-3' style={{backgroundImage:`url(${appointment4})`}}>
                <h3 className='text-slate-50 text-2xl max-sm:text-xs font-semibold mb-2'>Payment</h3>
                <p className='text-slate-50 text-lg max-sm:text-[10px] font-normal my-3 leading-normal'>The payment mode of user is safe and secure.</p>
            </div>
        </div>
    </div>
  )
}

export default Appointment