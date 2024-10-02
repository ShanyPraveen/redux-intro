import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    createCustomer: {
      prepare(fullName, nationalId) {
        return {
          payload: {
            fullName,
            nationalId,
            createdAt: new Date().toISOString()
          }
        }
      },
      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.nationalId = action.payload.nationalId;
        state.createdAt = action.payload.createdAt;
      }
    },
    updateName(state, action) {
      state.fullName = action.payload;
    }
  }
})

// export default function customerReducer(state = initialState, action) {
//   switch (action.type) {
//     case "customer/createCustomer":
//       return {
//         ...state,
//         fullName: action.payload.fullName,
//         createdAt: action.payload.createdAt,
//         nationalId: action.payload.nationalId,
//       };
//     case "customer/updateName":
//       return { ...state, fullName: action.payload };
//     default:
//       return state;
//   }
// }

// export const createCustomer = (fullName, nationalId) => {
//   return { 
//     type: "customer/createCustomer", 
//     payload: {
//       fullName,
//       nationalId,
//       createdAt: new Date().toISOString()
//     } 
//   };
// };

// export const updateName = (fullName) => {
//   return { type: "customer/updateName", payload: fullName };
// };

export const {createCustomer, updateName} = customerSlice.actions;

export default customerSlice.reducer
