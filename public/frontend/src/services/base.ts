import { storeType } from "@/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApiSlice = createApi({
    reducerPath: "persistedApi",
    baseQuery: fetchBaseQuery({ 
        baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as storeType).auth.token

            headers.set('Authorization', `Bearer ${token}`)

            return headers
        }
    }),
    tagTypes: ["Institutions", "Transportations", "Partners", "Permissions", "Roles", "Certificates"],
    endpoints: () => ({})
})