import { createSlice } from "@reduxjs/toolkit";

interface ProductState {
    id: string | null,
    name: string | null,
    price: string | null,
}

const initialState: ProductState = {
    id: null,
    name: null,
    price: null,
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        getAllProducts: (state, action) => {
            const product = action.payload as ProductState;
            state.id = product.id;
            state.name = product.name;
            state.price = product.price;
        },
    }
});
export const { getAllProducts } = productSlice.actions;
export default productSlice.reducer;