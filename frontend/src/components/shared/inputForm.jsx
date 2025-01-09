import React, { useState, useCallback } from 'react';

const InputFormField = ({ type, name,id, label, value, onChange, margin, errorMessage }) => {

  return (
    <div className={`relative z-0 w-full mb-${margin} group`}>
    <input
      type={type}
      name={name}
      id={id}
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-[2.5px] border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-emerald-600 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
      placeholder=" "
      value={value}
      onChange={onChange}
      required
    />
    <label
                htmlFor={id}
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-emerald-600 peer-focus:dark:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
      {label}
    </label>
    {errorMessage && (
                    <div className="text-red-600 text-sm mt-2">
                      {errorMessage}
                    </div>
                  )}
  </div>

  );
};

export default InputFormField;
