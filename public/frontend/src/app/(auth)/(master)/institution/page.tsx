"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Table from "@/components/Table";
import { INSTITUTION_DEFAULT_DATA } from "@/utils/constans";
import Modal from "@/components/Modal";
import React, { useEffect, useState } from "react";
import InputFields from "@/components/Fields/InputFields";
import { useDeleteInstitutionMutation, useGetInstitutionsQuery, useUpdateInstitutionMutation } from "@/services/Institution/institution";
import Breadcrumb from "@/components/Breadcrumb";
import { toast } from "react-toastify";

const Institution: React.FC = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedData, setSelectedData] = useState(INSTITUTION_DEFAULT_DATA);
    const {data, isLoading } = useGetInstitutionsQuery({})
    const [updateInstitution, { isLoading: isUpdating, isError: updateError, isSuccess: isUpdated }] = useUpdateInstitutionMutation()
    const [deleteInstitution, { isLoading: isDeleting, isError: deleteError, isSuccess: isDeleted }] = useDeleteInstitutionMutation()

    const handleSelectedData = (data) => {
        setShowPopup(true);
        setSelectedData(data);
    };

    const columns = [
        {
            name: "Nama Institusi",
            selector: (row: Record<string, string>) => row.nama,
            sortable: true,
        },
        {
            name: "Alamat Institusi",
            selector: (row: Record<string, string>) => row.alamat,
            sortable: true,
        },
        {
            name: "Kontak Institusi",
            selector: (row: Record<string, string>) => row.kontak,
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
    
                
                const timeout = setTimeout(() => {
                    setShowPopup(false);
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
             <Breadcrumb pageName="Data Instansi" />
            <Table
                addButtonName="Tambah Institusi"
                addButtonLink="/institution/addData"
                name="Daftar Institusi"
                column={columns}
                data={data ? data.data : []}
                detailLink={{ name: "Pengaturan", to: "/institution" }}
                isLoading={isLoading}
            />
            <Modal
                idItem={selectedData.id}
                mutation={updateInstitution}
                deleteMutation={deleteInstitution}
                title="Edit Institusi"
                isUpdating={isUpdating}
                isDeleting={isDeleting}
                state={showPopup}
                stateSetter={setShowPopup}
                ableUpdate={true}
                ableDelete={true}
            >
                <InputFields
                    title="Nama Institusi"
                    name="nama"
                    defaultValue={selectedData.nama}
                />
                <InputFields
                    title="Alamat Institusi"
                    name="alamat"
                    defaultValue={selectedData.alamat}
                />
                <InputFields
                    title="Kontak Institusi"
                    name="kontak"
                    defaultValue={selectedData.kontak}
                />
            </Modal>
        </DefaultLayout>
    );
};

export default Institution;
