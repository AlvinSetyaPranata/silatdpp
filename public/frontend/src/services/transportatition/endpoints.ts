import { TransportationApiSlice } from "./base";


export const transportationApi = TransportationApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTransportations: builder.query({
      query: () => "",
      providesTags: ["Transportations"]
    }),

    addTransportation: builder.mutation({
      query: (form) => ({
        url: '',
        method: 'POST',
        body: new URLSearchParams(form)
      }),
      invalidatesTags: ["Transportations"]
    }),


    updateTransportation: builder.mutation({
      query: ({ idItem, form}) => ({
        url: `/${idItem}`,
        method: "PUT",
        body: new URLSearchParams(form)
      }),
      invalidatesTags: ["Transportations"] 
    }),

    deleteTransportation: builder.mutation({
      query: ({ idItem}) => ({
        url: `/${idItem}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Transportations"] 
    })

  })
})

export const { useGetTransportationsQuery, useUpdateTransportationMutation, useAddTransportationMutation, useDeleteTransportationMutation } = transportationApi;