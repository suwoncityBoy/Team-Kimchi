// src/redux/modules/counterSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  addItem: [], // 배열로 관리 => 장바구니 페이지(배열에 넣은 데이터들 사용), 장바구니 아이콘(배열방 갯수로 사용)에 사용할 예정
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.addItem = [...state.addItem, action.payload];
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
export const { addItem } = cartSlice.actions;
// reducer 는 configStore에 등록하기 위해 export default 합니다.
export default cartSlice.reducer;
