import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleAction, requestAcess, SAVE_USERS_INFO } from '../redux/actions';
import './Login.css';
import trivia from '../Images/trivia.png';
import configuração from '../Images/configuração.png';

class Login extends Component {
  state = {
    name: '',
    email: '',
  };

  clickGame = async () => {
    const { history, dispatch } = this.props;
    dispatch(handleAction(SAVE_USERS_INFO, this.state));
    await dispatch(requestAcess());
    history.push('/game');
  };

  render() {
    const { name, email } = this.state;
    const { history } = this.props;
    return (
      <div>
        <div
          className="div-trivia"
        >
          <img
            alt="TRIVIA"
            src={ trivia }
            className="TRIVIA"
          />

        </div>
        <div
          className="div-login"
        >
          <label
            className="label-name"
          >
            Nome
            <input
              className="input-name"
              data-testid="input-player-name"
              type="text"
              name="name"
              value={ name }
              onChange={ (e) => this.setState({ name: e.target.value }) }
            />
          </label>
          <label
            className="label-email"
          >
            Email
            <input
              className="input-email"
              data-testid="input-gravatar-email"
              type="email"
              name="email"
              value={ email }
              onChange={ (e) => this.setState({ email: e.target.value }) }
            />
          </label>
          <button
            className="button-jogar"
            type="button"
            data-testid="btn-play"
            disabled={ !name || !email }
            onClick={ () => this.clickGame() }
          >
            Play
          </button>
          <button
            className="button-configuração"
            type="button"
            data-testid="btn-settings"
            onClick={ () => history.push('/settings') }
          >
            <img
              alt="configurações"
              src={ configuração }
              className="img-configuração"
            />
            Configurações
          </button>
        </div>
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

export default connect()(Login);
