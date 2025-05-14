import { storeType } from "@/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const GuestBookApiSlice = createApi({
    reducerPath: "GuestBookApi",
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${process.env.NEXT_PUBLIC_BASE_API_URL}/divisi`,
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as storeType).auth.token

            headers.set('Authorization', `Bearer ${token}`)

            return headers
        }
    }),
    tagTypes: ["GuestBooks"],
    endpoints: () => ({})
})