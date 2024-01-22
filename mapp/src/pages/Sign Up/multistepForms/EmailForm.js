import React, { useState } from "react";
import FormWrapper from "../../../components/FormWrapper";

function EmailForm({ email, firstName, lastName, updateFields }) {
  return (
    <FormWrapper title="Create An Account">
      {/* Input field for First Name */}
      <label className='font-light text-gray-600 text-sm'>First Name</label>
      <input
        required
        type="text"
        value={firstName}
        onChange={(e) => updateFields({ firstName: e.target.value })}
        className='border-gray-200 border rounded w-full p-2 focus:outline-0'
      />
      {/* Input field for Last Name */}
      <label className='font-light text-gray-600 text-sm'>Last Name</label>
      <input
        required
        type="text"
        value={lastName}
        onChange={(e) => updateFields({ lastName: e.target.value })}
        className='border-gray-200 border rounded w-full p-2 focus:outline-0'
      />
      <label className='font-light text-gray-600 text-sm'>Email</label>
      <input
        required
        type="email"
        value={email}
        onChange={(e) => updateFields({ email: e.target.value })}
        className='border-gray-200 border rounded w-full p-2  focus:outline-0 '/>
    </FormWrapper>
  );
}

export default EmailForm;
