"use client";

import Breadcrumb from "@/components/Breadcrumb";
import InputFields from "@/components/Fields/InputFields";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useAddDivisionMutation } from "@/services/division/endpoints";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";

const Page: React.FC = () => {
    const [errors, setErrors] = useState({});

    const router = useRouter();

    const [
        addDivision,
        { isLoading: isAdding, isSuccess: successAdding, isError: errorAdding },
    ] = useAddDivisionMutation();

    const schema = z.object({
        nama: z.string().min(1, "Nama divisi tidak boleh kosong!"),
    });

    const handlePostData = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = event.currentTarget;
        const data = new FormData(formData);

        const res = schema.safeParse({ nama: data.get("nama") });

        if (!res.success) {
            setErrors(res.error.flatten().fieldErrors);
            return;
        }

        await addDivision(data);
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
            <Breadcrumb pageName="Tambah Divisi" />
            <form
                onSubmit={handlePostData}
                className="grid grid-cols-2 gap-9 rounded-sm border border-stroke bg-white px-6.5 py-4 shadow-default dark:border-strokedark dark:bg-boxdark"
            >
                <InputFields
                    title="Nama Divisi"
                    name="nama"
                    error={errors.nama ? errors.nama[0] : ""}
                />
                <div className="col-span-2 flex gap-x-4">
                    <button
                        className="flex w-max justify-center rounded bg-primary p-3 text-sm font-medium text-gray hover:bg-opacity-90"
                        type="submit"
                    >
                        {isAdding ? (
                            <>
                                <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                Menambahkan Divisi..
                            </>
                        ) : (
                            <>Tambahkan Divisi</>
                        )}
                    </button>
                    <button
                        className="flex w-max justify-center rounded bg-red-500 p-3 text-sm font-medium text-gray hover:bg-opacity-90"
                        type="button"
                        onClick={() => router.push("/division")}
                    >
                        Kembali
                    </button>
                </div>
            </form>
        </DefaultLayout>
    );
};

export default Page;
