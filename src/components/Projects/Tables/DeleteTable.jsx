import { useContext, useState } from 'react';
import { myContext } from '../../../App';
import DeleteTrash from '../../../../assets/trash_transparent.png';

export const DeleteTable = ({ table, setTables }) => {
  const { vocabUrl } = useContext(myContext);

  const handleDelete = evt => {
    fetch(`${vocabUrl}/Table/${table.id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => {
        return fetch(`${vocabUrl}/Table`);
      })
      .then(response => response.json())
      .then(updatedTables => {
        setTables(updatedTables);
      });
  };

  return (
    <img className="small_icon" onClick={handleDelete} src={DeleteTrash} />
  );
};
