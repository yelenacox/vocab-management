import { useContext, useEffect, useRef, useState } from 'react';
import { myContext } from '../../../App';
// import './AddCode.scss';
import SaveIcon from '../../../../assets/cloud_save.png';
import CancelIcon from '../../../../assets/cancel_icon.png';

export const AddVariable = ({
  variable,
  newVariable,
  newVars,
  setNewVars,
  tableId,
  i,
}) => {
  const {
    table,
    setTable,
    vocabUrl,
    initialTable,
    terminologies,
    setTerminologies,
  } = useContext(myContext);
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

  useEffect(() => {
    thisVariable.data_type === 'ENUMERATION' ? getTerminologies() : '';
  }, [thisVariable.data_type]);

  const getTerminologies = () => {
    fetch(`${vocabUrl}/Terminology`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => setTerminologies(data));
  };

  const removeInputField = i => {
    let newInput = [...newVars];
    newInput.splice(i, 1);
    setNewVars(newInput);
  };

  const handleAddCode = (e, i) => {
    const filterByRowId = newVars.filter(r => r.id === thisVariable.id);
    const newVariablesDTO = filterByRowId.map(variable => {
      return {
        name: variable.name,
        description: variable.description,
        data_type: variable.data_type,
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
      <td className="icon_cell">
        <img
          className="small_icon"
          onClick={e =>
            thisVariable.name !== '' && thisVariable.description !== ''
              ? handleAddCode(i)
              : window.alert('Please fill in the name and description.')
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
          id="name"
          className="code_input code_input_field"
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
      <td className="row_input_cell">
        <input
          id="code_description"
          className="code_description_input code_input_field"
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
      <td className="data_type form_wrapper">
        <select
          className="data_type_select"
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
      <div className="data_type_inputs">
        {thisVariable.data_type === 'INTEGER' ||
        thisVariable.data_type === 'QUANTITY' ? (
          <>
            <div className="code form_wrapper">
              <label className="input_label" htmlFor="variable_min">
                Min
              </label>
              <input
                id="variable_min"
                className="add_code_input"
                type="text"
                value={table.min}
                onChange={evt => {
                  setThisVariable({
                    ...thisVariable,
                    min: evt.target.value,
                  });
                }}
              />
            </div>
            <div className="code form_wrapper">
              <label className="input_label" htmlFor="variable_max">
                Max
              </label>
              <input
                id="variable_max"
                className="add_code_input"
                type="text"
                value={table.max}
                onChange={evt => {
                  setThisVariable({
                    ...thisVariable,
                    max: evt.target.value,
                  });
                }}
              />
            </div>
            <div className="code form_wrapper">
              <label className="input_label" htmlFor="variable_units">
                Units
              </label>
              <input
                id="variable_units"
                className="add_code_input"
                type="text"
                value={table.units}
                onChange={evt => {
                  setThisVariable({
                    ...thisVariable,
                    units: evt.target.value,
                  });
                }}
              />
            </div>
          </>
        ) : thisVariable.data_type === 'ENUMERATION' ? (
          <>
            {' '}
            <div className="data_type form_wrapper">
              <label className="input_label" htmlFor="variable_data_type">
                Terminology
              </label>
              <select
                className="data_type_select"
                value={table?.enumerations?.reference}
                onChange={evt => {
                  setThisVariable({
                    ...thisVariable,
                    enumerations: {
                      reference: evt.target.value,
                    },
                  });
                }}
              >
                <option value="0">Select...</option>
                {terminologies.map(term => {
                  return (
                    <>
                      <option value={`Terminology/${term.id}`} key={term.id}>
                        {term.name ? term.name : term.id}
                      </option>
                    </>
                  );
                })}
              </select>
            </div>
          </>
        ) : (
          ''
        )}
      </div>
    </>
  );
};
