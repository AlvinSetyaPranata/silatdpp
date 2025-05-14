import { NewsApiSlice } from "./base";


export const newsApi = NewsApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPermissions: builder.query({
      query: () => "/hak-akses",
      providesTags: ["News"]
    }),
    updatePermission: builder.mutation({
      query: ({ idItem, form }) => ({
        url: `/hak-akses/${idItem}`,
        method: 'PUT',
        body: new URLSearchParams(form)
      }),
      invalidatesTags: ["News"]
    })
  })
})

export const { useGetPermissionsQuery, useUpdatePermissionMutation } = newsApi;