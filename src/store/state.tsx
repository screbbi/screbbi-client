import { create } from "zustand";
import { getRequest } from "../utils/request";

interface storeType {
  user: any;
  writings: any;
  getWriting: () => void;
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
        // toast.error(err.response.data);
        console.log(err.response.data);
      });
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
