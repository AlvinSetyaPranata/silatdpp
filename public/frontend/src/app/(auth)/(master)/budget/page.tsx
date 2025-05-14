"use client";

import Breadcrumb from "@/components/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useEffect, useState } from "react";
import { DEFAULT_BUDGET_DATA } from "@/utils/constans";
import Table from "@/components/Table";
import InputFields from "@/components/Fields/InputFields";
import Modal from "@/components/Modal";

import { BudgetDataType } from "@/types/pages/budget";
import { useGetBudgetsQuery, useUpdateBudgetsMutation } from "@/services/budget/endpoints";


const Page: React.FC = () => {

    const [showPopup, setShowPopup] = useState(false);
    const [selectedData, setSelectedData] = useState<BudgetDataType>(DEFAULT_BUDGET_DATA);

    const { data, isLoading } = useGetBudgetsQuery({})
    const [updateBudget] = useUpdateBudgetsMutation()

    const handleSelectedData = (data: BudgetDataType) => {
        setShowPopup(true);
        setSelectedData(data);
    };


    const column = [
        {
            name: "Jenis Biaya",
            selector: (row: Record<string, string>) => row.name,
            sortable: true,
        },
        {
            name: "Aksi",
            cell: (row: BudgetDataType) => (
                <button
                    className="text-blue-500 hover:underline"
                    onClick={() => handleSelectedData(row)}
                >
                    Edit
                </button>
            ),
        },
    ]

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Data tingkat biaya" />
            <>
                <Table
                    data={data ? data.data : []}
                    column={column}
                    name="Budget"
                    addButtonLink="/budget/addData"
                    addButtonName="Tambah Biaya"
                    isLoading={isLoading}
                />
            </>
            <Modal
                idItem={selectedData.id}
                mutation={updateBudget}
                ableUpdate={true}
                title="Edit Biaya"
                state={showPopup}
                stateSetter={setShowPopup}
            >
                <InputFields
                    title="Jenis Biaya"
                    name="name"
                    defaultValue={selectedData.name}
                />
            </Modal>
        </DefaultLayout>
    );
};

export default Page;
