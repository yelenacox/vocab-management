import { useContext, useEffect, useState } from 'react';
import { myContext } from '../../../App';
import SaveIcon from '../../../../assets/cloud_save.png';
import CancelIcon from '../../../../assets/cancel_icon.png';

export const EditVariable = ({ varObject, onCancel, index, setActive }) => {
  const [thisVar, setThisVar] = useState(varObject);
  const { table, updateTable } = useContext(myContext);

  const updateVariable = (variable, index) => {
    table.variables[index] = variable;
    updateTable();
    setActive(-1);
  };

  return (
    <>
      <td className="icon_cell">
        <img
          className="small_icon"
          onClick={() => updateVariable(thisVar, index)}
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
          value={thisVar.name}
          onChange={evt => {
            setThisVar({
              name: evt.target.value,
              description: thisVar.description,
              data_type: thisVar.data_type,
            });
          }}
        />
      </td>
      <td className="row_input_cell">
        <input
          id="code_description"
          className="code_description_input input_field"
          type="text"
          value={thisVar.description}
          onChange={evt => {
            setThisVar({
              name: thisVar.name,
              description: evt.target.value,
              data_type: thisVar.data_type,
            });
          }}
        />
      </td>{' '}
    </>
  );
};
