import { useContext, useEffect, useState } from 'react';
import '../Projects.scss';
import { Link, useNavigate } from 'react-router-dom';
import { myContext } from '../../../App';
import { Spinner } from '../../Manager/Spinner';
import { DeleteTerminology } from './DeleteTerminology';

export const TerminologyList = () => {
  const { loading, setLoading, vocabUrl, terminologies, setTerminologies } =
    useContext(myContext);

  const navigate = useNavigate();

  useEffect(() => {
    getTerminologies();
  }, []);

  const getTerminologies = () => {
    setLoading(true);
    fetch(`${vocabUrl}/Terminology`, {
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
      <div className="projects_sub_nav">
        <h2>Terminologies</h2>
        <div className="menu_buttons_container">
          <button
            className="manage_term_button"
            onClick={() => navigate('/add_terminology')}
          >
            Add Terminology
          </button>{' '}
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
                      <td className="project_first_cell">
                        <Link to={`/terminology/${r?.id}`}>
                          {r?.name ? r?.name : r?.id}
                        </Link>
                      </td>
                      <td className="project_second_cell">{r?.description}</td>
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
    </>
  );
};
