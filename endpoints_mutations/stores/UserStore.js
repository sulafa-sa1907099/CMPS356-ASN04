// import create from "zustand";
import { persist, devtools } from "zustand/middleware";

// const initialState = {
//     user: null
//   };

//   const actions = {
//     setUser: (userId) => (state) => ({
//       userId
//     })
//   };

// const store = (set) => ({
//     userId: initialState.user,
//   ...actions
    
// })

// export const userStore = create(devtools(persist(store, { name: "store" })));

import create from 'zustand'

export const store = ((set) => ({
  user: "",
  setUser: (u) => set((state) => ({ user: u })),
 
}));
 export const userStore = create(devtools(persist(store, { name: "store" })));


