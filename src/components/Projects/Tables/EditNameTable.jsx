import { useContext, useState } from 'react';
import { myContext } from '../../../App';
import SaveIcon from '../../../../assets/cloud_save.png';
import CancelIcon from '../../../../assets/cancel_icon.png';

export const EditNameTable = ({ table, setTable, setNameEdit }) => {
  const [initialName, setInitialName] = useState(table.name);
  const { updateTable } = useContext(myContext);

  const updateName = () => {
    updateTable();
    setNameEdit(false);
  };

  return (
    <>
      <img className="small_icon" onClick={updateName} src={SaveIcon} />
      <img
        className="small_icon"
        onClick={() => {
          setTable({ ...table, name: initialName });
          setNameEdit(false);
        }}
        src={CancelIcon}
      />

      <input
        id="name"
        className="terminology_input name_input input_field"
        type="text"
        value={table.name}
        onChange={evt => {
          setTable({ ...table, name: evt.target.value });
        }}
      />
    </>
  );
};
