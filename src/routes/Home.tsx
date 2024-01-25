import Appointment from "../components/Appointment";
import HomeBanner from "../components/HomeBanner";
import LawyersCarasouel from "../components/LawyersCarasouel";
import SecondBanner from "../components/SecondBanner";
import { AiContent, NotarizeContent, freeConsultationContent, lawyerConsultationContent } from "../content";

export const Home = () => {
  return (
    <div className="px-20 max-md:px-5 my-10 font-poppins">

      {/* banner */}
      <HomeBanner />

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

    </div>
  );
};
