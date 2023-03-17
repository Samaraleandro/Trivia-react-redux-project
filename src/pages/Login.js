import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleAction, requestAcess, SAVE_USERS_INFO } from '../redux/actions';

class Login extends Component {
  state = {
    name: '',
    email: '',
  };

  clickGame = async () => {
    const { history, dispatch } = this.props;
    dispatch(handleAction(SAVE_USERS_INFO, this.state));
    dispatch(requestAcess());
    history.push('/game');
  };

  render() {
    const { name, email } = this.state;
    const { history } = this.props;
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
          type="button"
          data-testid="btn-play"
          disabled={ !name || !email }
          onClick={ () => this.clickGame() }
        >
          Play
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => history.push('/settings') }
        >
          Configurações
        </button>

      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(null)(Login);
