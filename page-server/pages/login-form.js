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

class LoginForm extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {error: props.error};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const {username, password, urlSuccess} = namedValues(Array.from(event.target));
    const authData = await auth({username, password});
    Object.keys(authData).forEach(key => {
      const value = authData[key];
      if (value) {
        this.setState({error: undefined});
        Cookies.set(key, value);
      } else {
        this.setState({error: 'Invalid username/password'});
        Cookies.remove(key);
      }
    });
    if (authData.authToken) {
      Router.push(urlSuccess);
    }
  }

  render() {
    const {username, password} = this.props.formValues;
    return (
      <form onSubmit={this.handleSubmit} method="POST" action="http://localhost:3102/login-form">
        <input type="hidden" name="urlSuccess" value="http://localhost:3102/" />
        <input type="hidden" name="urlError" value="http://localhost:3102/login-form?error=Y" />
        <p>Username: <input name="username" defaultValue={username}/></p>
        <p>Password: <input name="password" defaultValue={password}/></p>
        {this.state.error && <p>{this.state.error}</p>}
        <button type="submit">Login</button>
      </form>
    );
  }
};

const handleSubmit = async (req, res) => {
  const {username, password, urlSuccess} = req.body;
  const authData = await auth({username, password});
  Object.keys(authData).forEach(key => {
    const value = authData[key];
    if (value) {
      res.cookie(key, value)
    } else {
      res.clearCookie(key);
    }
  });
  if (authData.authToken) {
    res.writeHead(302, {
      Location: urlSuccess || '/'
    });
    res.end();
    return true;
  }
  return false;
};

LoginForm.getInitialProps = async({req, res}) => {
  if (req.method === 'POST') {
    const isSuccess = await handleSubmit(req, res);
    if (isSuccess) {
      return {formValues: {}};
    }
    return {
      formValues: req.body,
      error: 'Invalid username/password'
    };
  }
  return {formValues: {}};
}

export default LoginForm;
