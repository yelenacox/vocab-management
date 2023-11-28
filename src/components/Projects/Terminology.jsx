import { useContext, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { myContext } from '../../App';
import './Terminology.scss';
import { Spinner } from '../Manager/Spinner';
import Background from '../../../assets/Background.png';
import BackArrow from '../../../assets/back_arrow.png';
import DeleteTrash from '../../../assets/delete_icon_trash.png';

export const Terminology = () => {
  const [terminology, setTerminology] = useState({});
  const [updatedTerminology, setUpdatedTerminology] = useState({});
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
  console.log('CODES', terminology);

  const handleDelete = index => {
    terminology.codes.splice(index, 1);
    console.log('HERE', index, terminology);
    fetch(`${vocabUrl}/terminologies/${terminologyId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(terminology),
    })
      //   //   .then(response => response.json())
      //   //   .then(() => {
      //   //     return fetch(`${vocabUrl}/terminologies/${terminologyId}`);
      //   //   })
      .then(response => response.json())
      .then(updatedTerminology => {
        setTerminology(updatedTerminology);
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
          <div className="terminology_back_wrapper">
            <Link to="/projects">
              <img className="terminology_back" src={BackArrow} />
              Back
            </Link>
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
                        <td className="delete_cell">
                          <img
                            className="delete_image"
                            onClick={() => handleDelete(index)}
                            src={DeleteTrash}
                          />
                        </td>
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
