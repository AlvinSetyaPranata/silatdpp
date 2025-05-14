"use client"

import Breadcrumb from "@/components/Breadcrumb"
import InputFields from "@/components/Fields/InputFields"
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import useFetch from "@/hooks/useFetch"
import { useAddTransportationMutation, useUpdateTransportationMutation } from "@/services/transportatition/endpoints"
import { storeType } from "@/store"
import { useRouter } from "next/navigation"
import React, { FormEvent, useEffect, useState } from "react"
import { useStore } from "react-redux"
import { toast } from "react-toastify"
import { z } from "zod"

const TransportAddPage: React.FC = () => {
    const [errors, setErrors] = useState({})
    const router = useRouter()


    const [addTransport, { isLoading: isAdding, isSuccess: successAdding, isError: errorAdding }] = useAddTransportationMutation()


    const formSchema = z.object({
        nama: z.string().min(1, "Harap mengisi nama"),        
        jenis: z.string().min(1, "Harap mengisi jenis"),        
    })

    const handlePostData = async (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault()

        const form = new FormData(event.currentTarget)

        const validationRes = formSchema.safeParse({
            nama: form.get("nama"),
            jenis: form.get("jenis")
        })


        if (!validationRes.success) {

            setErrors(validationRes.error.flatten().fieldErrors)

            return
        }

        await addTransport(form)
    }


    useEffect(() => {
            if (isAdding) {
                toast.info("Menambahkan data transportasi", { position: "top-right" });
                return;
            }
    
            if (errorAdding) {
                toast.error("Gagal menambahkan data transportasi", {
                    position: "top-right",
                });
            }
    
            if (successAdding) {
                toast.success("Berhasil menambahkan data transportasi", {
                    position: "top-right",
                });
    
                const timeout = setTimeout(() => {
                    router.push("/transport")
                }, 1000);
    
                return () => clearTimeout(timeout);
            }
        }, [isAdding]);

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Tambah Transportasi" />
            <form onSubmit={handlePostData} className="grid grid-cols-2 gap-9 rounded-sm border border-stroke bg-white px-6.5 py-4 shadow-default dark:border-strokedark dark:bg-boxdark">
                <InputFields name="nama" title="Nama Transportasi" error={errors.nama ? errors.nama[0] : ""} />
                <InputFields name="jenis" title="Jenis Transportasi" error={errors.jenis ? errors.jenis[0] : ""} />
                <div className="flex col-span-2 gap-x-4">
                     <button onClick={() => router.push("/transport")} className="flex justify-center rounded bg-red-500 p-3 font-medium text-gray hover:bg-opacity-90 w-max">Kembali</button>
                    <button
                        type="submit"
                        className="flex justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 w-max"
                    >
                        {isAdding ? (
                            <div className="flex gap-x-4">
                                <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                Menambahkan
                            </div>
                        ) : (
                            <> Tambah Transportasi</>
                        )}
                    </button>
                   
                </div>
            </form>
        </DefaultLayout>
    )
}


export default TransportAddPage