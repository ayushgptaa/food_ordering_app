const URL = 'https://us-central1-links-app-d5366.cloudfunctions.net/development';

const Fetch = async (data, request) => {
  const response = await fetch(`${URL}/${request}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      menu_id:
        'menu_draft_Tb2ZEqko8lXxl934BK7f6W5Przdl5WfEctKRDXRE0r2g14HiTyU8urvBjFtNfOehlzi5H4o5ONKjiVELikK2stlOwI0R6wQ02KBA1635-608158-1921',
      ...data
    })
  });

  return response.json();
};

export default Fetch;
