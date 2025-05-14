"use client";

import Breadcrumb from "@/components/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Table from "@/components/Table";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import InputFields from "@/components/Fields/InputFields";
import { DEFAULT_PARTNERS_DATA } from "@/utils/constans";
import {
    useDeletePartnerMutation,
    useGetPartnersQuery,
    useUpdatePartnerMutation,
} from "@/services/partner/endpoints";
import { toast } from "react-toastify";

const Partner = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedData, setSelectedData] = useState(DEFAULT_PARTNERS_DATA);

    const { data, isLoading } = useGetPartnersQuery({});
    const [
        updatePartner,
        { isLoading: isUpdating, isError: updateError, isSuccess: isUpdated },
    ] = useUpdatePartnerMutation();
    const [
        deletePartner,
        { isLoading: isDeleting, isError: deleteError, isSuccess: isDeleted },
    ] = useDeletePartnerMutation();

    const handleSelectedData = (data) => {
        setShowPopup(true);
        setSelectedData(data);
    };

    const columns = [
        {
            name: "Nama Rekan",
            selector: (row: Record<string, string>) => row.nama,
            sortable: true,
        },
        {
            name: "Alamat",
            selector: (row: Record<string, string>) => row.alamat,
            sortable: true,
        },
        {
            name: "Kota",
            selector: (row: Record<string, string>) => row.kota,
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
            toast.info("Memperbarui data mitra", { position: "top-right" });
            return;
        }

        if (updateError) {
            toast.error("Gagal memperbarui data mitra", {
                position: "top-right",
            });
        }

        if (isUpdated) {
            toast.success("Berhasil memperbarui data mitra", {
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
            toast.info("Menghapus data mitra", { position: "top-right" });
            return;
        }

        if (deleteError) {
            toast.error("Gagal menghapus data mitra", {
                position: "top-right",
            });
        }

        if (isDeleted) {
            toast.success("Berhasil menghapus data mitra", {
                position: "top-right",
            });

            setShowPopup(false);
        }
    }, [isDeleting]);

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Data Rekan" />
            <Table
                name="Data Mitra"
                column={columns}
                data={data ? data.data : []}
                addButtonName="Tambah Rekan"
                addButtonLink="/partners/addData"
                isLoading={isLoading}
            />
            <Modal
                idItem={selectedData.id}
                mutation={updatePartner}
                deleteMutation={deletePartner}
                title="Edit Biaya"
                state={showPopup}
                stateSetter={setShowPopup}
                ableUpdate={true}
                ableDelete={true}
            >
                <InputFields
                    title="Nama Instansi Mitra"
                    name="biaya"
                    defaultValue={selectedData.nama}
                />
                <InputFields
                    title="Alamat Instansi Mitra"
                    name="biaya"
                    defaultValue={selectedData.alamat}
                />
                <InputFields
                    title="Kota Instansi Mitra"
                    name="biaya"
                    defaultValue={selectedData.kota}
                />
            </Modal>
        </DefaultLayout>
    );
};

export default Partner;
