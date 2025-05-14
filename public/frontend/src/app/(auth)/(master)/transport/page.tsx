"use client";

import Breadcrumb from "@/components/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Table from "@/components/Table";
import { DEFAULT_TRANSPORTATION } from "@/utils/constans";
import React, { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import InputFields from "@/components/Fields/InputFields";
import { useDeleteTransportationMutation, useGetTransportationsQuery, useUpdateTransportationMutation } from "@/services/transportatition/endpoints";
import { toast } from "react-toastify";

const Page: React.FC = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedData, setSelectedData] = useState(DEFAULT_TRANSPORTATION);

    const {data, isLoading } = useGetTransportationsQuery({})
    const [updateTransport, { isLoading: isUpdating, isError: updateError, isSuccess: isUpdated }] = useUpdateTransportationMutation()
    const [deleteTransport, { isLoading: isDeleting, isError: deleteError, isSuccess: isDeleted }] = useDeleteTransportationMutation()

    const handleSelectedData = (data) => {
        setShowPopup(true);
        setSelectedData(data);
    };

    const columns = [
        {
            name: "Nama Transportasi",
            selector: (row: Record<string, string>) => row.nama,
            sortable: true,
        },
        {
            name: "Jenis Transportasi",
            selector: (row: Record<string, string>) => row.jenis,
            sortable: true,
        },
        {
            name: "Aksi",
            cell: (row: Record<string, string>) => (
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
            <Breadcrumb pageName="Data Transportasi" />
            <Table
                data={data ? data.data : []}
                column={columns}
                name="Data Trasportasi"
                addButtonLink="/transport/addData"
                addButtonName="Tambah Transportasi"
                isLoading={isLoading}
            />
            <Modal
                idItem={selectedData.id}
                mutation={updateTransport}
                deleteMutation={deleteTransport}
                isDeleting={isDeleting}
                isUpdating={isUpdating}
                title="Edit Transportasi"
                state={showPopup}
                stateSetter={setShowPopup}
                ableUpdate={true}
                ableDelete={true}
            >
                <InputFields
                    title="Nama Transportasi"
                    name="nama"
                    defaultValue={selectedData.nama}
                />
                <InputFields
                    title="Jenis Transportasi"
                    name="jenis"
                    defaultValue={selectedData.jenis}
                />
            </Modal>
        </DefaultLayout>
    );
};

export default Page;
