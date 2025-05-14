import { InstitutionsDataTypes } from "@/types/pages/institution"

export function extractInstitutionsData(data: InstitutionsDataTypes) {

    if (!data) {
        return [{name: "", value: ""}]
    }

    console.log(data)

    return [{
        name: data.nama,
        value: data.id
    }]

}