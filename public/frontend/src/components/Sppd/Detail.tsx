import { useSppdApprovalMutation } from "@/services/sppd/endpoints";
import { SppdDataType } from "@/types/pages/sppd";
import React from "react";
import CustomModal from "../CustomModal";
import InputFields from "../Fields/InputFields";
import FilesFields from "../Fields/FileFields";
import ProgressLine from "../progressiveBar";
import { useStore } from "react-redux";
import { toast } from "react-toastify";
import { extractBudgetsData, getBudget, getEditableState, getPopupButtons, getTransport } from "@/utils/sppd/data";
import { storeType } from "@/store";
import { TransportDataType } from "@/types/pages/transports";
import SelectFields from "../Fields/SelectFields";

interface PropsType {
    showPopup: boolean;
    setShowPopup: (show: boolean) => void;
    selectedData: SppdDataType;
    transportationsData: TransportDataType[];
    budgetsData: any;
}

export default function Detail({
    showPopup,
    setShowPopup,
    selectedData,
    transportationsData,
    budgetsData
}: PropsType) {
    const state = useStore().getState() as storeType;
    const authState = state.auth;

    const ALLOWED_ROLES = ["administrasi", "kabid", "kadis"];


    const [approvalMutation, { isLoading: isApproving }] =
        useSppdApprovalMutation();

    const [updateSppdMutation] = useSppdApprovalMutation();

    const approveHandler = async () => {



        if (!ALLOWED_ROLES.includes(authState.user.roles[0])) {

            await updateSppdMutation({
                id: selectedData.id,
            })

            setShowPopup(false);
            toast.success("Pengajuan SPPD telah diperbarui", {
                position: "top-right",
            });


            return
        }


        await approvalMutation(selectedData);

        setShowPopup(false);

        if (
            authState.user.roles[0] == "kabid" ||
            authState.user.roles[0] == "kadis"
        ) {
            toast.success("Pengajuan SPPD sudah disetujui", {
                position: "top-right",
            });
        } else if (authState.user.roles[0] == "administrasi") {
            toast.success("Pengajuan SPPD berhasil", {
                position: "top-right",
            });
        }
    };

    return (
        <CustomModal
            title="Detail SPPD"
            state={showPopup}
            stateSetter={setShowPopup}
            idItem={selectedData.id}
            isLoading={isApproving}
            buttons={getPopupButtons(authState.user.roles).map(property => (
                <button
                    className={`rounded-md px-4 py-2 text-white ${property.color}`}
                    onClick={approveHandler}
                >
                    {isApproving ? property.loadingText : property.text}
                </button>
            ))}
        >
            <InputFields
                title="Tempat Tujuan"
                name="tempat_tujuan"
                defaultValue={selectedData.tempat_tujuan}
                disabled={getEditableState(authState.user.roles[0])}
            />
            <InputFields
                title="Tempat Berangkat"
                name="tempat_berangkat"
                defaultValue={selectedData.tempat_berangkat}
                disabled={getEditableState(authState.user.roles[0])}
            />
            <InputFields
                title="Maksud Kegiatan"
                name="maksud_kegiatan"
                defaultValue={selectedData.maksud_kegiatan}
                disabled={getEditableState(authState.user.roles[0])}
            />
            <InputFields
                title="Transportasi Perjalanan"
                name="alat_transportasi_id"
                disabled={getEditableState(authState.user.roles[0])}
                defaultValue={getTransport({data: transportationsData}, selectedData)}
            />
            <div className="flex gap-x-4">
                <InputFields
                    title="Tanggal Berangkat"
                    name="tanggal_berangkat"
                    disabled={getEditableState(authState.user.roles[0])}
                    defaultValue={selectedData.tanggal_berangkat}
                />
                <InputFields
                    title="Tanggal Sampai"
                    name="tanggal_kembali"
                    disabled={getEditableState(authState.user.roles[0])}
                    defaultValue={selectedData.tanggal_kembali}
                />
            </div>
            <InputFields
                title="Tanggal Kegiatan"
                name="tanggal_kegiatan"
                disabled={getEditableState(authState.user.roles[0])}
                defaultValue={selectedData.tanggal_kegiatan}
            />

            <SelectFields
                title="Biaya Perjalanan"
                name="biaya_id"
                options={extractBudgetsData(budgetsData)}
                defaultValue={getBudget(budgetsData, selectedData)}
            />
            <InputFields
                title="Status Diterima"
                disabled={getEditableState(authState.user.roles[0])}
                defaultValue={
                    selectedData.approval ? "Disetujui" : "Belum Disetujui"
                }
            />

            <FilesFields
                title="Bukti Kegiatan"
                setter={(file) => null}
                defaultValue={selectedData.dokumens}
            />

            <div className="col-span-2">
                <h3 className="text-black">Diinput Oleh:</h3>
                <p className="text-black-2">{selectedData.user.name}</p>
            </div>

            <div className="col-span-2 text-black-2">
                <ProgressLine
                    data={selectedData.history.map((history) => ({
                        name: history.nama,
                        desc: history.created_at,
                    }))}
                    filledAt={selectedData.history.length}
                />
            </div>
        </CustomModal>
    );
}
