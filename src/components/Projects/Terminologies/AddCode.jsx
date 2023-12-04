import { useContext, useEffect, useState } from 'react';
import { myContext } from '../../../App';
import './AddCode.scss';

export const AddCode = ({ code, newCodes, setNewCodes, terminologyId }) => {
  const { terminology, setTerminology, vocabUrl } = useContext(myContext);
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

  const handleAddCode = () => {
    const filterEmpty = newCodes.filter(
      r => r.code !== '' || r.description !== '',
    );
    const newCodesDTO = filterEmpty.map(code => {
      return { code: code.code, description: code.description };
    });
    const newTerminology = {
      ...terminology,
      codes: [...terminology.codes, ...newCodesDTO],
    };
    fetch(`${vocabUrl}/terminologies/${terminologyId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTerminology),
    })
      .then(response => response.json())
      .then(updatedTerminology => {
        setTerminology(updatedTerminology);
        setNewCodes([]);
      });
  };

  return (
    <>
      <td className="add_code">
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
      </td>
      <td className="add_code_description">
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
      </td>
      <button onClick={handleAddCode}>Save</button>
    </>
  );
};
