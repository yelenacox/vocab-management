export const getTables = vocabUrl => {
  return fetch(`${vocabUrl}/Table`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error('An unknown error occurred.');
    }
  });
};
