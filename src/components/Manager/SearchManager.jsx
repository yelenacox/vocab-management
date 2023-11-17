import { useContext } from 'react';
import { myContext } from '../../App';

const {
  results,
  setResults,
  page,
  setPage,
  rows,
  setRows,
  current,
  setCurrent,
  buttonDisabled,
  setButtonDisabled,
  loading,
  setLoading,
} = useContext(myContext);

export const requestSearch = (rowCount, firstRowDisplayed) => {
  setLoading(true);
  fetch(
    `${URL}q=${query}&ontology=mondo,hp&rows=${rowCount}&start=${firstRowDisplayed}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
    .then(res => res.json())
    .then(data => setResults(data.response))
    .then(() => {
      setLoading(false);
    });
};
