import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Questions extends Component {
  state = {
    arrayQuestions: [],
  };

  async componentDidMount() {
    const invalidTokenNumber = 3;
    const getToken = localStorage.getItem('token');
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${getToken}`);
    const data = await response.json();
    this.setState({
      arrayQuestions: data.results,
    });
    if (data.response_code === invalidTokenNumber) {
      const { history } = this.props;
      localStorage.removeItem('token');
      history.push('/');
    }
  }

  selectRandomQuestions = () => {
    const { arrayQuestions } = this.state;
    // console.log(arrayQuestions);
    // const numberTest = 0.5;
    const randomButton = Math.floor(Math.random() * arrayQuestions.length);
    const correctAnswers = [arrayQuestions[randomButton].correct_answer];
    // console.log(correctAnswers);
    const incorrectAnswers = [arrayQuestions[randomButton].incorrect_answers];
    // console.log(incorrectAnswers);
    const allAnswers = [...incorrectAnswers[0], correctAnswers[0]];
    console.log(shuffledArray(allAnswers));
    console.log(allAnswers);
    // const shuffledArray = allAnswers.sort();
    return allAnswers;
  };

  render() {
    const { arrayQuestions } = this.state;

    return (
      <div>
        {arrayQuestions.length > 0 && (
          <>
            <h1 data-testid="question-category">{arrayQuestions[0].category}</h1>
            <h1 data-testid="question-text">{arrayQuestions[0].question}</h1>
            {console.log(this.shuffleArray(this.selectRandomQuestions))}
            {/* <h1>
              {this.selectRandomQuestions().map((question, index) => (
                <div key={ index }>
                  <button>{question}</button>
                </div>
              )) }

            </h1> */}
          </>
        )}
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
