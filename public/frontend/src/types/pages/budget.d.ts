export type BudgetDataType = {
    id: string,
    name: string,
    created_at: string,
    updated_at: string
}

export interface BudgetProps {
    data: BudgetDataType[]
}