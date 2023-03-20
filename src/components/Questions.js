import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Questions.css';

class Questions extends Component {
  state = {
    arrayQuestions: [],
    answered: false,
    currentTime: 5,
    isDisable: false,
  };

  // Requisito 8 foi passou no teste mas encontramos alguns bugs que iremos solucionar nos requisitos posteriores.

  async componentDidMount() {
    const invalidTokenNumber = 3;
    const time = 1000;
    const getToken = localStorage.getItem('token');
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${getToken}`);
    const data = await response.json();
    if (data.response_code === invalidTokenNumber) {
      const { history } = this.props;
      localStorage.removeItem('token');
      history.push('/');
    }
    this.setState({
      arrayQuestions: data.results,
    });
    setInterval(() => this.timer(), time);
  }

  allAnswers = () => {
    const { arrayQuestions } = this.state;
    if (arrayQuestions.length > 0) {
      const correctAnswer = {
        dataTestId: 'correct-answer',
        correct: true,
        question: arrayQuestions[0].correct_answer,
        color: 'green',
      };
      const incorrectAnswers = arrayQuestions[0].incorrect_answers
        .map((answer, index) => ({
          dataTestId: `wrong-answer-${index}`,
          correct: false,
          question: answer,
          color: 'red',
        }));
      const mixAnswers = [...incorrectAnswers, correctAnswer];
      const magicNumber = 0.5;
      const randomAnswer = mixAnswers.sort(() => magicNumber - Math.random());
      return randomAnswer;
    }
  };

  timer = () => {
    const { currentTime } = this.state;
    if (currentTime > 0) {
      this.setState((prevState) => ({
        currentTime: prevState.currentTime - 1,
      }));
    } else {
      this.setState({
        isDisable: true,
        answered: true,
      });
    }
  };

  changeColorBtn = () => {
    this.setState({
      answered: true,
    });
  };

  render() {
    const { arrayQuestions, answered, currentTime, isDisable } = this.state;
    const catchAllAnswers = this.allAnswers();
    if (currentTime === 0) {
      clearInterval(this.timer);
    }
    return (
      <div>
        {arrayQuestions.length > 0 && (
          <>
            <h1 data-testid="question-category">{arrayQuestions[0].category}</h1>
            <h1 data-testid="question-text">{arrayQuestions[0].question}</h1>
            { currentTime }
          </>
        )}
        <div data-testid="answer-options">
          {
            arrayQuestions.length > 0 && (
              catchAllAnswers.map((answer) => (
                <button
                  key={ answer.question }
                  className={ answered ? answer.color : '' }
                  data-testid={ answer.dataTestId }
                  value={ answer.correct }
                  onClick={ () => this.changeColorBtn() }
                  disabled={ isDisable }
                >
                  {answer.question}
                </button>
              ))
            )
          }
        </div>
      </div>
    );
  }
}

Questions.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Questions;
