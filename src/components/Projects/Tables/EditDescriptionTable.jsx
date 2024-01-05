import { useContext, useState } from 'react';
import { myContext } from '../../../App';
import SaveIcon from '../../../../assets/cloud_save.png';
import CancelIcon from '../../../../assets/cancel_icon.png';

export const EditDescriptionTable = ({
  table,
  setTable,
  setDescriptionEdit,
}) => {
  const [initialDescription, setInitialDescription] = useState(
    table.description,
  );
  const { updateTable } = useContext(myContext);

  const updateDescription = () => {
    updateTable();
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
