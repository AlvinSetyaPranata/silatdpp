import { DivisionApiSlice } from "./base";


export const divisionApi = DivisionApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDivisions: builder.query({
      query: () => "/divisi",
      providesTags: ['Divisions']
    }),
    getDivisionById: builder.query({
      query: (id) => `/divisi/${id}`
    }),
    updateDivision: builder.mutation({
      query: ({ idItem, form }) => ({
        url: `/divisi/${idItem}`,
        method: "PUT",
        body: new URLSearchParams(form),
      }),
      invalidatesTags: ['Divisions'],
    })
  })
})

export const { useGetDivisionsQuery, useGetDivisionByIdQuery, useUpdateDivisionMutation } = divisionApi;