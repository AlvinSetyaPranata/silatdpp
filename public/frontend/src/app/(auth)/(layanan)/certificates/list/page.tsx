"use client";

import Breadcrumb from "@/components/Breadcrumb";
import Detail from "@/components/Certificate/Detail";
import InputFields from "@/components/Fields/InputFields";
import SelectFields from "@/components/Fields/SelectFields";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Modal from "@/components/Modal";
import Table from "@/components/Table";
import {
    useGetCertificatesQuery,
    useUpdateCertificateMutation,
} from "@/services/cerificates/endpoints";
import { useGetInstitutionsQuery } from "@/services/Institution/institution";
import { DEFAULT_CERTIFICATE_DATA } from "@/utils/constans";
import { useState } from "react";

const Page: React.FC = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedData, setSelectedData] = useState(DEFAULT_CERTIFICATE_DATA);

    const handleSelectedData = (data) => {
        setShowPopup(true);
        setSelectedData(data);
    };

    const { data: certificatesData } = useGetCertificatesQuery({});
    const { data: institutionsData } = useGetInstitutionsQuery({});
    const [updateCertificate] = useUpdateCertificateMutation();

    const columns = [
        {
            name: "Nama Siswa",
            selector: (row: Record<string, string>) => row.nama_siswa,
            sortable: true,
        },
        {
            name: "Insititusi",
            selector: (row: Record<string, string>) => {
                const res = institutionsData ? institutionsData.data.filter(
                    (institution) => row.institusi_id == institution.id,
                ) : [];

                if (res.length == 0) return "";

                return res[0].nama;
            },
            sortable: true,
        },
        {
            name: "Status",
            cell: (row: Record<string, string>) => (
                <div
                    className={`rounded-md p-1.5 text-sm font-medium text-white ${row.status == "pengajuan" ? "bg-yellow-500" : "bg-green-500"}`}
                >
                    {row.status}
                </div>
            ),
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

    return (
        <DefaultLayout>
            <Breadcrumb pageName="List Pengajuan Ijazah" />
            <Table
                name="Data Pengajuan Perubahan Ijazah"
                column={columns}
                data={certificatesData ? certificatesData.data : []}
                addButtonName="Ajukan Permohonan"
                addButtonLink="/certificates"
            />
            <Detail selectedData={selectedData} setShowPopup={setShowPopup} showPopup={showPopup} />
        </DefaultLayout>
    );
};

export default Page;
