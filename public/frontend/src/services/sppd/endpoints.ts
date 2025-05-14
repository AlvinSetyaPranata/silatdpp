import { SppdApiSlice } from "./base";


export const sppdApi = SppdApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSppds: builder.query({
      query: () => ""
    }),


    updateSppd: builder.mutation({
        query: (data) => ({
            url: `/${data.id}`,
            method: "PUT",
            body: data
        })
    }),

    
    sppdApproval: builder.mutation({
        query: (data) => ({
            url: `/${data.id}/approve`,
            method: "POST",
            body: data
        })
    })


  })
})

export const { useGetSppdsQuery, useSppdApprovalMutation, useUpdateSppdMutation } = sppdApi;