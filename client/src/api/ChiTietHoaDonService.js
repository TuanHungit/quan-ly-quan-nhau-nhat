import api from "./api";

const updateCTHD = async (data) => {
  return api.put(`${api.url.chitiethoadon}`, data).then((res) => res.data);
};

const deleteCTHD = async (data) => {
  return api.delete(`${api.url.chitiethoadon}`, data).then((res) => res.data);
};
const ChiTietHoaDonService = {
  updateCTHD,
  deleteCTHD,
};
export default ChiTietHoaDonService;
