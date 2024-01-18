import React from 'react';

const TextInput = (props) => {
    return (
        <div className='flex flex-col gap-1'>
            <label className='font-light text-gray-600 text-sm'>{props.label}</label>
            <input
                type={props.type}
                className='border-gray-200 border rounded w-full p-2 focus:outline-0'
            />
        </div>
    );
};

export default TextInput;
