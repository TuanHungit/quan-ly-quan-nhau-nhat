import api from "./api";
const supplyMessage = async (data) => {
  return api.post(api.url.message, data).then((res) => res.data);
};
const MessageService = {
  supplyMessage,
};
export default MessageService;
