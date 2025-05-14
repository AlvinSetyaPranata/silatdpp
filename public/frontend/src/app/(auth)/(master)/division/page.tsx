"use client";

import Breadcrumb from "@/components/Breadcrumb";
import InputFields from "@/components/Fields/InputFields";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Modal from "@/components/Modal";
import Table from "@/components/Table";
import {
    useDeleteDivisionMutation,
    useGetDivisionsQuery,
    useUpdateDivisionMutation,
} from "@/services/division/endpoints";
import { DivisionDataType } from "@/types/pages/division";
import { DEFAULT_DIVISION_DATA } from "@/utils/constans";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Division: React.FC = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedData, setSelectedData] = useState(DEFAULT_DIVISION_DATA);

    const { data, isLoading } = useGetDivisionsQuery({});
    const [
        updateDivision,
        { isLoading: isUpdating, isError: updateError, isSuccess: isUpdated },
    ] = useUpdateDivisionMutation();
    const [
        deleteDivision,
        { isLoading: isDeleting, isError: deleteError, isSuccess: isDeleted },
    ] = useDeleteDivisionMutation();

    const handleSelectedData = (data: DivisionDataType) => {
        setShowPopup(true);
        setSelectedData(data);
    };

    const columns = [
        {
            name: "Nama Bidang",
            selector: (row: Record<string, string>) => row.nama,
            sortable: true,
        },
        {
            name: "Aksi",
            cell: (row: DivisionDataType) => (
                <button
                    className="text-blue-500 hover:underline"
                    onClick={() => handleSelectedData(row)}
                >
                    Edit
                </button>
            ),
        },
    ];

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
            <Breadcrumb pageName="Data Divisi" />
            <Table
                data={data ? data.data : []}
                column={columns}
                name="Data Divisi"
                isLoading={isLoading}
                addButtonLink="/division/addData"
                addButtonName="Tambah Divisi"
            />
            <Modal
                idItem={selectedData.id}
                title="Edit Divisi"
                state={showPopup}
                stateSetter={setShowPopup}
                ableUpdate={true}
                ableDelete={true}
                mutation={updateDivision}
                deleteMutation={deleteDivision}
            >
                <InputFields
                    title="Nama Divisi"
                    name="nama"
                    defaultValue={selectedData.nama}
                />
            </Modal>
        </DefaultLayout>
    );
};

export default Division;
