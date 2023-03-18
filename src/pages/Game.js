import React, { Component } from 'react';
import Header from '../components/Header';
import Questions from '../components/Questions';
// import { requestTriviaQuestions } from '../redux/actions';

class Game extends Component {
  render() {
    return (
      <div>
        <Header />
        <p>Game</p>
        <Questions />
        {/* { this.requestTriviaQuestions()} */}
      </div>
    );
  }
}

export default Game;
