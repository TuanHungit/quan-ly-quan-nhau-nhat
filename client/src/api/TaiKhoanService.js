
import api from './api';
const login = async(loginRequest)=>{
    return api.post(api.url.login,loginRequest).then(res=>res.data)
}
const TaiKhoanService={
    login 
};
export default TaiKhoanService;