import Appointment from "../components/Appointment";
import HomeBanner from "../components/HomeBanner";
import HomeBar from "../components/HomeBar";
import Lawcategories from "../components/Lawcategories";
import LawyersCarasouel from "../components/LawyersCarasouel";
import SecondBanner from "../components/SecondBanner";
import { AiContent, NotarizeContent, freeConsultationContent, lawyerConsultationContent } from "../content";
import { useMediaQuery } from "react-responsive";

export const Home = () => {
  const isMobile = useMediaQuery({ maxWidth: 550 });

  return (
    <div className="px-28 max-md:px-5 my-10 font-poppins">

      {/* banner */}
      <HomeBanner />

      {/* law categories */}
      <Lawcategories />

      {/* free consultaion */}
      <LawyersCarasouel {...freeConsultationContent}/>

      {/* appointment */}
      <Appointment />

      {/* Talk to AI */}
      <SecondBanner {...AiContent}/>

      {/* our consultaion */}
      <LawyersCarasouel {...lawyerConsultationContent} />

      {/* notarize */}
      <SecondBanner {...NotarizeContent}/>

      {/* bottombar for small devices */}
      {isMobile && <HomeBar />}
      
    </div>
  );
};
