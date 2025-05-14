import { storeType } from "@/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const CertificateApiSlice = createApi({
    reducerPath: "CertificateApi",
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${process.env.NEXT_PUBLIC_BASE_API_URL}/ijazah`,
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as storeType).auth.token

            headers.set('Authorization', `Bearer ${token}`)

            return headers
        }
    }),
    tagTypes: ["Divisions", "Institutions", "Transportations", "Partners", "GuestBooks", "Permissions", "Roles", "Certificates", "News"],
    endpoints: () => ({})
})