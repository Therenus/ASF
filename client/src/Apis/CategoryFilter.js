import axios from "axios";

export default axios.create({
  baseURL: window.location.href + "filterapiv1.0.0",
});