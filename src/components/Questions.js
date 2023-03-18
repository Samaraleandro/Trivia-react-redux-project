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
    console.log(data);
    this.setState({
      arrayQuestions: data.results,
    });
    if (data.response_code === invalidTokenNumber) {
      const { history } = this.props;
      localStorage.removeItem('token');
      history.push('/');
    }
  }

  // createRandomButtons = (questions) => {
  //   const randomButton = Math.floor(Math.random() * questions.length);
  // };

  render() {
    const { arrayQuestions } = this.state;
    return (
      <div>
        {arrayQuestions.length > 0 && (
          <>
            <h1 data-testid="question-category">{arrayQuestions[0].category}</h1>
            <h1 data-testid="question-text">{arrayQuestions[0].question}</h1>
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
