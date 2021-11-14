/* eslint-disable camelcase */
/* eslint-disable no-console */
const URL = 'https://us-central1-links-app-d5366.cloudfunctions.net/development';

const Fetch = async (data, request, publishedid) => {
  let menu_id = '';
  if (publishedid) {
    menu_id =
      'menu_published_0FTpChYofCp3gsPicLX4lRwSYBqbYY9Qs225sJFXdCxUeFRwrMk0gdf1y8eEM3nNXmfhsnhXT1yumUpBwwJPh4VQLUm5fJNa1wmo1635-612160-7001';
  } else {
    menu_id =
      'menu_draft_Tb2ZEqko8lXxl934BK7f6W5Przdl5WfEctKRDXRE0r2g14HiTyU8urvBjFtNfOehlzi5H4o5ONKjiVELikK2stlOwI0R6wQ02KBA1635-608158-1921';
  }
  const response = await fetch(`${URL}/${request}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      menu_id,
      ...data
    })
  });

  if (response.status === 400) {
    return response.text().then((text) => {
      throw new Error(text);
    });
  }
  return response.json();
};

export default Fetch;
