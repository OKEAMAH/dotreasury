import { createSlice, createSelector } from "@reduxjs/toolkit";

const tipSlice = createSlice({
  name: "tips",
  initialState: {
    tips: {
      items: [],
      page: 0,
      pageSize: 10,
      total: 0,
    },
    loading: false,
  },
  reducers: {
    setTips(state, { payload }) {
      state.tips = payload;
    },
    setLoading(state, { payload }) {
      state.loading = payload;
    },
  },
});

export const { setTips, setLoading } = tipSlice.actions;

export const fetchTips = (page = 0, pageSize = 20) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const resp = await window.fetch(`https://api.dotreasury.com/tips`);
    dispatch(setTips(await resp.json()));
  } finally {
    dispatch(setLoading(false));
  }
};

const tipFinalStates = ["TipRetracted", "TipClosed"];
const showStatusMap = {
  tip: "Tipping",
  TipRetracted: "Retracted",
  TipClosed: "Closed",
};

export const tipListSelector = (state) => state.tips.tips;
export const normalizedTipListSelector = createSelector(
  tipListSelector,
  (tip) => {
    const showTime = tipFinalStates.includes(tip.state?.state);
    const showStatus = showStatusMap[tip.state?.state];

    return {
      showTime,
      showStatus,
      ...tip,
    };
  }
);
export const loadingSelector = (state) => state.tips.loading;
export default tipSlice.reducer;
