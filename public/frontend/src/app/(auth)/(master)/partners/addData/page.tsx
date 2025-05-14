"use client";

import InputFields from "@/components/Fields/InputFields";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import {
    useAddPartnerMutation,
} from "@/services/partner/endpoints";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";

const PartnerAddPage = () => {
    const router = useRouter();

    const [errors, setErrors] = useState({});

    const [
        addPartner,
        { isLoading: isAdding, isSuccess: successAdding, isError: errorAdding },
    ] = useAddPartnerMutation();

    const formSchema = z.object({
        nama: z.string().min(1, "Harap masukkan nama mitra"),
        alamat: z.string().min(1, "Harap masukkan alamat mitra"),
        kota: z.string().min(1, "Harap masukkan kota mitra"),
    });

    const handlePostData = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const validationRes = formSchema.safeParse({
            nama: formData.get("nama"),
            alamat: formData.get("alamat"),
            kota: formData.get("kota"),
        });

        if (!validationRes.success) {
            toast.error("Form tidak valid, harap periksa kembali", {
                position: "top-right",
            });

            setErrors(validationRes.error.flatten().fieldErrors);

            return;
        }

        await addPartner(formData);
    };

    useEffect(() => {

        console.log(successAdding)

        if (isAdding) {
            toast.info("Menambahkan data mitra", { position: "top-right" });
        }

        if (errorAdding) {
            toast.error("Gagal menambahkan data mitra", {
                position: "top-right",
            });
        }

        if (successAdding) {
            toast.success("Berhasil menambahkan data mitra", {
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
            <form
                onSubmit={handlePostData}
                className="flex flex-col gap-9 rounded-sm border border-stroke bg-white px-6.5 py-4 shadow-default dark:border-strokedark dark:bg-boxdark lg:grid lg:grid-cols-2"
            >
                <InputFields
                    title="Nama Rekan"
                    name="nama"
                    error={errors.nama ? errors.nama[0] : ""}
                />
                <InputFields
                    title="Alamat Rekan"
                    name="alamat"
                    error={errors.alamat ? errors.alamat[0] : ""}
                />
                <InputFields
                    title="Kota Rekan"
                    name="kota"
                    error={errors.kota ? errors.kota[0] : ""}
                />
                <div
                    onClick={() => router.push("/partners")}
                    className="col-span-2 flex gap-x-4"
                >
                    <button
                        className="col-span-2 flex w-max justify-center rounded bg-red-500 p-3 font-medium text-gray hover:bg-opacity-90"
                        type="submit"
                    >
                        Kembali
                    </button>
                    <button
                        className="col-span-2 flex w-max justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                        type="submit"
                    >
                        {isAdding ? (
                            <div className="flex gap-x-4">
                                <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                Menambahkan
                            </div>
                        ) : (
                            <>Tambah Mitra</>
                        )}
                    </button>
                </div>
            </form>
        </DefaultLayout>
    );
};

export default PartnerAddPage;
