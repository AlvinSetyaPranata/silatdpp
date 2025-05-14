import { NewsApiSlice } from "./base";


export const newsApi = NewsApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNews: builder.query({
      query: () => "",
      providesTags: ["News"]
    }),

    addNews: builder.mutation({
      query: (form) => ({
        url: "",
        method: "POST",
        body: form
      }),
      invalidatesTags: ["News"]
    }),

    deleteNews: builder.mutation({
      query: (idItem) => ({
        url: `/${idItem}`,
        method: "DELETE"
      }),
      invalidatesTags: ["News"]
    }),

    updateNews: builder.mutation({
      query: ({ idItem, form }) => ({
        url: `/${idItem}`,
        method: 'PUT',
        body: form
      }),
      invalidatesTags: ["News"]
    })
  })
})

export const { useGetNewsQuery, useAddNewsMutation, useDeleteNewsMutation, useUpdateNewsMutation } = newsApi;