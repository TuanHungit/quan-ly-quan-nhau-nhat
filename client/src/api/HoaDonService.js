import api from "./api";

const createBill = async (data) => {
  return api.post(api.url.hoadon, data).then((res) => res.data);
};
const updateBillStatus = async (hoaDonId) => {
  return api
    .put(`${api.url.hoadon}/${hoaDonId}/thanhtoan`)
    .then((res) => res.data);
};

const getHoaDonIdByTable = async (banId) => {
  return api.get(`${api.url.hoadon}/bans/${banId}`).then((res) => res.data);
};

const updateMenuOfBill = async (hoaDonId, data) => {
  return api
    .post(`${api.url.hoadon}/${hoaDonId}/cthd`, data)
    .then((res) => res.data);
};
const deleteBill = async (hoaDonId) => {
  return api.delete(`${api.url.hoadon}/${hoaDonId}`).then((res) => res.data);
};

const addMoreCTDH = async (hoaDonId, data) => {
  return api
    .post(`${api.url.hoadon}/${hoaDonId}/cthd`, data)
    .then((res) => res.data);
};
const HoaDonService = {
  createBill,
  updateBillStatus,
  getHoaDonIdByTable,
  updateMenuOfBill,
  deleteBill,
  addMoreCTDH,
};
export default HoaDonService;
