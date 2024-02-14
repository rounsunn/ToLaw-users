import { LawyerInterface } from "../interface/lawyerSchema";
import fetchAllLawyers from "../data/fetchAllLawyers";

export async function fetchFreeLawyers(): Promise<LawyerInterface[]> {
  try {
    const data: LawyerInterface[] = await fetchAllLawyers();
    return data;
  } catch (error) {
    console.error("Error fetching lawyers:", error);
    return [];
  }
}

export const freeConsultationContent = {
  title: 'First Free consultation',
  lawyers: await fetchFreeLawyers(),
  free: true
}

export const lawyerConsultationContent = {
  title: 'Our Lawyers',
  lawyers: await fetchFreeLawyers(),
  free: false
}

export const AiContent = {
  title: 'Talk to AI',
  content: [
    'Access to a personal assistant',
    'Convenient',
    'Time-Saving',
    'Confidential',
    'Cost effective'
  ],
  button: 'Try Now',
  link: 'aiassist'
}

export const NotarizeContent = {
  title: 'Notarize a Template',
  content: [
    'Access to more than 3500+ templates',
    'Concise and Correct',
    'Time-Saving',
    'Time-Saving',
    'Cost effective'
  ],
  button: 'Buy Now',
  link: 'search'  //FOR NOW
}