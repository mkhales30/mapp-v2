import React from 'react';

function SecondaryButton({text,type}) {
    return (
        <button className='bg-stone-800 text-white text-center px-4 py-2 w-full rounded text-lg' type={type}>
            {text}
        </button>
    );
}

export default SecondaryButton;