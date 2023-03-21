import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  saveInf() {
    const { userScore, userGravatarEmail, userName, history } = this.props;
    if (!localStorage.getItem('users')) {
      const objUsers = { userName,
        userGravatarEmail,
        userScore };
      localStorage.setItem('users', JSON.stringify([objUsers]));
    } else {
      const newUsers = JSON.parse(localStorage.getItem('users'));
      const objUsers = { userName,
        userGravatarEmail,
        userScore };
      const spreadUsers = [...newUsers, objUsers];
      const sortNewUsers = spreadUsers.sort((a, b) => b.userScore - a.userScore);
      localStorage.setItem('users', JSON.stringify(sortNewUsers));
    }
    history.push('/ranking');
  }

  render() {
    const { userAssertions, userScore, history } = this.props;
    const three = 3;
    return (
      <div>
        <Header />
        { userAssertions < three ? (
          <p
            data-testid="feedback-text"
          >
            Could be better...

          </p>
        ) : (
          <p
            data-testid="feedback-text"
          >
            Well Done!

          </p>
        ) }

        <p
          data-testid="feedback-total-score"
        >
          { userScore }

        </p>

        <p
          data-testid="feedback-total-question"
        >
          { userAssertions }

        </p>
        <button
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          Play Again
        </button>
        <button
          data-testid="btn-ranking"
          onClick={ () => this.saveInf() }
        >
          Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userAssertions: state.player.assertions,
  userScore: state.player.score,
  userGravatarEmail: state.player.imgGravatar,
  userName: state.player.name,
});

Feedback.propTypes = {
  userAssertions: PropTypes.number,
  userScore: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
