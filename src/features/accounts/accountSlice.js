import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload
    },
    requestLoan: {
      prepare (amount, loanPurpose) {
        return {
          payload: {amount, loanPurpose}
        }
      },
      reducer (state, action) {
        if(state.loan) return;
  
        state.loan = action.payload.amount
        state.loanPurpose = action.payload.loanPurpose
        state.balance += action.payload.amount
      }
    },
    payLoan(state, action) {
      state.balance -= state.loan
      state.loan = 0;
      state.loanPurpose = ''
    },
    convertingCurrency(state) {
      state.isLoading = true;
    }
  }
})

console.log(accountSlice)

export const {withdraw, requestLoan, payLoan} = accountSlice.actions;

export const deposit = (amount, currency) => {
  if (currency === 'USD') return { type: "account/deposit", payload: amount };

  return async (dispatch, getState) => {
    dispatch({type: 'account/convertingCurrency'});

    const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);
    const data = await res.json();

    dispatch({ type: "account/deposit", payload: data.rates.USD })
  }
};

export default accountSlice.reducer;

/** Without using the Redux Toolkit */
/**
export default function accountReducer(state = initialState, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload, isLoading: false };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.loanPurpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
        loanPurpose: "",
      };
    case 'account/convertingCurrency':
      return {...state, isLoading: true}
    default:
      return state;
  }
}

export const deposit = (amount, currency) => {
  if (currency === 'USD') return { type: "account/deposit", payload: amount };

  return async (dispatch, getState) => {
    dispatch({type: 'account/convertingCurrency'});

    const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);
    const data = await res.json();

    dispatch({ type: "account/deposit", payload: data.rates.USD })
  }
};

export const withdraw = (amount) => {
  return { type: "account/withdraw", payload: amount };
};

export const requestLoan = (amount, loanPurpose) => {
  return { type: "account/requestLoan", payload: { amount, loanPurpose } };
};

export const payLoan = (amount) => {
  return { type: "account/payLoan" };
};
*/