import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; // redux toolkit createSlice
import axios from 'axios';

// export const __getKimchis = createAsyncThunk(
//   // 첫번째 인자 : action type
//   'kimchis/getKimchis',
//   // 두번째 인자 : 콜백함수
//   async (payload, thunkAPI) => {
//     try {
//       const data = await axios.get('http://localhost:3001/kimchis');
//       console.log(data);
//     } catch (error) {
//       console.log(error);
//     }
//   },
// );

const initialState = {
  number: 1,

  product: {
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
      const { price, number } = action.payload;
      console.log(price, number);
      state.number += 1;
      state.product.sum += action.payload;
    },

    minusNumber: (state, action) => {
      if (state.number > 1) {
        state.number -= 1;
        state.product.sum -= action.payload;
      }
    },
    addProduct: (state, action) => {
      state.product = action.payload;
    },
  },
});

// 액션크리에이터는 컴포넌트에서 사용하기 위해 export 하고
export const { addNumber, minusNumber, addProduct } =
  productDetailSlice.actions;
// reducer 는 configStore에 등록하기 위해 export default 합니다.
export default productDetailSlice.reducer;
