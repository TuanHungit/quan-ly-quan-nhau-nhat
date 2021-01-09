import api from './api';

const createBill=async(data)=>{
    return api.post(api.url.hoadon,data).then(res=>res.data);
}
const HoaDonService={
    createBill 
};
export default HoaDonService;