import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalCount: 0,

  customIP: '',
};

const cartSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateTotalCount: (state, action) => {
      state.totalCount += action.payload;
    },
    initTotalCount: (state, action) => {
      state.totalCount = action.payload;
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
export const { updateTotalCount, initTotalCount } = cartSlice.actions;
// reducer 는 configStore에 등록하기 위해 export default 합니다.
export default cartSlice.reducer;
