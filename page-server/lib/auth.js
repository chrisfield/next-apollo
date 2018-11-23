import fetch from 'isomorphic-unfetch';

const Auth = authUrl => (
  async ({hostname, username, password}) => {
    const response = await fetch(authUrl, {
      method: 'POST',
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({hostname, username, password})
    });
    const authData = await response.json();
    console.log('the auth answer is: ', authData);
    return authData;
  }
);

export default Auth;

