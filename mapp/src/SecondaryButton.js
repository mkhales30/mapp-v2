import React from 'react';

function SecondaryButton(props) {
    return (
        <button className='bg-stone-800 text-white text-center px-4 py-2 w-full rounded text-lg' type={props.type}>
            {props.text}
        </button>
    );
}

export default SecondaryButton;