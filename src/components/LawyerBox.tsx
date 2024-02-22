import { LawyerInterface } from "../interface/lawyerSchema";

interface lawyerboxInterface {
  lawyer: LawyerInterface;
  free: boolean;
}

const LawyerBox = (props: lawyerboxInterface) => {
  return (
    <a
      href={`/lawyers/${props?.lawyer?._id}`}
      className="w-[350px] h-[150px] max-md:w-[211px] max-md:h-[84px] flex gap-4 items-center bg-gray-100 bg-opacity-20 rounded-xl px-2 shadow-md shadow-gray-300
            hover:scale-110 hover:shadow-xl hover:shadow-gray-400 transtion-all duration-300 ease-in-out"
    >
      <div className="p-1 w-1/3">
        <img
          src={props?.lawyer?.profilePic}
          alt={props?.lawyer?.fullName}
          className="w-fit h-fit rounded-lg"
        />
      </div>
      <div className="w-2/3">
        <h3 className="text-black text-xl max-md:text-xs font-normal">
          {props?.lawyer?.fullName}
        </h3>
        {props?.lawyer?.lawArea[0] && (
          <p className="opacity-50 text-black text-opacity-20 text-md max-md:text-[10px] font-normal capitalize">
            {props?.lawyer?.lawArea[0]} Lawyer
          </p>
        )}
        {props?.lawyer?.lawArea[1] && (
          <p className="opacity-50 text-black text-opacity-20 text-md max-md:text-[10px] font-normal capitalize">
            {props?.lawyer?.lawArea[1]} Lawyer
          </p>
        )}
        <div className="flex justify-between pr-1 mt-1">
          <div className="flex">
            <p className="text-sky-500 text-lg max-md:text-xs font-normal tracking-loose">
              {props?.lawyer?.consultingDuration} min
            </p>
          </div>

          <div className="flex">
            {props?.free ? (
              <p className="text-sky-500 text-lg max-md:text-xs font-normal tracking-loose">
                Free
              </p>
            ) : (
              <p className="text-sky-500 text-lg max-md:text-xs font-normal tracking-loose">
                ₹{props?.lawyer?.charges}
              </p>
            )}
          </div>
        </div>
      </div>
    </a>
  );
};

export default LawyerBox;
