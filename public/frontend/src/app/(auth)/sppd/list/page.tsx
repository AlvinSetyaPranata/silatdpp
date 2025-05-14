"use client";

import React, { useEffect, useState } from "react";
import Table from "@/components/Table";
import { SppdDataType } from "@/types/pages/sppd";
import { getDateTime } from "@/utils/data";
import { DEFAULT_SPPD_DATA } from "@/utils/constans";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumb";
import Modal from "@/components/Modal";
import InputFields from "@/components/Fields/InputFields";
import { useGetSppdsQuery } from "@/services/sppd/endpoints";
import { useGetTransportationsQuery } from "@/services/transportatition/endpoints";
import ProgressLine from "@/components/progressiveBar";
import FilesFields from "@/components/Fields/FileFields";
import { useStore } from "react-redux";
import CustomModal from "@/components/CustomModal";
import { toast } from "react-toastify";
import { exportRecomendation, exportSppd } from "@/utils/documents";
import Link from "next/link";
import { create } from "domain";
import { storeType } from "@/store";
import Detail from "@/components/Sppd/Detail";
import { getStatus } from "@/utils/sppd/data";
import { useGetBudgetsQuery } from "@/services/budget/endpoints";

const SppdPage: React.FC = () => {
    const state = useStore().getState() as storeType;
    const auth = state.auth;

    const [showPopup, setShowPopup] = useState(false);
    const [selectedData, setSelectedData] = useState<SppdDataType>(DEFAULT_SPPD_DATA);

    const { data: sppdData, isLoading } = useGetSppdsQuery({});
    const { data: transporationData } = useGetTransportationsQuery({});
    const { data: budgetData } = useGetBudgetsQuery({});

    const columns = [
        {
            name: "Nama Pegawai",
            selector: (row: SppdDataType) => row.user.name,
            sortable: true,
        },
        {
            name: "Tempat Tujuan",
            selector: (row: SppdDataType) => row.tempat_tujuan,
            sortable: true,
        },
        {
            name: "Tanggal Kegiatan",
            selector: (row: SppdDataType) => getDateTime(row.tanggal_kegiatan),
            sortable: true,
        },
        {
            name: "Status Persetujuan",
            cell: (row: SppdDataType) => {
                const [color, label] = getStatus(
                    row.history[row.history.length - 1],
                );
                // const color = "bg-red-500"
                // const label = "Hello"

                return (
                    <div
                        className={`${color} mx-auto rounded-md p-2 text-xs font-semibold`}
                    >
                        {label}
                    </div>
                );
            },
        },
        {
            name: "Aksi",
            cell: (row: Record<string, string>) => (
                <div className="flex items-center justify-center gap-x-2">
                    <button
                        className="text-blue-500 hover:underline"
                        onClick={() => handleSelectedData(row)}
                    >
                        Lihat
                    </button>
                    {row.history[row.history.length - 1].nama ==
                        "disetujui" && (
                        <>
                            <div className="h-[12px] w-[2px] bg-slate-500"></div>
                            <Link
                                className="text-blue-500 hover:underline"
                                href="/sppd/export"
                            >
                                Cetak
                            </Link>
                        </>
                    )}
                </div>
            ),
        },
    ];


    const handleSelectedData = (data) => {
        setShowPopup(true);
        setSelectedData(data);
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="SPPD" />
            <Table
                addButtonName="Tambah SPPD"
                addButtonLink="/sppd"
                name="Daftar Pengajuan SPPD"
                column={columns}
                data={sppdData ? sppdData.data.data : []}
                detailLink={{ name: "Pengaturan", to: "/sppd" }}
                isLoading={isLoading}
            />
            <Detail showPopup={showPopup} setShowPopup={setShowPopup}  selectedData={selectedData}   budgetsData={budgetData} transportationsData={transporationData}  />
        </DefaultLayout>
    );
};

export default SppdPage;
