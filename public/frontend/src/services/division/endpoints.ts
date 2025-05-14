import { DivisionApiSlice } from "./base";


export const divisionApi = DivisionApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDivisions: builder.query({
      query: () => "",
      providesTags: ['Divisions']
    }),
    getDivisionById: builder.query({
      query: (id) => `/${id}`
    }),

    addDivision: builder.mutation({
      query: (form) => ({
        url: "",
        method: "POST",
        body: new URLSearchParams(form),
      }),
      invalidatesTags: ['Divisions'],
    }),
    deleteDivision: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Divisions'],
    }),

    updateDivision: builder.mutation({
      query: ({ idItem, form }) => ({
        url: `/${idItem}`,
        method: "PUT",
        body: new URLSearchParams(form),
      }),
      invalidatesTags: ['Divisions'],
    })
  })
})

export const { useGetDivisionsQuery, useGetDivisionByIdQuery, useUpdateDivisionMutation, useAddDivisionMutation, useDeleteDivisionMutation } = divisionApi;