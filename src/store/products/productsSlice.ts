import { createSlice } from "@reduxjs/toolkit";
import actGetProducts from "./act/actGetProducts";
import { TLoading } from "src/types/shared";
import { TProduct } from "src/types/productTypes";

// type of the initial state
interface IProductsSlice {
  records: TProduct[];
  loading: TLoading;
  error: null | string;
}

// ? idle → الحالة الافتراضية قبل ما يبدأ أي طلب (يعني مفيش حاجة بتحصل).
// ? pending → لما الطلب بدأ ولسه مستني الرد من الـ API.
// ? succeeded → لما الطلب خلص بنجاح وجاب البيانات المطلوبة.
// ? failed → لما الطلب فشل وحصل خطأ.
const initialState: IProductsSlice = {
  records: [],
  loading: "idle",
  error: null,
};
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productsCleanUp: (state) => {
      state.records = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetProducts.pending, (state) => {
      state.loading = "pending";

      state.error = null;
    });
    builder.addCase(actGetProducts.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = action.payload;
    });
    builder.addCase(actGetProducts.rejected, (state, action) => {
      state.loading = "failed";

      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

export const { productsCleanUp } = productsSlice.actions;
export { actGetProducts };
export default productsSlice.reducer;
