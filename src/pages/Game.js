import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Questions from '../components/Questions';
import './Game.css';
import trivia from '../Images/trivia.png';

class Game extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Header />
        <img src={ trivia } alt="trivia" />
        <Questions history={ history } />
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
