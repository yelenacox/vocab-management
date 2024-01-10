import { useState } from 'react';
import { Enumerations } from './Enumerations';
import PencilIcon from '../../../../assets/pencil_yellow_transparent.png';
import { DeleteVariable } from './DeleteVariable';
import { EditVariable } from './EditVariable';

export const TableRow = ({
  v,
  index,
  handleOpen,
  tableEdit,
  active,
  setActive,
  table,
  setTable,
  tableId,
  onEdit,
  onCancel,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {active !== index ? (
        <>
          <tr key={index}>
            <td className="icon_cell">
              {tableEdit && active !== index ? (
                <>
                  <img
                    className="small_icon"
                    onClick={() => onEdit(index)}
                    src={PencilIcon}
                  />
                  <DeleteVariable
                    index={index}
                    table={table}
                    setTable={setTable}
                    tableId={tableId}
                  />
                </>
              ) : (
                ''
              )}
            </td>
            <td className="first_cell">{v?.name}</td>
            <td className="second_cell">{v?.description}</td>
            <td className="third_cell">
              {v?.data_type !== 'STRING' ? (
                <div
                  className="row_header"
                  id={index}
                  onClick={() => handleOpen(!open, setOpen)}
                >
                  {v?.data_type}
                </div>
              ) : (
                v?.data_type
              )}
            </td>
          </tr>
        </>
      ) : tableEdit && active === index ? (
        <EditVariable
          varObject={v}
          index={index}
          onCancel={onCancel}
          setActive={setActive}
        />
      ) : (
        ''
      )}
      {open ? (
        <>
          {v?.data_type === 'QUANTITY' || v?.data_type === 'INTEGER' ? (
            <tr className="integer_row" key={`subrow-${index}`}>
              <td id="first_integer_cell"></td>
              <td className="first_cell"></td>
              <div className="integer_div">
                <div>
                  <th className="numerical_header">min:</th>
                  <td id="integer_value"> {v?.min}</td>
                </div>
                <div>
                  <th className="numerical_header">max: </th>
                  <td id="integer_value">{v?.max}</td>
                </div>
                <div>
                  <th className="numerical_header">units: </th>
                  <td id="integer_value">{v?.units}</td>
                </div>
              </div>
            </tr>
          ) : v?.data_type === 'ENUMERATION' ? (
            <tr>
              <td colSpan="4">
                <Enumerations terminologyReference={v} />
              </td>
            </tr>
          ) : undefined}
        </>
      ) : undefined}
    </>
  );
};
