import { useContext, useEffect, useState } from 'react';
import './Projects.scss';
import { myContext } from '../../App';
import { Spinner } from '../Manager/Spinner';
import { Link } from 'react-router-dom';
import Background from '../../../assets/Background.png';
import { DeleteTerminology } from './Terminologies/DeleteTerminology';

export const Projects = () => {
  const [terminologies, setTerminologies] = useState([]);
  const { loading, setLoading, vocabUrl } = useContext(myContext);

  useEffect(() => {
    getTerminologies();
  }, []);

  const getTerminologies = () => {
    setLoading(true);
    fetch(`${vocabUrl}/Terminology`, {
      // fetch(`${vocabUrl}/terminologies`, {
      // mode: 'cors',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => setTerminologies(data))
      .then(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="projects_container">
        <div className="image_container">
          <img className="background_image_results" src={Background} />
        </div>
        <div className="projects_sub_nav">
          <h1>Terminologies</h1>
          <div className="menu_buttons_container">
            <Link to="/add">Add Terminology</Link>
          </div>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <div className="table_container">
            <table className="table">
              <thead className="header">
                <tr className="header_row">
                  <th>Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {terminologies?.map((r, index) => {
                  return (
                    <>
                      <tr key={index}>
                        <td>
                          <Link to={`/terminologies/${r?.id}`}>
                            {r?.name ? r?.name : r?.id}
                          </Link>
                        </td>
                        <td>{r?.description}</td>
                        <td className="delete_cell">
                          <DeleteTerminology
                            terminology={r}
                            setTerminologies={setTerminologies}
                          />
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};
