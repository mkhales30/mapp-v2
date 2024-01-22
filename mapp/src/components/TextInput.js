import React from 'react';

const TextInput = (props) => {
    return (
        <div className='flex flex-col gap-1'>
            <label className='font-light text-gray-600 text-sm'>{props.label}</label>
            <input
                type={props.type}
                className='border-gray-200 border rounded w-full p-2 focus:outline-0'
                value={props.value} // Use the 'value' prop to set the input value
                onChange={props.onChange} // Use the 'onChange' prop to handle input changes
            />
        </div>
    );
};

export default TextInput;
