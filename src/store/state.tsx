import { create } from "zustand";
import { getRequest } from "../utils/request";

interface storeType {
  user: any;
  writings: any;
  getWriting: () => void;
  story: any;
  setStory: (e: any) => void;
  authorize: () => void;
  token: number;
  editToken: (e: number) => void;
}

const store = create<storeType>((set) => ({
  user: null,
  writings: null,
  getWriting: () => {
    getRequest(`/writer/writings`)
      .then(({ data }) => {
        set(() => ({ writings: data }));
      })
      .catch((err: any) => {
        console.log(err.response.data);
      });
  },

  story: localStorage.getItem("story") ?? false,
  setStory: (newStory) => {
    localStorage.setItem("story", newStory);
    set(() => ({ story: newStory }));
  },

  authorize: () => {
    getRequest("/profile").then(({ data }) => {
      // console.log(data);
      set(() => ({ user: data, token: data.token }));
    });
  },
  token: 0,

  editToken: (newToken) => {
    set(() => ({ token: newToken }));
  },
}));
export default store;
