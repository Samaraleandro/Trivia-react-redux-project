import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userAssertions: state.player.assertions,
  userScore: state.player.score,
});

Feedback.propTypes = {
  userAssertions: PropTypes.number,
  userScore: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
