import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  inCart: [], // 배열로 관리 => 장바구니 페이지(배열에 넣은 데이터들 사용), 장바구니 아이콘(배열방 갯수로 사용)에 사용할 예정
  totalSum: 0,
  lastSum: 0,
  initSum: 0,
};

const cartSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.inCart = [...state.inCart, action.payload];
      state.totalSum += action.payload.price;
    },
    popItem: (state, action) => {
      state.inCart = [
        ...state.inCart.filter((item) => item.id !== action.payload.id),
      ];
      state.totalSum -= action.payload.stock * action.payload.price;
    },
    clearItem: (state, action) => {
      state.inCart = [];
      state.totalSum = 0;
    },
    plusPrice: (state, action) => {
      //state.lastSum -= action.payload;
      state.totalSum += action.payload;
      state.inCart = [...state.inCart];
    },
    minusPrice: (state, action) => {
      //state.lastSum += action.payload;
      state.totalSum -= action.payload;
      state.inCart = [...state.inCart];
    },
    changeChecked: (state, action) => {
      state.inCart = [...action.payload];
      state.totalSum = state.totalSum;
      state.lastSum = state.lastSum;
    },
  },
});

// //createSlice API 뼈대

// const counterSlice = createSlice({
// 	name: '', // 이 모듈의 이름
// 	initialState : {}, // 이 모듈의 초기상태 값
// 	reducers : {}, // 이 모듈의 Reducer 로직
// })

// 액션크리에이터는 컴포넌트에서 사용하기 위해 export 하고
export const {
  addItem,
  popItem,
  plusPrice,
  minusPrice,
  changeChecked,
  clearItem,
} = cartSlice.actions;
// reducer 는 configStore에 등록하기 위해 export default 합니다.
export default cartSlice.reducer;
