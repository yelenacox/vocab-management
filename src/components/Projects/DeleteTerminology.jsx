import { useContext, useState } from 'react';
import { myContext } from '../../App';
import DeleteTrash from '../../../assets/delete_icon_trash.png';

export const DeleteTerminology = ({ terminology, setTerminologies }) => {
  const [updatedTerminologies, setupdatedTerminologies] = useState([]);
  const { vocabUrl } = useContext(myContext);

  const handleDelete = evt => {
    fetch(`${vocabUrl}/terminologies/${terminology.id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => {
        return fetch(`${vocabUrl}/terminologies/`);
      })
      .then(response => response.json())
      .then(updatedTerminologies => {
        setTerminologies(updatedTerminologies);
      });
  };

  return (
    <img className="delete_image" onClick={handleDelete} src={DeleteTrash} />
  );
};
