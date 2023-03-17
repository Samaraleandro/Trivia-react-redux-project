import React, { Component } from 'react';

class Login extends Component {
  state = {
    name: '',
    email: '',
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
        >
          Play
        </button>
      </div>
    );
  }
}

export default Login;
