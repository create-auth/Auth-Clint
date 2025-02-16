import { apiSlice } from "../../ApiSlice";
import { getAllProducts } from "./product";
interface ProductState {
    id: string | null,
    name: string | null,
    price: string | null,
}
export const productSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<ProductState[], void>({
            query: () => "products",
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data.length > 0) {
                        dispatch(getAllProducts(data[0]));
                    }
                } catch (error) {
                    console.error("Error fetching Products:", error);
                }
            },
        }),
    }),
});
export const { useGetProductsQuery } = productSlice;
export default productSlice.reducer;