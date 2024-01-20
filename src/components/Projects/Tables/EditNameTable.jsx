import { useContext, useState } from 'react';
import { myContext } from '../../../App';
import SaveIcon from '../../../../assets/cloud_save.png';
import CancelIcon from '../../../../assets/cancel_icon.png';
import { handleUpdate } from '../../Manager/FetchManager';

export const EditNameTable = ({ table, setTable, setNameEdit }) => {
  const [initialName, setInitialName] = useState(table.name);
  const { vocabUrl } = useContext(myContext);

  const updateName = () => {
    handleUpdate(vocabUrl, 'Table', table).then(data => setTable(data));
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
        className="terminology_input input_field"
        type="text"
        value={table.name}
        onChange={evt => {
          setTable({ ...table, name: evt.target.value });
        }}
      />
    </>
  );
};
