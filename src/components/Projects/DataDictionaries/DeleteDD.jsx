import { useContext, useState } from 'react';
import { myContext } from '../../../App';
import DeleteTrash from '../../../../assets/trash_transparent.png';
import { handleDelete } from '../../Manager/FetchManager';

export const DeleteDD = ({ dataDictionary, setDataDictionaries }) => {
  const { vocabUrl } = useContext(myContext);

  return (
    <img
      className="small_icon"
      onClick={evt =>
        handleDelete(evt, vocabUrl, 'DataDictionary', dataDictionary).then(
          data => setDataDictionaries(data),
        )
      }
      src={DeleteTrash}
    />
  );
};
