import { useContext, useEffect } from 'react';
import { myContext } from '../../../App';
import './Table.scss';
import { useParams } from 'react-router-dom';
import Background from '../../../../assets/Background.png';

export const TableDetails = () => {
  // const { table, setTable, vocabUrl } = useContext(myContext);
  // const { tableId } = useParams();

  // useEffect(() => {
  //   getTableById();
  // }, []);

  // const getTableById = () => {
  //   fetch(`${vocabUrl}/tables/${tableId}`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then(res => res.json())
  //     .then(data => setTable(data));
  // };

  return (
    <>
      <div className="table_id_container">
        <div className="image_container">
          <img className="background_image_results" src={Background} />
        </div>
        <div>HELLOOOOO</div>
      </div>
    </>
  );
};
