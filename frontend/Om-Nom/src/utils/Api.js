
import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3001/",
  responseType: "json",
  'Access-Control-Allow-Origin': true,
});