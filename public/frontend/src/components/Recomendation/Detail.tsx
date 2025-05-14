import React from 'react'
import CustomModal from '../CustomModal'
import { InstitutionsDataTypes } from '@/types/pages/institution';
import InputFields from '../Fields/InputFields';
import SelectFields from '../Fields/SelectFields';
import TextFields from '../Fields/TextFields';
import { extractInstitutionsData, extractPartnersData } from '@/utils/recomendation/data';


interface PropsType {
    showPopup: boolean;
    setShowPopup: (show: boolean) => void;
    selectedData: any;
    institutionData: any;
    partnerData: any;
}


export default function Detail({showPopup, setShowPopup, selectedData, institutionData, partnerData} : PropsType) {


    const ApproveHandler = async () => {

    }

  return (
    <CustomModal
                title="Detail Hak Akses"
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
                <InputFields title="Nama Pejabat" name="nama_pejabat" defaultValue={selectedData.nama_pejabat}/>
                <InputFields title="NIP Pejabat" name="nip_pejabat" defaultValue={selectedData.nip_pejabat}/>
                <InputFields title="Nama Pejabat Pengganti" name="nama_pejabat_pengganti" defaultValue={selectedData.nama_pejabat_pengganti}/>
                <InputFields title="NIP Pejabat Pengganti" name="nip_pejabat_pengganti" defaultValue={selectedData.nip_pejabat_pengganti}/>
                <InputFields title="Alamat Pejabat Pengganti" name="alamat_pejabat_pengganti" defaultValue={selectedData.alamat_pejabat_pengganti}/>
                <InputFields title="Jabatan" name="jabatan" defaultValue={selectedData.jabatan}/>
                {/* <SelectFields title="institusi" name="institusi_id" options={extractInstitutionsData(institutionData.data)} defaultValue={selectedData.institusi_id}/> */}
                {/* <SelectFields title="Institusi Rekan" name="mitra_id" options={extractPartnersData(partnerData.data)} defaultValue={selectedData.mitra_id}/> */}
                <TextFields title="Konten" name="konten" defaultValue={selectedData.konten}/>
            </CustomModal>
  )
}
