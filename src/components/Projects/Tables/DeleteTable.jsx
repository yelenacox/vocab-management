import { useContext, useState } from 'react';
import { myContext } from '../../../App';
import DeleteTrash from '../../../../assets/trash_transparent.png';

export const DeleteTable = ({ table, setTables }) => {
  const { vocabUrl } = useContext(myContext);

  const handleDelete = evt => {
    // fetch(`${vocabUrl}/Terminology/${terminology.id}`, {
    fetch(`${vocabUrl}/tables/${table.id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => {
        // return fetch(`${vocabUrl}/Terminology`);
        return fetch(`${vocabUrl}/tables/`);
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
