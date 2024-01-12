import { useContext, useEffect, useState } from 'react';
// import './TableStyling.scss';
import { Link, useNavigate } from 'react-router-dom';
import { myContext } from '../../../App';
import { Spinner } from '../../Manager/Spinner';
import { DeleteDD } from './DeleteDD';

export const DDList = () => {
  const {
    loading,
    setLoading,
    vocabUrl,
    dataDictionaries,
    setDataDictionaries,
  } = useContext(myContext);

  const navigate = useNavigate();

  useEffect(() => {
    getDDs();
  }, []);

  const getDDs = () => {
    setLoading(true);
    fetch(`${vocabUrl}/DataDictionary`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => setDataDictionaries(data))
      .then(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="projects_sub_nav">
        <h2>Data Dictionaries</h2>
        <div className="menu_buttons_container">
          <button
            className="manage_term_button"
            onClick={() => navigate('/add_DD')}
          >
            Add Data Dictionary
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
              {dataDictionaries?.map((r, index) => {
                return (
                  <>
                    <tr key={index}>
                      <td className="project_first_cell">
                        <Link to={`/data_dictionary/${r?.id}`}>
                          {r?.name ? r?.name : r?.id}
                        </Link>
                      </td>
                      <td className="project_second_cell">{r?.description}</td>
                      <td className="delete_cell">
                        <DeleteDD
                          dataDictionary={r}
                          setDataDictionaries={setDataDictionaries}
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
