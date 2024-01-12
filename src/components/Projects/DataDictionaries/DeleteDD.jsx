import { useContext, useState } from 'react';
import { myContext } from '../../../App';
import DeleteTrash from '../../../../assets/trash_transparent.png';
import { handleDeleteDD } from '../../Manager/DDManager';

export const DeleteDD = ({ dataDictionary, setDataDictionaries }) => {
  const { vocabUrl } = useContext(myContext);

  return (
    <img
      className="small_icon"
      onClick={evt =>
        handleDeleteDD(evt, vocabUrl, dataDictionary).then(data =>
          setDataDictionaries(data),
        )
      }
      src={DeleteTrash}
    />
  );
};
