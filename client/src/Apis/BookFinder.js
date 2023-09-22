import axios from "axios";

export default axios.create({
// server
//  baseURL: "https://academicsourcefinder.org/apiv1.0.0",
//  local
  baseURL: "http://localhost:3001/apiv1.0.0",
});