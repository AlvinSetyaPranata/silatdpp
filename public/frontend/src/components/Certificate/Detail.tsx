import React from "react";
import CustomModal from "../CustomModal";
import InputFields from "../Fields/InputFields";
import SelectFields from "../Fields/SelectFields";
import { extractInstitutionsData } from "@/utils/certificate/data";
import ProgressLine from "../progressiveBar";


interface PropsType {
    showPopup: boolean;
    setShowPopup: (show: boolean) => void;
    selectedData: any;
}

export default function Detail({ showPopup, setShowPopup, selectedData }: PropsType) {

    const ApproveHandler = async () => {
        // Handle the approve action here
        console.log("Approve clicked");
    };

    return (
        <CustomModal
            title="Detail Pengajuan"
                state={showPopup}
                stateSetter={setShowPopup}
                idItem={selectedData.id}
                buttons={[
                    <button
                        className="flex w-max justify-center rounded bg-blue-500 p-3 text-sm font-medium text-gray hover:bg-opacity-90"
                        onClick={ApproveHandler}
                    >
                        Proses Pengajuan
                    </button>,
                ]}
        >
            <InputFields
                title="Nama Siswa"
                name="nama_siswa"
                defaultValue={selectedData.nama_siswa}
            />
            <InputFields
                title="NIS"
                type="number"
                name="nis"
                defaultValue={selectedData.nis}
            />
            <SelectFields
                title="Institusi"
                name="institusi_id"
                options={extractInstitutionsData(selectedData.institusi)}
                defaultValue={selectedData.institusi_id}
            />
            <InputFields
                title="Perubahan"
                name="perubahan"
                defaultValue={selectedData.perubahan}
            />
            <InputFields
                title="Nomor Ijazah"
                name="nomor_ijazah"
                type="number"
                defaultValue={selectedData.nomor_ijazah}
            />
            <InputFields
                title="Alasan"
                name="alasan"
                defaultValue={selectedData.alasan}
            />
            <InputFields
                title="status"
                defaultValue={selectedData.status}
                disabled={true}
            />
        </CustomModal>
    );
}
