export const requestSearch = (query, rowCount, firstRowDisplayed) => {
  fetch(
    `${URL}q=${query}&ontology=mondo,hp&rows=${rowCount}&start=${firstRowDisplayed}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  ).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error('An unknown error occurred.');
    }
  });
};
