export const requestSearch = (query, rowCount, firstRowdescriptioned) => {
  fetch(
    `${URL}q=${query}&ontology=mondo,hp&rows=${rowCount}&start=${firstRowdescriptioned}`,
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
