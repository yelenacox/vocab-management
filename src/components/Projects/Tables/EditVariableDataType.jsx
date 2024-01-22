import { useContext, useEffect } from 'react';
import { myContext } from '../../../App';
import './AddVariable.scss';
import { getAll } from '../../Manager/FetchManager';

export const EditVariableDataType = ({ thisVar, setThisVar }) => {
  const { terminologies, setTerminologies, table, vocabUrl } =
    useContext(myContext);

  useEffect(() => {
    thisVar.data_type === 'ENUMERATION'
      ? getAll(vocabUrl, 'Terminology')
          .then(res => res.json())
          .then(data => setTerminologies(data))
      : '';
  }, [thisVar.data_type]);

  return (
    <>
      <tr className="add_var_data_types">
        <td className="icon_cell"></td>

        {thisVar.data_type === 'INTEGER' || thisVar.data_type === 'QUANTITY' ? (
          <>
            <td className="min_cell row_input_cell">
              <label className="input_label" htmlFor="variable_min">
                Min
              </label>
              <input
                id="variable_min"
                className="min_input"
                type="text"
                value={thisVar.min}
                onChange={evt => {
                  setThisVar({
                    ...thisVar,
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
                value={thisVar.max}
                onChange={evt => {
                  setThisVar({
                    ...thisVar,
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
                value={thisVar.units}
                onChange={evt => {
                  setThisVar({
                    ...thisVar,
                    units: evt.target.value,
                  });
                }}
              />
            </td>
          </>
        ) : thisVar.data_type === 'ENUMERATION' ? (
          <>
            <td className="">
              <label className="input_label" htmlFor="variable_data_type">
                Terminology
              </label>
              <select
                className="data_type_select"
                value={thisVar?.enumerations?.reference}
                onChange={evt => {
                  setThisVar({
                    ...thisVar,
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
