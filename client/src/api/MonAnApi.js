import axios from "../common/axiosClient";

export const getMonAns = async (options) => {
  let url = `/monans`;
  if (options) {
    url = `/monans?fields=${options.join(",")}`;
  }
  const response = await axios.get(url);
  return response.data;
};
export const createOneMonAn = async (data) => {
  const url = `/monans`;
  const response = await axios.post(url, data);
  return response.data;
};
export const deleteMonAn = async (data) => {
  const url = `/monans/${data.ma_id}`;
  const response = await axios.delete(url, data);
  return response.data;
};




