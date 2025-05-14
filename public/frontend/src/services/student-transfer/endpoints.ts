import { baseApiSlice } from "../base";


export const studentTransferApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudentTransfer: builder.query({
      query: () => ""
    }),

    updateStudentTransfer: builder.mutation({
      query: ({ idItem, form }) => ({
        url: `/${idItem}`,
        method: "PUT",
        body: new URLSearchParams(form)
      })
    })
  })
})

export const { useGetStudentTransferQuery, useUpdateStudentTransferMutation } = studentTransferApi;