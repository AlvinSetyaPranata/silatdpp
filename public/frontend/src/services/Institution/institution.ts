import { InstitutionApiSlice } from "./base";


export const institutionApi = InstitutionApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInstitutions: builder.query({
      query: () => "",
      providesTags: ["Institutions"]
    }),
    addInstitution: builder.mutation({
      query: (form) => ({
        url: "",
        method: "POST",
        body: new URLSearchParams(form)
      }),
      invalidatesTags: ["Institutions"]
    }),
    deleteInstitution: builder.mutation({
      query: (idItem) => ({
        url: `/${idItem}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Institutions"]
    }),
    updateInstitution: builder.mutation({
      query: ({ idItem, form }) => ({
        url: `/${idItem}`,
        method: "PUT",
        body: new URLSearchParams(form)
      }),
      invalidatesTags: ["Institutions"]
    })
  })
})

export const { useGetInstitutionsQuery, useUpdateInstitutionMutation, useAddInstitutionMutation, useDeleteInstitutionMutation } = institutionApi;