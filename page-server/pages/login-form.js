import Cookies from 'js-cookie';
import Router from 'next/router';
import Auth from '../lib/auth';

const namedValues = elements => elements.reduce((data, element) => {
  if (element.name) {
    data[element.name] = element.value;
  }
  return data;
}, {});

const auth = Auth('http://localhost:3112/login');

const handleSubmit = async (event) => {
  event.preventDefault();
  const {username, password, urlSuccess} = namedValues(Array.from(event.target));
  const authData = await auth({username, password});
  Object.keys(authData).forEach(key => {
    const value = authData[key];
    if (value) {
      Cookies.set(key, value);
    } else {
      Cookies.remove(key);
    }
  });
  if (authData.authToken) {
    Router.push(urlSuccess);
  }
}

const loginForm = () => {
  return (
    <form onSubmit={handleSubmit} method="post" action="http://localhost:3102/login">
      <input type="hidden" name="urlSuccess" value="http://localhost:3102/" />
      <input type="hidden" name="urlError" value="http://localhost:3102/login-form?error=Y" />
      <p>Username: <input name="username"/></p>
      <p>Password: <input name="password"/></p>
      <button type="submit">Login</button>
    </form>
  );
};

export default loginForm;
