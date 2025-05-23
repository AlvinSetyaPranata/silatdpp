"use client";

import React, { useEffect, useState } from "react";

type optionType = {
    name: string;
    value: string;
};

interface selectFieldsProps {
    title: string;
    options: optionType[];
    name: string;
    defaultValue?: string;
    error?: string;
}

const SelectFields: React.FC<selectFieldsProps> = ({
    title,
    options,
    name,
    defaultValue,
    error = "",
}) => {
    const [errorMessege, setErrorMessege] = useState({});

    const handleError = (state) => {
        if (state) {
            setErrorMessege(error);
        } else {
            setErrorMessege(false);
        }
    };

    useEffect(() => handleError(true), [error]);

    return (
        <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                {title}
            </label>

            <div className="relative bg-white dark:bg-form-input">
                <select
                    defaultValue={defaultValue}
                    name={name}
                    onFocus={() => handleError(false)}
                    className={`relative w-full appearance-none rounded border bg-transparent px-4 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${errorMessege ? "border-red-500" : "border-stroke"}`}
                >
                    <option
                        value=""
                        disabled
                        className="text-body dark:text-bodydark"
                    >
                        {title}
                    </option>
                    {options?.map((item, index) => (
                        <option
                            key={index}
                            value={item.value}
                            className="text-body dark:text-bodydark"
                            selected={item.value == defaultValue ? true : false}
                        >
                            {item.name}
                        </option>
                    ))}
                </select>
               
                <span className="absolute right-4 top-1/2 -translate-y-1/2">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g opacity="0.8">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                fill="#637381"
                            ></path>
                        </g>
                    </svg>
                </span>
            </div>

            {errorMessege && (
                    <span className="mt-2 block text-sm text-red-500">
                        {error}
                    </span>
                )}
        </div>
    );
};

export default SelectFields;
