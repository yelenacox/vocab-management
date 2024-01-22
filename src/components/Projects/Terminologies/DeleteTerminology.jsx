import { useContext, useState } from 'react';
import { myContext } from '../../../App';
import DeleteTrash from '../../../../assets/trash_transparent.png';
import { handleDelete } from '../../Manager/FetchManager';

export const DeleteTerminology = ({ terminology, setTerminologies }) => {
  const { vocabUrl } = useContext(myContext);

  return (
    <img
      className="small_icon"
      onClick={evt =>
        handleDelete(evt, vocabUrl, 'Terminology', terminology).then(data =>
          setTerminologies(data),
        )
      }
      src={DeleteTrash}
    />
  );
};
