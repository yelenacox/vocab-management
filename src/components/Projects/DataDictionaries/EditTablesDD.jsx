import { useEffect, useState } from 'react';
import { Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import PencilIcon from '../../../../assets/pencil_yellow_transparent.png';
import SaveIcon from '../../../../assets/cloud_save.png';
import CancelIcon from '../../../../assets/cancel_icon.png';

export const EditTablesDD = ({
  selectedObjs,
  tablesDD,
  edit,
  setEdit,
  DDEdit,
  updateTablesDD,
}) => {
  let [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    const ids = tablesDD.map(o => {
      if (selectedObjs.includes(o)) {
        return o.id;
      } else {
        return null;
      }
    });
    setSelectedIds(ids);
  }, [selectedObjs]);

  const handleOnChange = e => {
    const checked = e.target.checked;
    const value = e.target.id;
    const index = tablesDD.findIndex(obj => obj.id === value);
    if (index >= 0) {
      const tempIds = selectedIds;
      if (!checked) {
        tempIds[index] = null;
      } else {
        tempIds[index] = value;
      }
      setSelectedIds(tempIds);
    }
  };

  return (
    <>
      <thead className="header">
        <tr className="header_row">
          <div className="initial_div">
            {DDEdit && !edit ? (
              <img
                className="small_icon"
                onClick={() => setEdit(true)}
                src={PencilIcon}
              />
            ) : DDEdit && edit ? (
              <>
                {' '}
                <img
                  className="small_icon"
                  onClick={() => {
                    updateTablesDD(selectedIds);
                    setEdit(false);
                  }}
                  src={SaveIcon}
                />
                <img
                  className="small_icon"
                  onClick={() => setEdit(false)}
                  src={CancelIcon}
                />
              </>
            ) : (
              ''
            )}
          </div>

          <th className="first_cell">Table</th>
        </tr>
      </thead>
      <tbody>
        {!edit
          ? selectedObjs.map((r, index) => {
              const checked = selectedIds?.includes(r.id);
              return (
                <tr key={index}>
                  <td className="initial_cell">
                    {edit ? (
                      <Checkbox
                        id={r.id}
                        defaultChecked={checked}
                        onChange={handleOnChange}
                      />
                    ) : (
                      ''
                    )}
                  </td>
                  {
                    <td className="first_cell">
                      <Link to={`/Table/${r.id}`}>{r?.name}</Link>
                    </td>
                  }
                </tr>
              );
            })
          : DDEdit && edit
          ? tablesDD.map((r, index) => {
              const checked = selectedIds?.includes(r.id);
              return (
                <tr key={index}>
                  <td className="initial_cell">
                    {edit ? (
                      <Checkbox
                        id={r.id}
                        defaultChecked={checked}
                        onChange={handleOnChange}
                      />
                    ) : (
                      ''
                    )}
                  </td>
                  {
                    <td className="first_cell">
                      <Link to={`/Table/${r.id}`}>{r?.name}</Link>
                    </td>
                  }
                </tr>
              );
            })
          : ''}{' '}
      </tbody>
    </>
  );
};
