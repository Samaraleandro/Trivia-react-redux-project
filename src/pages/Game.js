import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Questions from '../components/Questions';
import trivia from '../Images/trivia.png';
import './Game.css';

class Game extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Header />
        <div className="triviaContainer">
          <img src={ trivia } alt="trivia" />
        </div>
        <div className="questionsFullContainer">
          <Questions history={ history } />
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Game;
