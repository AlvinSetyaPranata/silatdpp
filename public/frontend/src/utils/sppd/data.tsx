import { ROLE_TYPE } from "@/types/common/user";
import { BudgetDataType } from "@/types/pages/budget";
import { SppdDataType } from "@/types/pages/sppd";
import { TransportDataType } from "@/types/pages/transports";

interface approvalType {
    id: string;
    nama: string;
    created_at: string;
    updated_at: string;
    pivot: { sppd_pengajuan_id: string; history_id: string };
}

export const getStatus = (
    approval: approvalType,
): [string, string] => {
    switch (approval.nama) {
        case "pengajuan":
            return ["bg-blue-500 text-white", "Pengajuan"];

        case "penanganan":
            return ["bg-yellow-500 text-white", "Penanganan"];

        case "disetujui":
            return ["bg-green-500 text-white", "Disetujui"];

        default:
            return ["", ""];
    }
};


export const extractBudgetsData = (data: BudgetDataType[]) => {
    if (!data) {
        return [{ name: "", value: "" }];
    }
    

    return data.data.map((budget) => ({
        name: budget.name,
        value: budget.id,
    }));
}


export const getTransport = (
    transporationData: { data: TransportDataType[] },
    selectedSppd: SppdDataType,
) => {

    if (!transporationData.data) {
        return "";
    }   
    

    if (transporationData.data) {
        const res = transporationData.data.data.filter(
            (transport) => transport.id == selectedSppd.alat_transportasi_id,
        );

        if (res.length < 1) {
            return "";
        }

        return res[0].nama;
    }
};

export const getBudget = (
    budgetData: { data: BudgetDataType[] },
    selectedSppd: SppdDataType,
) => {

    if (!budgetData) {
        return "";
    }   


    if (budgetData.data) {
        const res = budgetData.data.filter(
            (budget) => budget.id == selectedSppd.biaya_id,
        );
        console.log(selectedSppd)

        if (res.length < 1) {
            return "";
        }


        return res[0].id;
    }
};

type propertyType = {
    text: string;
    color: string;
    loadingText: string;
};

export const getPopupButtons = (
    roles: ROLE_TYPE[]
): propertyType[] => {
    const buttonProperties: propertyType[] = [];


    roles.map((role) => {
        if (role.name == "kadis" || role.name == "kabid") {
            buttonProperties.push({
                text: "Setujui SPPD",
                color: "bg-green-500",
                loadingText: "Menyetujui",
            });
        } else if (role.name == "administrasi") {
            buttonProperties.push({
                text: "Serahkan SPPD",
                color: "bg-green-500",
                loadingText: "Menyerahkan",
            });
        } else {
            buttonProperties.push({
                text: "Perbarui Pengajuan",
                color: "bg-blue-500",
                loadingText: "Memperbarui pengajuan",
            });
        }

    });

    return buttonProperties;
};


export const getEditableState = (role: ROLE_TYPE) => {

    const NON_EDITABLE_ROLES = ["kadis", "kabid", "administrasi"];

    if (NON_EDITABLE_ROLES.includes(role.name)) {
        return true
    } 

    return false
}