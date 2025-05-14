import { InstitutionsDataTypes } from "@/types/pages/institution";

export function extractInstitutionsData(data: InstitutionsDataTypes[]) {

    if (!data) {
        return [{name: "", value: ""}]
    }

    return data.map(institution => ({
        name: institution.nama,
        value: institution.id,
    }))
}


export function extractPartnersData(data: any) {

    if (!data) {
        return [{name: "", value: ""}]
    }

    return data.map((partner: any) => ({
        name: partner.nama,
        value: partner.id,
    }))
}