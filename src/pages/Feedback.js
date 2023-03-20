import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { userAssertions } = this.props;
    const three = 3;
    return (
      <div>
        <Header />
        { userAssertions <= three ? (
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userAssertions: state.player.assertions,
});

Feedback.propTypes = {
  userAssertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
