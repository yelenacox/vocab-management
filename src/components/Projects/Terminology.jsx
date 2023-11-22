import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { myContext } from '../../App';
import './Terminology.scss';
import { Spinner } from '../Manager/Spinner';
import Background from '../../../assets/Background.png';

export const Terminology = () => {
  const [terminology, setTerminology] = useState({});
  const { terminologyId } = useParams();
  const { vocabUrl, loading, setLoading } = useContext(myContext);

  useEffect(() => {
    getTerminologyById();
  }, []);

  const getTerminologyById = () => {
    setLoading(true);
    fetch(`${vocabUrl}/terminologies/${terminologyId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => setTerminology(data))
      .then(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="terminology_container">
          <div className="image_container">
            <img className="background_image_results" src={Background} />
          </div>
          <h1>{terminology?.name ? terminology?.name : terminology?.id}</h1>
          <h4>{terminology.description}</h4>
          <div className="table_container">
            <table className="table">
              <thead className="header">
                <tr className="header_row">
                  <th>Code</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {terminology?.codes?.map((r, index) => {
                  return (
                    <>
                      <tr key={index}>
                        <td>{r?.code}</td>
                        <td>{r?.description}</td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
            {terminology.url}
          </div>
        </div>
      )}
    </>
  );
};
