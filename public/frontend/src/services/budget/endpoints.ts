import { BudgetApiSlice } from "./base";


export const budgetApi = BudgetApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBudgets: builder.query({
      query: () => "",
      providesTags: ["Budgets"]   }),

    addBudgets: builder.mutation({
      query: (form) => ({
        url: "",
        method: "POST",
        body: new URLSearchParams(form)
      }),
      invalidatesTags: ["Budgets"]
    }),

    deleteBudgets: builder.mutation({
      query: (idItem) => ({
        url: `/${idItem}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Budgets"]
    }),

    updateBudgets: builder.mutation({
      query: ({ idItem, form }) => ({
        url: `/${idItem}`,
        method: 'PUT',
        body: new URLSearchParams(form)
      }),
      invalidatesTags: ["Budgets"]
    }),

    
  })
})

export const { useGetBudgetsQuery, useAddBudgetsMutation, useDeleteBudgetsMutation, useUpdateBudgetsMutation } = budgetApi;