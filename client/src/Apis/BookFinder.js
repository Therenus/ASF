import axios from "axios";

export default axios.create({
  baseURL: "https://academicsourcefinder.org/apiv1.0.0",
});