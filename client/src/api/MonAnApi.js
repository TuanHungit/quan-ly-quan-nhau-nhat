import axios from "../common/axiosClient";

export const getAllMonAn = async (options) => {
  let url = `/loaimonans`;
  if (options) {
    url = `/loaimonans?fields=${options.join(",")}`;
  }
  const response = await axios.get(url);
  return response.data;
};
export const createOneMonAn = async (data) => {
  const url = `/loaimonans`;
  const response = await axios.post(url, data);
  return response.data;
};


