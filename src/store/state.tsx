import { create } from "zustand";
import { getRequest } from "../utils/request";

interface storeType {
  user: any;
  writings: any;
  getWriting: () => void;
  story: boolean;
  setStory: (e: boolean) => void;
  //   authorize: () => void;
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

  story: false,
  setStory: (newStory) => {
    set(() => ({ story: newStory }));
  },

  //   authorize: () => {
  //     getRequest("/auth/me").then(({ data }) => {
  //       if (data.websites.length < 1) {
  //         window.location.replace("/auth/create-a-domain");
  //       }
  //       set(() => ({ loading: false, user: data }));
  //     });
  //   },
}));
//  set(() => ({ user: doc.data(), loggedOut: false }));
export default store;
