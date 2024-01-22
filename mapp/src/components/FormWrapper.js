import React from "react";

function FormWrapper({ title, children }) {
  return (
    <div className="flex flex-col gap-1">
      <h2 className='text-3xl text-center font-medium'>
        {title}
      </h2>
      <div>
        {children}
      </div>
    </div>
  );
}

export default FormWrapper;
