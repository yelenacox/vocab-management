import { useContext, useEffect, useState } from 'react';
import { myContext } from '../../../App';
import SaveIcon from '../../../../assets/cloud_save.png';
import CancelIcon from '../../../../assets/cancel_icon.png';
import './EditVariable.scss';
import { EditVariableDataType } from './EditVariableDataType';

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
      <tr>
        <td className="icon_cell">
          <img
            className="small_icon"
            onClick={() => updateVariable(thisVar, index)}
            src={SaveIcon}
          />
          <img className="small_icon" onClick={onCancel} src={CancelIcon} />
        </td>
        <td className="row_input_cell input_no_border">
          <input
            autoFocus
            id="variable_name"
            className="input_field edit_var_name"
            type="text"
            value={thisVar.name}
            onChange={evt => {
              setThisVar({
                ...thisVar,
                name: evt.target.value,
              });
            }}
          />
        </td>
        <td className="variable_description row_input_cell input_no_border">
          <input
            id="variable_description"
            className="edit_var_desc"
            type="text"
            value={thisVar.description}
            onChange={evt => {
              setThisVar({
                ...thisVar,
                description: evt.target.value,
              });
            }}
          />
        </td>
        <td className="data_type_cell row_input_cell third_cell input_no_border">
          <select
            className="data_type_select_input"
            value={thisVar.data_type}
            onChange={evt => {
              setThisVar({
                ...thisVar,
                data_type: evt.target.value,
              });
            }}
          >
            <option value="0">Select...</option>
            <option value="STRING">String</option>
            <option value="INTEGER">Integer</option>
            <option value="QUANTITY">Quantity</option>
            <option value="ENUMERATION">Enumeration</option>
          </select>
        </td>
      </tr>
      <EditVariableDataType thisVar={thisVar} setThisVar={setThisVar} />
    </>
  );
};
