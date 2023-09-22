import axios from "axios";

export default axios.create({
  baseURL: window.location.href + "apiv1.0.0",
});