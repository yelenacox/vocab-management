import { useState, useEffect, useContext } from 'react';
import { myContext } from '../../../App';

export const Enumerations = ({ terminologyReference }) => {
  const [enumeration, setEnumeration] = useState({});
  const { loading, setLoading, vocabUrl } = useContext(myContext);

  // useEffect(() => {
  //   getTerminologyById();
  // }, []);

  const getTerminologyById = () => {
    setLoading(true);
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
      poop
      {/* <tr>
        <td className="icon_cell"></td>
        <td className="first_cell"></td>
        <div className="integer_div">
          <th>Code: {enumeration?.code}</th>
          <th>Display: {enumeration?.display}</th>
        </div>
      </tr> */}
    </>
  );
};
