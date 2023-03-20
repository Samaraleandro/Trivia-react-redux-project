import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Questions.css';

class Questions extends Component {
  state = {
    arrayQuestions: [],
    answered: false,
  };

  async componentDidMount() {
    const invalidTokenNumber = 3;
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

  changeColorBtn = () => {
    this.setState({
      answered: true,
    });
  };

  render() {
    const { arrayQuestions, answered } = this.state;
    const catchAllAnswers = this.allAnswers();
    return (
      <div>
        {arrayQuestions.length > 0 && (
          <>
            <h1 data-testid="question-category">{arrayQuestions[0].category}</h1>
            <h1 data-testid="question-text">{arrayQuestions[0].question}</h1>
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
