import { LawyerInterface } from "../interface/lawyerSchema";
import client from "../api/clientApi";

const fetchAllLawyers = async (): Promise<LawyerInterface[]> => {
  async function get(url: string) {
    let response = await client.get(url);
    return response.data;
  }

  const data: LawyerInterface[] = await get("lawyers");
  return data;
};

export default fetchAllLawyers;
