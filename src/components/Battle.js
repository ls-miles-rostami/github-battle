import React, { Component } from 'react';
import PlayerPreview from './PlayerPreview';
import { Link } from 'react-router-dom';

export default class Battle extends Component {
  state = {
    playerOneText: '',
    playerTwoText: '',
    playerOneImage: null,
    playerTwoImage: null
  };

  onChangeHandler = (id, e) => {
    this.setState({
      [id]: e.target.value
    });
  };

  resetHandler = id => {
    this.setState({
      [id + 'Text']: '',
      [id + 'Image']: null
    });
  };

  onSubmitHandler = (id, e) => {
    e.preventDefault();
    this.setState({
      [id + 'Image']:
        'https://github.com/' + this.state[id + 'Text'] + '.png?size=200'
    });
  };

  render() {
    const {
      playerOneText,
      playerTwoText,
      playerOneImage,
      playerTwoImage
    } = this.state;
    let playerOneInput;
    let playerTwoInput;
    if (playerOneImage !== null) {
      playerOneInput = (
        <PlayerPreview avatar={playerOneImage} username={playerOneText}>
          <h3
            className="reset"
            onClick={this.resetHandler.bind(this, 'playerOne')}
          >
            Reset
          </h3>
        </PlayerPreview>
      );
    } else {
      playerOneInput = (
        <form
          className="battle-form"
          onSubmit={e => this.onSubmitHandler('playerOne', e)}
        >
          <label>Player One</label>
          <input
            placeholder="enter Github username"
            type="text"
            id="playerOneText"
            value={this.state.playerOneText}
            onChange={e => this.onChangeHandler('playerOneText', e)}
          />
          <button
            type="submit"
            disabled={!this.state.playerOneText}
            className="btn"
          >
            enter challenger
          </button>
          <h3 className="reset" onClick={() => this.resetHandler('playerOne')}>
            reset user
          </h3>
        </form>
      );
    }
    if (playerTwoImage !== null) {
      playerTwoInput = (
        <PlayerPreview avatar={playerTwoImage} username={playerTwoText}>
          <h3
            className="reset"
            onClick={this.resetHandler.bind(this, 'playerTwo')}
          >
            Reset
          </h3>
        </PlayerPreview>
      );
    } else {
      playerTwoInput = (
        <form
          className="battle-form"
          onSubmit={e => this.onSubmitHandler('playerTwo', e)}
        >
          <label>Player Two</label>
          <input
            type="text"
            placeholder="enter Github username"
            id="playerTwoText"
            value={this.state.playerTwoText}
            onChange={e => this.onChangeHandler('playerTwoText', e)}
          />
          <button
            type="submit"
            disabled={!this.state.playerTwoText}
            className="btn"
          >
            enter challenger
          </button>
          <h3 className="reset" onClick={() => this.resetHandler('playerTwo')}>
            reset user
          </h3>
        </form>
      );
    }
    return (
      <div className='battle-container'>
        <div className="battle">
          {playerOneInput} {playerTwoInput}
        </div>
      {playerTwoImage && playerOneImage && <Link
          to={{
            pathname: this.props.match.url + '/results',
            search:
              '?playerOneName=' +
              playerOneText +
              '&playerTwoName=' +
              playerTwoText
          }}
          className="btn btn-battle"
        >
          battle
        </Link>}
      </div>
    );
  }
}
