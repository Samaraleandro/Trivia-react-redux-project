import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Login extends Component {
  state = {
    name: '',
    email: '',
  };

  clickGame = async () => {
    const { history } = this.props;
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    localStorage.setItem('token', data.token);
    history.push('/game');
  };

  render() {
    const { name, email } = this.state;
    return (
      <div>
        <label>
          Nome
          <input
            data-testid="input-player-name"
            type="text"
            name="name"
            value={ name }
            onChange={ (e) => this.setState({ name: e.target.value }) }
          />
        </label>
        <label>
          Email
          <input
            data-testid="input-gravatar-email"
            type="email"
            name="email"
            value={ email }
            onChange={ (e) => this.setState({ email: e.target.value }) }
          />
        </label>
        <button
          data-testid="btn-play"
          disabled={ !name || !email }
          onClick={ () => this.clickGame() }
        >
          Play
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
