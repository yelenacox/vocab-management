import { useContext, useState } from 'react';
import { myContext } from '../../../App';
import SaveIcon from '../../../../assets/cloud_save.png';
import CancelIcon from '../../../../assets/cancel_icon.png';

export const EditUrlTable = ({ table, setTable, setUrlEdit }) => {
  const [initialUrl, setInitialUrl] = useState(table.url);
  const { updateTable } = useContext(myContext);

  const updateUrl = () => {
    updateTable();
    setUrlEdit(false);
  };
  return (
    <>
      <img className="small_icon" onClick={updateUrl} src={SaveIcon} />
      <img
        className="small_icon"
        onClick={() => {
          setTable({ ...table, url: initialUrl });
          setUrlEdit(false);
        }}
        src={CancelIcon}
      />

      <input
        id="url"
        className="terminology_input url input_field"
        type="text"
        value={table.url}
        onChange={evt => {
          setTable({ ...table, url: evt.target.value });
        }}
      />
    </>
  );
};
