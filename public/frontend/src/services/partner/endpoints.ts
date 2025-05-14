import { PartnerApiSlice } from "./base";


export const partnerApi = PartnerApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPartners: builder.query({
      query: () => "",
      providesTags: ["Partners"]
    }),

    addPartner: builder.mutation({
      query: (form) => ({
        url: '',
        method: 'POST',
        body: new URLSearchParams(form)
      }),
      invalidatesTags: ["Partners"]
    }),


    updatePartner: builder.mutation({
      query: ({ idItem, form }) => ({
        url: `/${idItem}`,
        method: 'PUT',
        body: new URLSearchParams(form)
      }),
      invalidatesTags: ["Partners"]
    }),

    deletePartner: builder.mutation({
      query: ({ idItem }) => ({
        url: `/${idItem}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["Partners"]
    }),
  })
})

export const { useGetPartnersQuery, useUpdatePartnerMutation, useAddPartnerMutation, useDeletePartnerMutation } = partnerApi;