import { useContext, useEffect, useRef, useState } from 'react';
import { myContext } from '../../../App';
import './AddCode.scss';

export const AddCode = ({
  code,
  newCode,
  newCodes,
  setNewCodes,
  terminologyId,
  i,
}) => {
  const { terminology, setTerminology, vocabUrl, initialTerminology } =
    useContext(myContext);
  const [thisCode, setThisCode] = useState(code);

  useEffect(() => {
    let codeIndex;
    newCodes.forEach((newCode, index) => {
      if (thisCode?.id === newCode?.id) {
        codeIndex = index;
      }
    });
    let newCode = thisCode;
    newCodes[codeIndex] = newCode;
    setNewCodes(newCodes);
  }, [thisCode]);

  const removeInputField = i => {
    let newInput = [...newCodes];
    newInput.splice(i, 1);
    setNewCodes(newInput);
  };

  const handleAddCode = (e, i) => {
    // const filterEmpty = newCodes.filter(
    //   r => r.code !== '' || r.description !== '',
    // );

    const filterByRowId = newCodes.filter(r => r.id === thisCode.id);
    // console.log(filterByRowId);
    const newCodesDTO = filterByRowId.map(code => {
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
        removeInputField(i);
        setThisCode(code);
      });
  };

  return (
    <>
      <td className="add_code">
        <input
          autoFocus
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

      <button
        onClick={e =>
          thisCode.code !== '' && thisCode.description !== ''
            ? handleAddCode(i)
            : window.alert('Code and description cannot be blank.')
        }
      >
        Save
      </button>
      <button onClick={() => removeInputField(i)}>Remove</button>
    </>
  );
};
