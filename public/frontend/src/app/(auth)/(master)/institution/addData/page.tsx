"use client";

import Breadcrumb from "@/components/Breadcrumb";
import InputFields from "@/components/Fields/InputFields";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useAddInstitutionMutation } from "@/services/Institution/institution";
import { storeType } from "@/store";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useStore } from "react-redux";
import { toast } from "react-toastify";
import { z } from "zod";

export default function InstitutionAddData() {
    const [errors, setErrors] = useState({});
    const router = useRouter();
    const state = useStore().getState() as storeType;
    const authState = state.auth;

    const [addInstitution, { isLoading: isAdding, isSuccess: successAdding, isError: errorAdding }] = useAddInstitutionMutation();

    const schema = z.object({
        nama: z.string().min(1, "Nama tidak boleh kosong!"),
        alamat: z.string().min(1, "Alamat tidak boleh kosong!"),
        kontak: z.string({ invalid_type_error: "Kontak tidak valid" }).min(1, "Kontak tidak boleh kosong!"),
    });

    const handlePostData = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = event.currentTarget;

        const data = new FormData(formData);

        const res = schema
            .safeParse({ nama: data.get("nama"), alamat: data.get("alamat"), kontak: data.get("kontak")})
            
        if (!res.success) {
            toast.error("Data tidak valid", { position: "top-right"})
            setErrors(res.error?.flatten().fieldErrors)
            return
        }

        await addInstitution(data)
    
    };


     useEffect(() => {
            if (isAdding) {
                toast.info("Menambahkan data divisi", { position: "top-right" });
                return;
            }
    
            if (errorAdding) {
                toast.error("Gagal menambahkan data divisi", {
                    position: "top-right",
                });
            }
    
            if (successAdding) {
                toast.success("Berhasil menambahkan data divisi", {
                    position: "top-right",
                });
    
                const timeout = setTimeout(() => {
                    window.location.reload();
                }, 1000);
    
                return () => clearTimeout(timeout);
            }
        }, [isAdding]);

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Tambah Institusi" />

            <form
                onSubmit={handlePostData}
                className="flex flex-col lg:grid lg:grid-cols-2 gap-9 rounded-sm border border-stroke bg-white px-6.5 py-4 shadow-default dark:border-strokedark dark:bg-boxdark"
            >
                <InputFields title="Nama Institusi" name="nama" error={errors.nama ? errors.nama[0] : ""}/>
                <InputFields title="Alamat Institusi" name="alamat" error={errors.alamat ? errors.alamat[0] : ""}/>
                <InputFields title="kontak Institusi" name="kontak" error={errors.kontak ? errors.kontak[0] : ""}/>
                <div className="flex col-span-2 gap-x-4">

                
                <button
                    className="flex w-max col-span-2 columns-2 items-center justify-center gap-x-2 rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 disabled:cursor-not-allowed disabled:bg-opacity-75"
                    type="submit"
                    disabled={isAdding}
                >
                    {isAdding ? (
                        <>
                            <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                            Menambahkan Data
                        </>
                    ) : (
                        <>Tambahkan Institusi</>
                    )}
                </button>
                <button onClick={() => router.push("/institution")}  className="flex w-max col-span-2 columns-2 items-center justify-center gap-x-2 rounded bg-red-500 p-3 font-medium text-gray hover:bg-opacity-90 disabled:cursor-not-allowed disabled:bg-opacity-75"
                    type="button"
                    >Kembali</button>
                </div>
            </form>
        </DefaultLayout>
    );
}
