import { React, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { myContext } from '../../../App';
import Background from '../../../../assets/Background.png';
import { AdditionalVariableInput } from './AdditionalVariableInput';

export const AddTable = () => {
  const { vocabUrl, table, setTable, initialTable, handleVariableAdd } =
    useContext(myContext);

  useEffect(() => {
    setTable(initialTable);
  }, []);

  useEffect(
    () => () => {
      setTable(initialTable);
    },
    [],
  );
  useEffect(() => {
    if (table?.variables?.length === 0) {
      handleVariableAdd();
    }
  });

  // console.log('table: ', JSON.stringify(table));
  const navigate = useNavigate();

  let tableDTO = () => {
    const variablesDTO = table.variables.map(variable => {
      variable.data_type === 'QUANTITY' || variable.data_type === 'INTEGER'
        ? {
            name: variable.varName,
            description: variable.varDescription,
            data_type: variable.data_type,
            min: variable.min,
            max: variable.max,
            units: variable.units,
          }
        : variable.data_type === 'ENUMERATION'
        ? {
            name: variable.varName,
            description: variable.varDescription,
            data_type: variable.data_type,
            enumerations: {
              reference: variable.reference,
            },
          }
        : {
            name: variable.varName,
            description: variable.varDescription,
            data_type: variable.data_type,
          };
    });
    return { ...table, variables: variablesDTO };
  };

  const handleSubmit = event => {
    event.preventDefault();
    fetch(`${vocabUrl}/Table`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tableDTO()),
    })
      .then(res => res.json())
      .then(data => navigate(`/table/${data?.id}`));
  };

  // console.log('code id', codeId);
  // const getCodeId = () => {
  //   const current = codeId;
  //   setCodeId(codeId + 1);
  //   return current;
  // };

  return (
    <>
      <article className="form_container">
        <div className="image_container">
          <img className="background_image_results" src={Background} />
        </div>
        <h2>New Table</h2>
        <div className="name form_wrapper">
          <label className="input_label" htmlFor="terminology_name">
            Name
          </label>
          <input
            autoFocus
            id="name"
            className="add_term_input name_input"
            type="text"
            value={table?.name}
            onChange={evt => {
              setTable({
                ...table,
                name: evt.target.value,
              });
            }}
          />
        </div>

        <div className="description form_wrapper">
          <label className="input_label" htmlFor="table_description">
            Description
          </label>
          <input
            id="display"
            className="add_term_input description_input"
            type="text"
            value={table?.description}
            onChange={evt => {
              setTable({
                ...table,
                description: evt.target.value,
              });
            }}
          />
        </div>

        <div className="url form_wrapper">
          <label className="input_label" htmlFor="table_url">
            URL
          </label>
          <input
            required
            id="url"
            className="add_term_input url_input"
            type="text"
            value={table?.url}
            onChange={evt => {
              setTable({
                ...table,
                url: evt.target.value,
              });
            }}
          />
        </div>

        {table?.variables?.map(variable => (
          <AdditionalVariableInput variable={variable} />
        ))}

        <button className="manage_term_button" onClick={handleSubmit}>
          Save
        </button>
      </article>
    </>
  );
};
