import { useContext, useEffect, useState } from 'react';
import { EditCodeButtons } from './EditCodeButtons';
import { myContext } from '../../../App';

export const EditCode = ({ codeObject, onCancel, index, setActive }) => {
  const [thisCode, setThisCode] = useState(codeObject);
  const { terminology, updateTerminology } = useContext(myContext);

  const updateCode = (code, index) => {
    terminology.codes[index] = code;
    updateTerminology();
    setActive(-1);
  };

  return (
    <>
      <td>
        <input
          id="code"
          className="code_input"
          type="text"
          value={thisCode.code}
          onChange={evt => {
            setThisCode({
              code: evt.target.value,
              description: thisCode.description,
            });
          }}
        />
      </td>
      <td>
        <input
          id="code_description"
          className="code_description_input"
          type="text"
          value={thisCode.description}
          onChange={evt => {
            setThisCode({
              code: thisCode.code,
              description: evt.target.value,
            });
          }}
        />
      </td>{' '}
      <>
        <button onClick={() => updateCode(thisCode, index)}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </>
      {/* <EditCodeButtons setUpdatedCode={setUpdatedCode} /> */}
    </>
  );
};
