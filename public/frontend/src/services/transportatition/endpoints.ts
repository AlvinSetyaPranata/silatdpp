import { baseApiSlice } from "../base";


export const transportationApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTransportations: builder.query({
      query: () => "",
      providesTags: ["Transportations"]
    }),
    updateTransportation: builder.mutation({
      query: ({ idItem, form}) => ({
        url: `/${idItem}`,
        method: "PUT",
        body: new URLSearchParams(form)
      }),
      invalidatesTags: ["Transportations"] 
    })
  })
})

export const { useGetTransportationsQuery, useUpdateTransportationMutation } = transportationApi;