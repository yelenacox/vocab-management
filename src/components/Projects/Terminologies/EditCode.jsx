import { useContext, useEffect, useState } from 'react';
import { myContext } from '../../../App';
import SaveIcon from '../../../../assets/cloud_save.png';
import CancelIcon from '../../../../assets/cancel_icon.png';
import './Terminology.scss';
import { handleUpdate } from '../../Manager/FetchManager';

export const EditCode = ({ codeObject, onCancel, index, setActive }) => {
  const [thisCode, setThisCode] = useState(codeObject);
  const { terminology, vocabUrl, setTerminology } = useContext(myContext);

  const updateCode = (code, index) => {
    terminology.codes[index] = code;
    handleUpdate(vocabUrl, 'Terminology', terminology)
      .then(res => res.json())
      .then(data => setTerminology(data));
    setActive(-1);
  };

  return (
    <>
      <td className="icon_cell">
        <img
          className="small_icon"
          onClick={() => updateCode(thisCode, index)}
          src={SaveIcon}
        />
        <img className="small_icon" onClick={onCancel} src={CancelIcon} />
      </td>
      <td className="row_input_cell">
        <input
          autoFocus
          id="code"
          className="code_input input_field"
          type="text"
          value={thisCode.code}
          onChange={evt => {
            setThisCode({
              code: evt.target.value,
              display: thisCode.display,
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
              code: thisCode.code,
              display: evt.target.value,
            });
          }}
        />
      </td>{' '}
    </>
  );
};
