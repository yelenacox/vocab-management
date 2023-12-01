import { useContext, useEffect, useState } from 'react';
import { myContext } from '../../../App';
import './AddCode.scss';

export const AddCode = ({ code, newCodes, setNewCodes }) => {
  const [thisCode, setThisCode] = useState(code);
  useEffect(() => {
    let codeIndex;
    newCodes.forEach((newCode, index) => {
      if (thisCode?.id === newCode?.id) {
        codeIndex = index;
      }
    });
    // console.log('EXISTING CODE INDEX:', codeIndex);
    let newCode = thisCode;
    newCodes[codeIndex] = newCode;
    setNewCodes(newCodes);
  }, [thisCode]);
  // console.log('THISCODE ', thisCode);

  return (
    <>
      <div className="add_code_container">
        <div className="add_code">
          <input
            required
            id="code"
            className="code_input"
            type="text"
            value={thisCode.code}
            onChange={evt => {
              setThisCode({
                ...thisCode,
                code: evt.target.value,
              });
            }}
          />
        </div>
        <div className="add_code_description">
          <input
            required
            id="code_description"
            className="code_description_input"
            type="text"
            value={thisCode.description}
            onChange={evt => {
              setThisCode({
                ...thisCode,
                description: evt.target.value,
              });
            }}
          />
        </div>
      </div>
    </>
  );
};
