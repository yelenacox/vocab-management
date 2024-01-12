export const postDD = (vocabUrl, DDDTO) => {
  return fetch(`${vocabUrl}/DataDictionary`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(DDDTO()),
  }).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error('An unknown error occurred.');
    }
  });
};

export const updateDD = (vocabUrl, dataDictionary) => {
  return fetch(`${vocabUrl}/DataDictionary/${dataDictionary.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataDictionary),
  }).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error('An unknown error occurred.');
    }
  });
};
