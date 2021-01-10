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
const HoaDonService = {
  createBill,
  updateBillStatus,
  getHoaDonIdByTable,
};
export default HoaDonService;
