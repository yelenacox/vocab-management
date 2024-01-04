import { useState, useEffect, useContext } from 'react';
import { myContext } from '../../../App';
import './Enumerations.scss';

export const Enumerations = ({ terminologyReference }) => {
  const [enumeration, setEnumeration] = useState({});
  const { loading, setLoading, vocabUrl } = useContext(myContext);

  useEffect(() => {
    getTerminologyById();
  }, []);

  const getTerminologyById = () => {
    // setLoading(true);
    fetch(`${vocabUrl}/${terminologyReference?.enumerations?.reference}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => setEnumeration(data))
      .then(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <table className="enumerations_table">
        <thead className="enumeration_head_wrapper">
          <th id="first_column"></th>
          <th id="first_column"></th>
          <th id="enumeration_header second_column">Code</th>
          <th id="enumeration_header third_column">Display</th>
        </thead>
        <tbody>
          {enumeration?.codes?.map((e, index) => {
            return (
              <>
                <tr className="enumeration_row" key={index}>
                  <td id="first_column"></td>
                  <td id="first_column"></td>
                  <td id="second_column">{e?.code}</td>
                  <td id="third_column">{e?.display}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
