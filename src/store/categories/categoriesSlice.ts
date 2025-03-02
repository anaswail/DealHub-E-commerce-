import { createSlice } from "@reduxjs/toolkit";
import actGetCategories from "./act/actGetCategories";
import { TLoading } from "src/types/shared";
import { TCategory } from "src/types/categoryTypes";

// type of the initial state
interface ICategoriesSlice {
  records: TCategory[];
  loading: TLoading;
  error: null | string;
}

// ? idle → الحالة الافتراضية قبل ما يبدأ أي طلب (يعني مفيش حاجة بتحصل).
// ? pending → لما الطلب بدأ ولسه مستني الرد من الـ API.
// ? succeeded → لما الطلب خلص بنجاح وجاب البيانات المطلوبة.
// ? failed → لما الطلب فشل وحصل خطأ.
const initialState: ICategoriesSlice = {
  records: [],
  loading: "idle",
  error: null,
};
const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actGetCategories.pending, (state) => {
      state.loading = "pending";

      state.error = null;
    });
    builder.addCase(actGetCategories.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = action.payload;
    });
    builder.addCase(actGetCategories.rejected, (state, action) => {
      state.loading = "failed";

      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});
export { actGetCategories };
export default categoriesSlice.reducer;
