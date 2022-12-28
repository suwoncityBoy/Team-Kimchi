import { createSlice } from '@reduxjs/toolkit'; // redux toolkit createSlice
const initialState = {
  product: {
    number: 1,
    price: 0,
    name: '',
    image: '',
    description: '',
    sum: 0,
  },
};

const productDetailSlice = createSlice({
  name: 'productDetail', // 모듈 이름
  initialState, // 초기상태값
  reducers: {
    addNumber: (state, action) => {
      state.product.number += 1;
      state.product.sum += action.payload;
    },

    minusNumber: (state, action) => {
      if (state.product.number > 1) {
        state.product.number -= 1;
        state.product.sum -= action.payload;
      }
    },

    resetNumber: (state, action) => {
      state.product.number = 1;
      state.product.sum = action.payload;
    },

    addProduct: (state, action) => {
      state.product = action.payload;
    },
  },
});

// 액션크리에이터는 컴포넌트에서 사용하기 위해 export 하고
export const { addNumber, minusNumber, resetNumber, addProduct } =
  productDetailSlice.actions;
// reducer 는 configStore에 등록하기 위해 export default 합니다.
export default productDetailSlice.reducer;
