import { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import ryan from "../assets/ryan.jpeg";
import { defaultLawyers } from "../interface/defaultValues";
import { LawyerInterface } from "../interface/lawyerSchema";
import fetchAllLawyers from "../data/fetchAllLawyers";
import { IoBagOutline } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdChat } from "react-icons/md";
import { Typography } from "@mui/material";

const LawyersCard = () => {
  const [lawyersData, setLawyersData] = useState(defaultLawyers);

  useEffect(() => {
    async function fetchData() {
      const data: LawyerInterface[] = await fetchAllLawyers();
      setLawyersData(data);
    }

    fetchData();
  }, []);  

  return (
    <>
      {lawyersData.length == 0 ? (
        <h1 className="flex justify-center items-center text-3xl text-sky-300">Loading...</h1>
      ) : (
        <div className="flex flex-column items-center justify-center px-20 max-md:px-4 gap-4 font-poppins">
        <h2 className="text-5xl max-md:text-3xl dont-semibold my-10">Top Rated Lawyers</h2>

        <div  className="flex flex-wrap items-center justify-center gap-5 w-full">
        {lawyersData.map((data, index) => (
          <div key={index} className="border-[2px] border-gray-200 bg-slate-100 p-5 rounded-2xl w-5/6 max-md:w-full shadow">
            {/* personal info */}
            <div className='flex justify-between max-md:flex-col-reverse max-md:gap-5 items-start'>
              <div className='flex flex-column items-start gap-2'>
                <h1 className="text-3xl font-semibold capitalize">{data?.fullName}</h1>
                
                <h2 className='text-sm italic'>Bar Council Number - {data?.barCouncilNumber}</h2>
                
                <div className='flex gap-2 items-center'>
                  <IoBagOutline className="h-4 w-4 text-[#0C253F]" /> 
                  <p>{data?.experience}+ years of Experience</p>
                </div>
  
                <div className='flex gap-2 items-center'>
                  <FaMapMarkerAlt className="h-4 w-4 text-[#0C253F]" /> 
                  <p className='capitalize'>{data?.region}</p>
                </div>
  
                <div className='flex gap-2 items-center'>
                  <MdChat className="h-4 w-4 text-[#0C253F]" /> 
                  {data?.languages.map((item, index)=>
                  <p className='capitalize'>{item}</p>
                )}
                </div>
  
                <div className="">
                  <h2 className='text-md mb-1'>Area of Practice</h2>
                  <div className='flex gap-2 flex-wrap'>
                      {data?.lawArea.map((item, index)=>
                      <p key={index} className="border-[#0C253F] bg-gray-100 p-1 border-[1px] text-sm capitalize">{item}</p>
                      )}
                  </div>
                </div>
              </div>
              <Link to={`/lawyers/${data._id}`} className="max-md:w-full">
                <div className="max-md:flex max-md:justify-center transition-all duration-300 ease-in-out hover:scale-110 shadow-lg hover:shadow-xl rounded-xl">
                  <img src={data?.profilePic || ryan} alt={data?.fullName} className="rounded-xl max-md:w-full max-md:h-60 w-40 h-40 object-contain"/>  
                </div>
              </Link>
            </div>
                            
            {/* bio + certificates */}
            <div className='my-2'>
                <div>
                    <h3 className='mb-1 font-semibold'>Biography</h3>
                    <p className='text-sm text-gray-400 tracking-wide'>{lawyersData[15]?.biography}</p>
                </div>
                {data?.lawCertificate && 
                <img src={data?.lawCertificate}  alt="law certificate" />
                }
            </div>
            
            {/* charges */}
            <div className='flex flex-col'>
                <h2 className='text-xl font-semibold'>Consultation Services</h2>
                <div className='flex max-md:flex-col justify-between mb-2 gap-1'>
                    <div className="text-lg">Duration - {data?.consultingDuration} minutes</div>
                    <div className="text-lg">Charges - ₹{data?.charges}/hr</div>
                </div>
            </div>
            
            {/* book consultation */}
            <Link to={`/search/book/${data?._id}`}>
              <div className='w-full flex items-center justify-center bg-[#0C253F] text-white py-2 rounded-md transition-all duration-300 ease-in-out hover:scale-105'>
                Book a consultation
              </div>
            </Link>
                
          </div>
          ))}
        </div>
      </div>
      )}
    </>
    
  );
};

export default LawyersCard;
