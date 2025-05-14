"use client";

import Breadcrumb from "@/components/Breadcrumb";
import CustomModal from "@/components/CustomModal";
import InputFields from "@/components/Fields/InputFields";
import SelectFields from "@/components/Fields/SelectFields";
import TextFields from "@/components/Fields/TextFields";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Modal from "@/components/Modal";
import Detail from "@/components/Recomendation/Detail";
import Table from "@/components/Table";
import useFetch from "@/hooks/useFetch";
import { useGetInstitutionsQuery } from "@/services/Institution/institution";
import { useGetPartnersQuery } from "@/services/partner/endpoints";
import {
    useGetRecomendationsQuery,
    useUpdateRecomendationMutation,
} from "@/services/recomendation/endpoints";
import { RecomendationType } from "@/types/pages/recomendation";
import { DEFAULT_RECOMENDATION_DATA } from "@/utils/constans";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useStore } from "react-redux";
import { toast } from "react-toastify";

const Page: React.FC = () => {
    const { data: recomendationData } = useGetRecomendationsQuery({});
    const { data: institutionData } = useGetInstitutionsQuery({});
    const { data: partnerData } = useGetPartnersQuery({});

    const [updateRecomendation, { isLoading: isUpdateRecomendationLoading }] =
        useUpdateRecomendationMutation();
    const [
        approvalRecomendation,
        { isLoading: isApprovalRecomendationLoading },
    ] = useUpdateRecomendationMutation();

    const [selectedData, setSelectedData] = useState(
        DEFAULT_RECOMENDATION_DATA,
    );
    const [showPopup, setShowPopup] = useState(false);

    const handleSelectedData = (data: RecomendationType) => {
        setSelectedData(data);
        setShowPopup(true);
    };

    const store = useStore();
    const state = store.getState();

    const columns = [
        {
            name: "No Registrasi",
            selector: (row: RecomendationType) => row.noreg,
            sortable: true,
        },
        {
            name: "Nama Pejabat",
            selector: (row: RecomendationType) => row.nama_pejabat,
            sortable: true,
        },
        {
            name: "Nama Pejabat Pengganti",
            selector: (row: RecomendationType) => row.nama_pejabat_pengganti,
            sortable: true,
        },
        {
            name: "Status Persetujuan",
            cell: (row: RecomendationType) => (
                <div
                    className={`${row.status == "disetujui" ? "bg-green-500 text-white" : "bg-yellow-500 text-white"} rounded-md p-2 text-xs font-semibold`}
                >
                    {row.status == "disetujui"
                        ? "Surat disetujui"
                        : "Sedang Menunggu"}
                </div>
            ),
        },
        {
            name: "Aksi",
            cell: (row: RecomendationType) => (
                <button
                    className="text-blue-500 hover:underline"
                    onClick={() => handleSelectedData(row)}
                >
                    Edit
                </button>
            ),
        },
    ];

    useEffect(() => console.log(institutionData), [])

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Daftar Surat Rekom" />
            <Table
                name="Data Surat Rekomendasi"
                data={recomendationData ? recomendationData.data.data : []}
                column={columns}
                addButtonLink="/recomendation"
                addButtonName="Ajukan Permohonan"
            />
            <Detail
                institutionData={institutionData}
                partnerData={partnerData}
                selectedData={selectedData}
                setShowPopup={setShowPopup}
                showPopup={showPopup}
            />
        </DefaultLayout>
    );
};

export default Page;
