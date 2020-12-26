import axios from "../common/axiosClient";

export const getBans = async (options) => {
    let url = `/bans`;
    if (options) {
        url = `/bans?fields=${options.join(",")}`;
    }
    const response = await axios.get(url);
    return response.data;
};
export const createOneBan = async (data) => {
    const url = `/bans`;
    const response = await axios.post(url, data);
    return response.data;
};
export const deleteBan = async (data) => {
    const url = `/bans/${data.b_id}`;
    const response = await axios.delete(url, data);
    return response.data;
};

export const editBan = async (data) => {
    const url = `/bans/${data.b_id}`;
    const response = await axios.put(url, data);
    return response.data;
};




