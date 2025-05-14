"use client";

import Breadcrumb from "@/components/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useEffect, useState } from "react";
import { DEFAULT_BUDGET_DATA } from "@/utils/constans";
import Table from "@/components/Table";
import InputFields from "@/components/Fields/InputFields";
import Modal from "@/components/Modal";

import { BudgetDataType } from "@/types/pages/budget";
import { useDeleteBudgetsMutation, useGetBudgetsQuery, useUpdateBudgetsMutation } from "@/services/budget/endpoints";
import { toast } from "react-toastify";


const Page: React.FC = () => {

    const [showPopup, setShowPopup] = useState(false);
    const [selectedData, setSelectedData] = useState<BudgetDataType>(DEFAULT_BUDGET_DATA);

    const { data, isLoading } = useGetBudgetsQuery({})
    const [updateBudget, { isLoading: isUpdating, isError: updateError, isSuccess: isUpdated}] = useUpdateBudgetsMutation()
    const [deleteBudget, { isLoading: isDeleting, isError: deleteError, isSuccess: isDeleted }] = useDeleteBudgetsMutation()

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


    useEffect(() => {
            if (isUpdating) {
                toast.info("Memperbarui data divisi", { position: "top-right" });
                return;
            }
    
            if (updateError) {
                toast.error("Gagal memperbarui data divisi", {
                    position: "top-right",
                });
            }
    
            if (isUpdated) {
                toast.success("Berhasil memperbarui data divisi", {
                    position: "top-right",
                });
    
                setShowPopup(false);
    
                const timeout = setTimeout(() => {
                    window.location.reload();
                }, 1000);
                return () => clearTimeout(timeout);
            }
        }, [isUpdating]);
    
        useEffect(() => {
            if (isDeleting) {
                toast.info("Menghapus data divisi", { position: "top-right" });
                return;
            }
    
            if (deleteError) {
                toast.error("Gagal menghapus data divisi", {
                    position: "top-right",
                });
            }
    
            if (isDeleted) {
                toast.success("Berhasil menghapus data divisi", {
                    position: "top-right",
                });
    
                setShowPopup(false);
            }
        }, [isDeleting]);

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
                deleteMutation={deleteBudget}
                ableUpdate={true}
                ableDelete={true}
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
