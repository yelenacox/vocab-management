import { useContext, useState } from 'react';
import { myContext } from '../../../App';
import SaveIcon from '../../../../assets/cloud_save.png';
import CancelIcon from '../../../../assets/cancel_icon.png';
import { handleUpdate } from '../../Manager/FetchManager';

export const EditDescriptionTable = ({
  table,
  setTable,
  setDescriptionEdit,
}) => {
  const [initialDescription, setInitialDescription] = useState(
    table.description,
  );
  const { vocabUrl } = useContext(myContext);

  const updateDescription = () => {
    handleUpdate(vocabUrl, 'Table', table).then(data => setTable(data));
    setDescriptionEdit(false);
  };
  return (
    <>
      <img className="small_icon" onClick={updateDescription} src={SaveIcon} />
      <img
        className="small_icon"
        onClick={() => {
          setTable({ ...table, description: initialDescription });
          setDescriptionEdit(false);
        }}
        src={CancelIcon}
      />
      <input
        id="description"
        className="terminology_input description_input input_field"
        type="text"
        value={table?.description}
        onChange={evt => {
          setTable({ ...table, description: evt.target.value });
        }}
      />
    </>
  );
};
