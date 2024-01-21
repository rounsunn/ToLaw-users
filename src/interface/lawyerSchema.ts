interface LawyerInterface {
  _id: string;
  fullName: string;
  lawArea: string[];
  barCouncilNumber: string;
  region: string;
  experience: number;
  languages: string[];
  lawCertificate: string;
  charges: number;
  consultingDuration: string;
  consultingTime: string;
  qualification: string;
  biography: string;
  emailId: string;
  mobileNumber: string;
  profilePic: string;
  stars: number;
  reviews: number;
}

export type { LawyerInterface };
