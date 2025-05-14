import { StaffApiSlice } from "./base";


export const userApi = StaffApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => "",
      providesTags: ["Staffs"]
    }),
  })
})

export const { useGetAllUserQuery } = userApi;