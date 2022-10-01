import { createSlice } from "@reduxjs/toolkit";
import pluralize from "pluralize";
import api from "../../services/scanApi";
import { signMessageWithExtension } from "../../services/chainApi";

const descriptionSlice = createSlice({
  name: "description",
  initialState: {
    description: "",
  },
  reducers: {
    setDescription(state, { payload }) {
      state.description = payload;
    },
  },
});

export const { setDescription } = descriptionSlice.actions;

export const fetchDescription =
  (chain, type = "", index) =>
  async (dispatch) => {
    const { result } = await api.fetch(
      `/${chain}/${pluralize(type)}/${index}/description`
    );
    dispatch(setDescription(result || {}));
  };

export const putDescription =
  (chain, type, index, description, proposalType, status, address, extensionName) => async (dispatch) => {
    const signature = await signMessageWithExtension(
      JSON.stringify({
        chain,
        type,
        index,
        description,
        proposalType,
        status,
      }),
      address,
      extensionName
    );

    await api.fetch(
      `/${chain}/${pluralize(type)}/${index}/description`,
      {},
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Signature: address ? `${address}/${signature}` : "",
        },
        body: JSON.stringify({ description, proposalType, status }),
      }
    );
    dispatch(fetchDescription(chain, type, index));
  };

export const descriptionSelector = (state) => state.description.description;

export default descriptionSlice.reducer;
