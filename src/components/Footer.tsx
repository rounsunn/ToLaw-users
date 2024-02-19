import React from 'react';
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  return (
    <div className="font-poppins p-8 mt-4 bg-[#0C253F] text-white flex w-full justify-evenly">
        <div className="flex flex-col gap-1 text-[12px]">
            <a href="/search" className="hover:underline">Search lawyers</a>
            <a href="/aiassit" className="hover:underline">Talk to AI</a>
            <a href="/templates" className="hover:underline">Templates</a>
        </div>
        <div className="flex flex-col items-center gap-1 text-[15px]">
            <h4 className="text-xl">ToLaw</h4>
            <p>For any queries, feel free to reach out - <a href="mailto:mail@tolaw.in">mail@tolaw.in</a></p>
        </div>
        <div className="flex flex-col items-center gap-1">
            <h4 className="text-xl">Follow us:</h4>
            <div className="flex justify-evenly gap-1 w-full">
                <FaFacebook />
                <RiInstagramFill />
                <FaXTwitter />
            </div>
        </div>
    </div>
  )
}

export default Footer