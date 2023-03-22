import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RESET_STATE, handleAction } from '../redux/actions';
import './Ranking.css';
import iconStar from '../Images/iconStar.png';
import trivia from '../Images/trivia.png';

class Ranking extends Component {
  resetState = () => {
    const { history, dispatch } = this.props;
    dispatch(handleAction(RESET_STATE, ''));
    history.push('/');
  };

  render() {
    const usersRanking = JSON.parse(localStorage.getItem('users'));
    return (
      <>
        <img className="trivia-img" src={ trivia } alt="logo trivia" />
        <div className="div-ranking">
          <h1
            data-testid="ranking-title"
          >
            Ranking

          </h1>

          <button
            data-testid="btn-go-home"
            onClick={ () => this.resetState() }
          >
            Início
          </button>

          { usersRanking.map((user, index) => (
            <div
              className="ranking-list"
              key={ index }
            >
              <div className="img-name">
                <img
                  alt={ `${user.userName}` }
                  src={ user.userGravatarEmail }
                />
                <p
                  data-testid={ `player-name-${index}` }
                >
                  { user.userName }

                </p>
              </div>
              <div className="star-score">
                <img
                  src={ iconStar }
                  alt="estrela"
                />
                <p
                  data-testid={ `player-score-${index}` }
                >
                  { user.userScore }
                </p>
              </div>
            </div>
          ))}
        </div>

      </>
    );
  }
}

export default connect()(Ranking);

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};
