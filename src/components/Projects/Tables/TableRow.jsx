import { useState } from 'react';
import { Enumerations } from './Enumerations';

export const TableRow = ({ v, index, handleOpen }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <tr key={index}>
        {/* {active !== index ? (
                        <> */}
        <td className="icon_cell">
          {/* {' '}
                            {terminologyEdit && active !== index ? (
                              <>
                                <img
                                  className="small_icon"
                                  onClick={() => onEdit(index)}
                                  src={PencilIcon}
                                />
                                <DeleteCode
                                  index={index}
                                  terminology={terminology}
                                  setTerminology={setTerminology}
                                  terminologyId={terminologyId}
                                />
                              </>
                            ) : (
                              ''
                            )} */}
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
        {/* </>
                      ) : terminologyEdit && active === index ? (
                        <EditCode
                          codeObject={r}
                          index={index}
                          onCancel={onCancel}
                          setActive={setActive}
                        />
                      ) : (
                        ''
                      )} */}
      </tr>
      {open ? (
        <>
          {v?.data_type === 'QUANTITY' || v?.data_type === 'INTEGER' ? (
            <tr key={`subrow-${index}`}>
              <td className="icon_cell"></td>
              <td className="first_cell"></td>
              <div className="integer_div">
                <th>min: {v?.min}</th>
                <th>max: {v?.max}</th>
                <th>units: {v?.units}</th>
              </div>
            </tr>
          ) : v?.data_type === 'ENUMERATION' ? (
            <Enumerations terminologyReference={v} />
          ) : undefined}
        </>
      ) : undefined}
    </>
  );
};
