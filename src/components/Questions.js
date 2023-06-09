import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Questions.css';
import { connect } from 'react-redux';
import { handleAction, SCORE_OPERATION } from '../redux/actions';
import timerDuotone from '../Images/timer-duotone.png';

class Questions extends Component {
  state = {
    arrayQuestions: [],
    answered: false,
    currentTime: 30,
    isDisable: false,
    randomQuestion: [],
    indexNext: 0,
  };

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
    this.allAnswers(data.results);
    setInterval(() => this.timer(), time);
  }

  allAnswers = (arrayQuestions) => {
    const { indexNext } = this.state;
    if (arrayQuestions.length > 0) {
      const correctAnswer = {
        dataTestId: 'correct-answer',
        correct: true,
        question: arrayQuestions[indexNext].correct_answer,
        color: 'green',
      };
      const incorrectAnswers = arrayQuestions[indexNext].incorrect_answers
        .map((answer, index) => ({
          dataTestId: `wrong-answer-${index}`,
          correct: false,
          question: answer,
          color: 'red',
        }));
      const mixAnswers = [...incorrectAnswers, correctAnswer];
      const magicNumber = 0.5;
      const randomAnswer = mixAnswers.sort(() => magicNumber - Math.random());
      this.setState({
        randomQuestion: randomAnswer,
      });
    }
  };

  timer = () => {
    const { currentTime, answered } = this.state;
    if (currentTime > 0 && !answered) {
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

  mathOperation = (e) => {
    const sumScore = 10;
    const multiplier = {
      hard: 3, medium: 2, easy: 1,
    };
    const { arrayQuestions, currentTime, indexNext } = this.state;
    const { score } = this.props;
    const level = arrayQuestions[indexNext].difficulty;
    const operation = sumScore + (currentTime * multiplier[level]);
    const answerClicked = e.target.value;
    if (answerClicked === 'true') {
      const { dispatch } = this.props;
      dispatch(handleAction(SCORE_OPERATION, score + operation));
    }
  };

  changeColorBtn = (e) => {
    this.mathOperation(e);
    this.setState({
      answered: true,
    });
    clearInterval(this.timer);
  };

  nextQuestion = () => {
    const { history } = this.props;
    const { arrayQuestions, indexNext } = this.state;
    this.setState((prevState) => ({
      indexNext: prevState.indexNext + 1,
      answered: false,
      isDisable: false,
      currentTime: 30,
    }), () => this.allAnswers(arrayQuestions));
    if (indexNext === arrayQuestions.length - 1) {
      history.push('/feedback');
    }
  };

  render() {
    const { arrayQuestions, answered, currentTime,
      isDisable, randomQuestion, indexNext } = this.state;
    if (currentTime === 0) {
      clearInterval(this.timer);
    }
    return (
      <div className="mainContainer">
        {arrayQuestions.length > 0 && (
          <>
            <div className="containerQuestion">
              <div className="questionYellowBox">
                <h1 data-testid="question-category">
                  {arrayQuestions[indexNext].category}
                </h1>
              </div>
              <div className="questionTimerContainer">
                <div>
                  <p data-testid="question-text">
                    {arrayQuestions[indexNext].question}
                  </p>
                </div>
                <div className="timer">
                  <img src={ timerDuotone } alt="time left" />
                  { currentTime }
                </div>
              </div>
            </div>
            <div className="containerLeftSide">
              <div data-testid="answer-options" className="containerAnswers">
                <div className="buttonsAnswer">
                  {randomQuestion.map((answer) => (
                    <button
                      key={ answer.question }
                      className={ answered ? answer.color : 'default' }
                      data-testid={ answer.dataTestId }
                      value={ answer.correct }
                      onClick={ (e) => this.changeColorBtn(e) }
                      disabled={ isDisable }
                    >
                      {answer.question}
                    </button>
                  ))}
                </div>
              </div>
              <div className="nextBtnContainer">
                {
                  answered && (
                    <button
                      data-testid="btn-next"
                      onClick={ () => this.nextQuestion() }
                      className="nextBtn"
                    >
                      Next
                    </button>
                  )
                }
              </div>
            </div>
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
  dispatch: PropTypes.func,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  score: state.player.score,
});

export default connect(mapStateToProps)(Questions);
