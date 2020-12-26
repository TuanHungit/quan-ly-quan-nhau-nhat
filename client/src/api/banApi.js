import axios from "../common/axiosClient";

export const getAllBan = async (options) => {
  let url = `/bans`;

  const response = await axios.get(url);
  return response.data;
};

export const updateBan = async ({ b_id, b_trangthai }) => {
  let url = `/bans/${b_id}`;

  const response = await axios.put(url, { b_trangthai });
  return response.data;
};
