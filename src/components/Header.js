import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { IMG_GRAVATAR, handleAction } from '../redux/actions';
import './Header.css';
import iconStar from '../Images/iconStar.png';

class Header extends Component {
  state = {
    userGravatarEmail: '',
  };

  componentDidMount() {
    const { userEmail, dispatch } = this.props;
    const gravatarEmail = `https://www.gravatar.com/avatar/${md5(userEmail).toString()}`;
    dispatch(handleAction(IMG_GRAVATAR, gravatarEmail));
    this.setState({ userGravatarEmail: gravatarEmail });
  }

  render() {
    const { userName, userScore } = this.props;
    const { userGravatarEmail } = this.state;
    return (
      <div
        className="div-header"
      >
        <div
          className="div-header-player-name"
        >
          <img
            className="img-header-user"
            data-testid="header-profile-picture"
            alt="Imagem do usuário"
            src={ userGravatarEmail }
          />

          <h4
            className="header-player-name"
            data-testid="header-player-name"
          >
            {userName}
          </h4>
        </div>
        <div
          className="div-header-score"

        >
          <img
            className="iconStar"
            alt="Icon Star Score"
            src={ iconStar }
          />
          <span>
            { 'Pontos: ' }
            <span
              data-testid="header-score"
            >
              { userScore }
            </span>
          </span>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.player.name,
  userEmail: state.player.gravatarEmail,
  userScore: state.player.score,
});

Header.propTypes = {
  userName: PropTypes.string,
  userEmail: PropTypes.string,
  userScore: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Header);
