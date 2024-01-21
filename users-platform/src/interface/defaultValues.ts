import { LawyerInterface } from "./lawyerSchema";

const defaultLawyer: LawyerInterface = {
  _id: "",
  fullName: "",
  lawArea: [],
  barCouncilNumber: "",
  region: "",
  experience: 0,
  languages: [],
  lawCertificate: "",
  charges: 0,
  consultingDuration: "",
  consultingTime: "",
  qualification: "",
  biography: "",
  emailId: "",
  mobileNumber: "",
  profilePic: "",
  stars: 0,
  reviews: 0,
};

const defaultLawyers: LawyerInterface[] = [];

export { defaultLawyer, defaultLawyers };
