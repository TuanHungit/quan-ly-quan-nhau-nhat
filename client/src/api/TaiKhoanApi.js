import axios from "../common/axiosClient";

export const LogIn = async(loginRequest)=>{
    const url = `/taikhoans/login`;
    const response = await axios.post(url);
    console.log(response);
    return response.date;
    
}