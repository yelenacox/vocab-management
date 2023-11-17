import { useContext, useEffect, useState } from 'react';
import './Projects.scss';
import { myContext } from '../../App';

export const Projects = () => {
  const [terminologies, setTerminologies] = useState([]);
  const { loading, setLoading } = useContext(myContext);

  useEffect(() => {
    getTerminologies();
  }, []);

  const getTerminologies = () => {
    setLoading(true);
    fetch(`http://localhost:3000/terminologies`, {
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
        <h1>Terminologies</h1>
        <div className="table_container">
          <table className="table">
            <thead className="header">
              <tr className="header_row">
                <th>Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {terminologies?.map(r => {
                return (
                  <>
                    <tr>
                      <td>{r?.name ? r?.name : r?.id}</td>
                      <td>{r?.description}</td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
