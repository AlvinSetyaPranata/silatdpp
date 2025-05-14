import { RecomendationApiSlice } from "./base";


export const recomendationApi = RecomendationApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRecomendations: builder.query({
      query: () => "",
      providesTags: ["Recomendation"]   }),

    addRecomendation: builder.mutation({
      query: (form) => ({
        url: "",
        method: "POST",
        body: new URLSearchParams(form)
      }),
      invalidatesTags: ["Recomendation"]
    }),

    deleteRecomendation: builder.mutation({
      query: (idItem) => ({
        url: `/${idItem}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Recomendation"]
    }),

    updateRecomendation: builder.mutation({
      query: ({ idItem, form }) => ({
        url: `/${idItem}`,
        method: 'PUT',
        body: new URLSearchParams(form)
      }),
      invalidatesTags: ["Recomendation"]
    }),

    approvalRecomendation: builder.mutation({
      query: (data) => ({
        url: `/${data.id}/approve`,
        method: "POST",
        body: data
      }),
      invalidatesTags: ["Recomendation"]
    }),
  })
})

export const { useGetRecomendationsQuery, useUpdateRecomendationMutation, useAddRecomendationMutation, useApprovalRecomendationMutation, useDeleteRecomendationMutation } = recomendationApi;