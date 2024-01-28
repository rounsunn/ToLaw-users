import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import client from "../api/clientApi";
import ryan from "../assets/ryan.jpeg";
import { LawyerInterface } from "../interface/lawyerSchema";
import { defaultLawyer } from "../interface/defaultValues";
import { MdChat } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoBagOutline } from "react-icons/io5";

const Profile = () => {
  const id = useParams();
  const [lawyerInfo, setLawyerInfo] = useState(defaultLawyer);
  const [loading, setLoading] = useState(false)
  async function get(url: string) {
    let response = await client.get(url);
    return response.data;
  }
  useEffect(() => {
    if (lawyerInfo === undefined) return;
    async function fetchlawyerInfo() {
      setLoading(true);
      const lawyerInfo: LawyerInterface = await get(`lawyers/${id._id}`);
      setLawyerInfo(lawyerInfo);
      setLoading(false);
    }
    
    fetchlawyerInfo();
  }, []);

  return (
    <>
    <div className="flex flex-column items-center justify-center my-10 max-md:px-4 gap-4 font-poppins">
      <div  className="flex flex-wrap items-center justify-center gap-5 w-full">
        <div className="p-5 rounded-lg w-5/6 max-md:w-full">
          {/* personal info */}
          {loading ? (
            <div className="flex max-md:flex-col-reverse gap-5"> 
              <div className="w-1/2 max-md:w-full">
                <div className='animate-pulse w-full h-14 bg-gray-300 rounded-lg'/>
                <div className='animate-pulse w-3/4 h-8 bg-gray-300 rounded-lg mt-2' />
                <div className='animate-pulse w-full h-5 bg-gray-300 rounded-lg mt-2' />
                <div className='animate-pulse w-full h-5 bg-gray-300 rounded-lg mt-2' />
                <div className='animate-pulse w-full h-5 bg-gray-300 rounded-lg mt-2' />
              </div>
              <div className="w-1/2 max-md:w-full flex justify-end max-md:justify-center items-center">
                <div className="animate-pulse w-1/2 h-[175px] bg-gray-300 rounded-lg mt-2" />
              </div>
            </div>
          ) : (
            <div className='flex justify-between max-md:flex-col-reverse max-md:gap-10 items-start'>
              <div className='flex flex-column items-start gap-2'>
                <h1 className="text-5xl font-semibold capitalize">{lawyerInfo?.fullName}</h1>
                
                <h2 className='text-xl max-md:text-sm italic'>Bar Council Number - {lawyerInfo?.barCouncilNumber}</h2>
                
                <div className='flex gap-2 items-center'>
                  <IoBagOutline className="h-8 w-8 text-[#0C253F]" /> 
                  <p className="text-xl">{lawyerInfo?.experience}+ years of Experience</p>
                </div>

                <div className='flex gap-2 items-center'>
                  <FaMapMarkerAlt className="h-8 w-8 text-[#0C253F]" /> 
                  <p className='capitalize text-xl'>{lawyerInfo?.region}</p>
                </div>

                <div className='flex gap-2 items-center'>
                  <MdChat className="h-8 w-8 text-[#0C253F]" /> 
                  {lawyerInfo?.languages.map((item, index)=>
                  <p key={index} className='capitalize text-xl'>{item}</p>
                )}
                </div>

                <div className="mt-2">
                  <h2 className='text-xl mb-1'>Area of Practice</h2>
                  <div className='flex gap-2 flex-wrap'>
                      {lawyerInfo?.lawArea.map((item, index)=>
                      <p key={index} className="border-[#0C253F] bg-gray-100 p-1 border-[1px] text-sm capitalize">{item}</p>
                      )}
                  </div>
                </div>
              </div>
              <div className="max-md:flex max-md:justify-center shadow-xl shadow-gray-800 rounded-xl">
                <img src={lawyerInfo?.profilePic || ryan} alt={lawyerInfo?.fullName} className="rounded-lg max-md:w-full max-md:h-full w-80 h-80 object-contain"/>  
              </div>
            </div> 
          )}
                          
          {/* bio + certificates */}
          {loading ? (
            <div className="animate-pulse w-full h-[100px] bg-gray-300 rounded-lg my-5"/>
          ) : (
            <div className='my-5'>
                <div>
                    <h3 className='mb-1 font-semibold text-xl'>Biography</h3>
                    <p className='text-md text-gray-400 tracking-wide'>{lawyerInfo?.biography}</p>
                </div>
                {lawyerInfo?.lawCertificate && 
                <img src={lawyerInfo?.lawCertificate}  alt="law certificate" />
                }
            </div>
          )}
          
          {/* charges */}
          {loading ? (
            <div className="animate-pulse w-full h-[100px] bg-gray-300 rounded-lg my-5"/>
          ) : (
            <div className='flex flex-col my-5'>
                <h2 className='text-xl font-semibold mb-2'>Consultation Services</h2>
                <div className='flex max-md:flex-col justify-between mb-2 gap-1'>
                    <div className="text-lg">Duration - {lawyerInfo?.consultingDuration} minutes</div>
                    <div className="text-lg">Charges - ₹{lawyerInfo?.charges}/hr</div>
                </div>
            </div>
          )}
          
          {/* book consultation */}
          <Link to={`/search/book/${lawyerInfo?._id}`}>
            <div className='w-full flex items-center justify-center bg-[#0C253F] text-white py-2 rounded-md transition-all duration-300 ease-in-out hover:scale-105'>
              Book a consultation
            </div>
          </Link>
              
        </div>
      
      </div>
    </div>
    </>
  );
};

export default Profile;
