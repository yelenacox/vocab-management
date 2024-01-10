import { useContext, useEffect, useRef, useState } from 'react';
import { myContext } from '../../../App';
import './AddVariable.scss';
import SaveIcon from '../../../../assets/cloud_save.png';
import CancelIcon from '../../../../assets/cancel_icon.png';
import { AddVariableDataType } from './AddVariableDataType';

export const AddVariable = ({ variable, newVars, setNewVars, tableId, i }) => {
  const { table, setTable, vocabUrl } = useContext(myContext);
  const [thisVariable, setThisVariable] = useState(variable);

  useEffect(() => {
    let varIndex;
    newVars.forEach((newVar, index) => {
      if (thisVariable?.id === newVar?.id) {
        varIndex = index;
      }
    });
    let newVar = thisVariable;
    newVars[varIndex] = newVar;
    setNewVars(newVars);
  }, [thisVariable]);

  const removeInputField = i => {
    let newInput = [...newVars];
    newInput.splice(i, 1);
    setNewVars(newInput);
  };

  const handleAddVariable = (e, i) => {
    const filterByRowId = newVars.filter(r => r.id === thisVariable.id);
    const newVariablesDTO = filterByRowId.map(variable => {
      return {
        name: variable.name,
        description: variable.description,
        data_type: variable.data_type,
        min: variable.min,
        max: variable.max,
        units: variable.units,
        enumerations: { reference: variable.enumerations.reference },
      };
    });
    const newTable = {
      ...table,
      variables: [...table.variables, ...newVariablesDTO],
    };

    fetch(`${vocabUrl}/Table/${tableId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTable),
    })
      .then(response => response.json())
      .then(updatedTable => {
        setTable(updatedTable);
        removeInputField(i);
        setThisVariable(variable);
      });
  };

  return (
    <>
      <tr>
        <td className="icon_cell">
          <img
            className="small_icon"
            onClick={e =>
              thisVariable.name !== '' && thisVariable.description !== ''
                ? handleAddVariable(i)
                : window.alert('Please fill out the name and description.')
            }
            src={SaveIcon}
          />
          <img
            className="small_icon"
            onClick={() => removeInputField(i)}
            src={CancelIcon}
          />
        </td>
        <td className="row_input_cell first_cell input_no_border name_input">
          <input
            autoFocus
            id="name"
            className="var_input"
            type="text"
            value={thisVariable.name}
            onChange={evt => {
              setThisVariable({
                ...thisVariable,
                name: evt.target.value,
              });
            }}
          />
        </td>
        <td className="row_input_cell second_cell input_no_border">
          <input
            id="variable_description"
            className="var_description_input var_input_field"
            type="text"
            value={thisVariable.description}
            onChange={evt => {
              setThisVariable({
                ...thisVariable,
                description: evt.target.value,
              });
              console.log(thisVariable);
            }}
          />
        </td>
        <td className="data_type_cell row_input_cell third_cell input_no_border">
          <select
            className="data_type_select_input"
            value={table.data_type}
            onChange={evt => {
              setThisVariable({
                ...thisVariable,
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
      <AddVariableDataType
        thisVariable={thisVariable}
        setThisVariable={setThisVariable}
      />
    </>
  );
};
