import axios from "axios";
const url = "http://localhost:5000/";
const client = axios.create({
  baseURL: url,
});

export default client;
// async function get(url) {
//   const response = await client.get(url);
//   console.log(response.data);
// }

// async function post(url) {
//   const response = await client.post(url);
//   console.log(response.data);
// }

// async function update(url) {
//   const response = await client.patch(url);
//   console.log(response.data);
// }

// async function dlt(url) {
//   const response = await client.delete(url);
//   console.log(response.data);
// }
