import client from "../api/clientApi";
import { LawyerInterface } from "../interface/lawyerSchema";

const searchLawyersData = async (search: string) => {
  async function get(url: string) {
    let response = await client.get(url);
    console.log(response.data);
    return response.data;
  }

  const data: LawyerInterface[] = await get(`/search?searchParam=${search}`);
  return data;
};

export default searchLawyersData;
