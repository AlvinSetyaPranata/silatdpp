import { createApi, fetchBaseQuery, RootState } from "@reduxjs/toolkit/query/react";

export const baseApiSlice = createApi({
    reducerPath: "persistedApi",
    baseQuery: fetchBaseQuery({ 
        baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).auth.token
            
            headers.set('Authorization', `Bearer ${token}`)

            return headers
        }
    }),
    tagTypes: ["Divisions", "Institutions", "Transportations", "Budgets", "Partners", "GuestBooks", "Permissions", "Roles", "Certificates", "News"],
    endpoints: () => ({})
})