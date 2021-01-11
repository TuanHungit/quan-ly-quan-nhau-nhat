import Pusher from "pusher-js";
export const pusher = new Pusher("418932f279b2ed1937ab", {
  cluster: "ap1",
});
export const channel = pusher.subscribe("my-channel");

export const messageChanel = pusher.subscribe("message");
