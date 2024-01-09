import { useContext, useEffect } from 'react';
import { myContext } from '../../../App';
import './AddVariable.scss';

export const AddVariableDataType = ({ thisVariable, setThisVariable }) => {
  const { terminologies, setTerminologies, table, vocabUrl } =
    useContext(myContext);

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

  return (
    <>
      <tr className="add_var_data_types">
        <td className="icon_cell"></td>

        {thisVariable.data_type === 'INTEGER' ||
        thisVariable.data_type === 'QUANTITY' ? (
          <>
            <td className="min_cell">
              <label className="input_label" htmlFor="variable_min">
                Min
              </label>
              <input
                id="variable_min"
                className="min_input"
                type="text"
                value={table.min}
                onChange={evt => {
                  setThisVariable({
                    ...thisVariable,
                    min: evt.target.value,
                  });
                }}
              />
            </td>
            <td className="max_cell">
              <label className="input_label" htmlFor="variable_max">
                Max
              </label>
              <input
                id="variable_max"
                className="max_input"
                type="text"
                value={table.max}
                onChange={evt => {
                  setThisVariable({
                    ...thisVariable,
                    max: evt.target.value,
                  });
                }}
              />
            </td>
            <td className="third_cell">
              <label className="input_label" htmlFor="variable_units">
                Units
              </label>
              <input
                id="variable_units"
                className="units_input"
                type="text"
                value={table.units}
                onChange={evt => {
                  setThisVariable({
                    ...thisVariable,
                    units: evt.target.value,
                  });
                }}
              />
            </td>
          </>
        ) : thisVariable.data_type === 'ENUMERATION' ? (
          <>
            <td className="">
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
            </td>
          </>
        ) : (
          ''
        )}
      </tr>
    </>
  );
};
