import { useState } from 'react';

export const EditCode = ({ codeObject }) => {
  const [updatedCode, setUpdatedCode] = useState(codeObject);

  return (
    <>
      <td>
        <input
          id="code"
          className="code_input"
          type="text"
          value={updatedCode.code}
          onChange={evt => {
            const copy = { ...updatedCode };
            copy.code = evt.target.value;
            setUpdatedCode(copy);
          }}
        />
      </td>
      <td>
        <input
          id="code_description"
          className="code_description_input"
          type="text"
          value={updatedCode.description}
          onChange={evt => {
            const copy = { ...updatedCode };
            copy.description = evt.target.value;
            setUpdatedCode(copy);
          }}
        />
      </td>
    </>
  );
};
