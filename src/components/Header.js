import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { userName, userEmail, userScore } = this.props;
    const gravatarEmail = `https://www.gravatar.com/avatar/${md5(userEmail).toString()}`;
    return (
      <div>
        <img
          data-testid="header-profile-picture"
          alt="Imagem do usuário"
          src={ gravatarEmail }
        />
        <p data-testid="header-player-name">{userName}</p>
        <p data-testid="header-score">{ userScore }</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.play.name,
  userEmail: state.play.gravatarEmail,
  userScore: state.play.score,
});

Header.propTypes = {
  userName: PropTypes.string,
  userEmail: PropTypes.string,
  userScore: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Header);
