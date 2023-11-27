import { useContext, useState } from 'react';
import { myContext } from '../../App';
import DeleteTrash from '../../../assets/delete_icon_trash.png';

export const DeleteTerminology = ({ terminology, setTerminologies }) => {
  const [projects, setProjects] = useState([]);
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
      .then(projects => {
        setTerminologies(projects);
      });
  };

  return (
    <img className="delete_image" onClick={handleDelete} src={DeleteTrash} />
  );
};
