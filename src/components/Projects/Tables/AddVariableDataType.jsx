import { useContext, useEffect } from 'react';
import { myContext } from '../../../App';
import './AddVariable.scss';
import { getAll } from '../../Manager/FetchManager';

export const AddVariableDataType = ({ thisVariable, setThisVariable }) => {
  const { terminologies, setTerminologies, table, vocabUrl } =
    useContext(myContext);

  useEffect(() => {
    thisVariable.data_type === 'ENUMERATION'
      ? getAll(vocabUrl, 'Terminology').then(data => setTerminologies(data))
      : '';
  }, [thisVariable.data_type]);

  return (
    <>
      <tr className="add_var_data_types">
        <td className="icon_cell"></td>

        {thisVariable.data_type === 'INTEGER' ||
        thisVariable.data_type === 'QUANTITY' ? (
          <>
            <td className="min_cell row_input_cell">
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
            <td className="max_cell row_input_cell">
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
            <td className="third_cell row_input_cell">
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
            <td className="row_input_cell">
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
