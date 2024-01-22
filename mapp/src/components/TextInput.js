import React from 'react';

const TextInput = ({type,onChange,label,value}) => {
    return (
        <div className='flex flex-col gap-1'>
            <label className='font-light text-gray-600 text-sm'>{label}</label>
            <input
                type={type}
                className='border-gray-200 border rounded w-full p-2 focus:outline-0'
                value={value} // Use the 'value' prop to set the input value
                onChange={onChange} // Use the 'onChange' prop to handle input changes
            />
        </div>
    );
};

export default TextInput;
