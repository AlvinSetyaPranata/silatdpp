import { FormEvent, PropsWithChildren, useState } from "react";
import { toast } from "react-toastify";

type immutableDataType = {
    name: string;
    value: string;
};

type RTKMutationFn<Arg = any, Result = any> = (
    arg: Arg,
) => Promise<{ data: Result } | { error: any }>;

interface PopupPropsType extends PropsWithChildren {
    title: string;
    idItem: string;
    state: boolean;
    stateSetter: (state: boolean) => void;
    ableUpdate?: boolean;
    ableDelete?: boolean;
    mutation?: RTKMutationFn<unknown, unknown>;
    deleteMutation?: RTKMutationFn<unknown, unknown>;
    isUpdating?: boolean;
    isDeleting?: boolean;
    immutableData?: immutableDataType[];
}

const Modal: React.FC<PopupPropsType> = ({
    title,
    state,
    stateSetter,
    idItem,
    children,
    ableUpdate = false,
    ableDelete = false,
    mutation = null,
    deleteMutation = null,
    isUpdating = false,
    isDeleting = false,
    immutableData = [{ name: "", value: "" }],
}) => {
    const [method, setMethod] = useState<"" | "update" | "delete">("");

    const handleDataSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if (method == "delete") {
            if (!deleteMutation) {
                return;
            }

            await deleteMutation(idItem);
        } else {
            if (!mutation) {
                return;
            }

            const form = new FormData(event.currentTarget);

            immutableData.map((data) => form.append(data.name, data.value));

            await mutation({ idItem, form });
        }

        stateSetter(false);
    };

    return (
        <div
            className={`${state || closed ? "fixed" : "hidden"} bottom-0 left-0 z-9999 flex min-h-screen w-full items-end`}
        >
            <div
                className="absolute bottom-0 left-0 -z-10 min-h-screen w-full bg-black-2 bg-opacity-75"
                onClick={() => stateSetter(false)}
            ></div>

            <div className="min-h-screen w-full overflow-y-auto bg-white p-4">
                <div className="flex w-full justify-between">
                    <h2 className="font-semibold text-black-2">{title}</h2>
                    <button onClick={() => stateSetter(false)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            className="size-6 stroke-black-2 stroke-2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18 18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <form
                    onSubmit={handleDataSubmit}
                    className="mt-8 flex flex-col gap-x-4 gap-y-8 md:grid md:grid-cols-2"
                >
                    {children}
                    <div className="col-span-2 flex gap-x-4">
                        {ableUpdate && (
                            <button
                                className="flex w-max justify-center rounded bg-primary p-3 text-sm font-medium text-gray hover:bg-opacity-90"
                                type="submit"
                                onClick={() => setMethod("update")}
                            >
                                {isUpdating && method == "update" ? (
                                    <>
                                        <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                        Memperbarui Data
                                    </>
                                ) : (
                                    <>Perbarui </>
                                )}
                            </button>
                        )}
                        {ableDelete && (
                            <button
                                className="flex w-max justify-center rounded bg-red-500 p-3 text-sm font-medium text-gray hover:bg-opacity-90"
                                type="submit"
                                onClick={() => setMethod("delete")}
                            >
                                {isDeleting && method == "delete" ? (
                                    <>
                                        <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                        Menghapus Data
                                    </>
                                ) : (
                                    <>Hapus </>
                                )}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;
