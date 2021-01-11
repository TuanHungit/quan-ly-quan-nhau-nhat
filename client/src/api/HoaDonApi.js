import axios from "../common/axiosClient";

export const getHoaDons = async (options) => {
  let url = `/hoadons`;
  if (options) {
    url = `/hoadons?fields=${options.join(",")}`;
  }
  const response = await axios.get(url);
  return response.data;
};

export const getThongKe = async (data) => {
  let url = `/hoadons/date/${data}`;
  const response = await axios.get(url);
  return response.data;
};
