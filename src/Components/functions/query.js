import axios from "axios";
export const createCategory = async (category, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/`, category, {
    headers: {
      authtoken,
    },
  });
