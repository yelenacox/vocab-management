import { useContext, useEffect, useRef, useState } from 'react';
import { myContext } from '../../../App';
import './AddCode.scss';
import SaveIcon from '../../../../assets/cloud_save.png';
import CancelIcon from '../../../../assets/cancel_icon.png';

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
      return { code: code.code, display: code.display };
    });
    const newTerminology = {
      ...terminology,
      codes: [...terminology.codes, ...newCodesDTO],
    };

    fetch(`${vocabUrl}/Terminology/${terminologyId}`, {
      // fetch(`${vocabUrl}/terminologies/${terminologyId}`, {
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
      <td className="icon_cell">
        <img
          className="small_icon"
          onClick={e =>
            thisCode.code !== '' && thisCode.display !== ''
              ? handleAddCode(i)
              : window.alert('Please fill in the code and description.')
          }
          src={SaveIcon}
        />
        <img
          className="small_icon"
          onClick={() => removeInputField(i)}
          src={CancelIcon}
        />
      </td>
      <td className="add_code row_input_cell">
        <input
          autoFocus
          id="code"
          className="code_input input_field"
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
      <td className="row_input_cell">
        <input
          id="code_description"
          className="code_description_input input_field"
          type="text"
          value={thisCode.display}
          onChange={evt => {
            setThisCode({
              ...thisCode,
              display: evt.target.value,
            });
          }}
        />
      </td>
    </>
  );
};
