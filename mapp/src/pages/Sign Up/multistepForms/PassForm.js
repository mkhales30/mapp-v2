import React from "react";
import FormWrapper from "../../../components/FormWrapper";

function passForm({ password, updateFields, isRecaptchaVerified, handleRecaptchaVerify }) {
  return (
    <FormWrapper title="Create An Account">
            <label className='font-light text-gray-600 text-sm'>Password</label>
            <input
                required
                type="password"
                value={password}
                onChange={(e) => updateFields({ password: e.target.value })}
                className='border-gray-200 border rounded w-full p-2  focus:outline-0 '/>

    </FormWrapper>
  );
}

export default passForm;