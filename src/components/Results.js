import React, { Component } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import keys from '../config/keys';
import {Link} from 'react-router-dom';
import PlayerPreview from './PlayerPreview';
import qs from 'qs';

export const Profile = (props) => {
  const info = props.info
  return (
    <PlayerPreview username={info.login} avatar={info.avatar_url}>
      <ul className='space-list-items'>
        {info.name && <li>{info.name}</li>}
        {info.location && <li>{info.location}</li>}
        {info.company && <li>{info.company}</li>}
        <li>Followers: {info.followers}</li>
        <li>Following: {info.following}</li>
        <li>Public Repos: {info.public_repos}</li>
        {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
      </ul>
    </PlayerPreview>
  )
}


export const Player = (props) => {
  return (
    <div>
    <h1 className='header'>{props.label}</h1>
    <h3 style={{textAlign: 'center'}}>Score: {props.score}</h3>
    <Profile info={props.profile} />
  </div>
  )
}



export default class Results extends Component {
  state = {
    winner: null,
    loser: null,
    error: null,
    loading: true,
    id: keys.github_clientId,
    sec: keys.github_clientSecret,
    params: '?client_id=' + this.id + '&client_secret=' + this.sec
  };

  getProfile = username => {
    return axios
      .get('https://api.github.com/users/' + username + this.state.params)
      .then(function(user) {
        return user.data;
      });
  };

  getRepos = username => {
    return axios.get(
      'https://api.github.com/users/' +
        username +
        '/repos' +
        this.state.params +
        '&per_page=100'
    );
  };

  getStarCount = repos => {
    return repos.data.reduce(function(count, repo) {
      return count + repo.stargazers_count;
    }, 0);
  };

  

  handleError = error => {
    console.warn(error);
    return null;
  };

  calculateScore = (profile, repos) => {
    var followers = profile.followers;
    var totalStars = this.getStarCount(repos);

    return followers * 3 + totalStars;
  };

  getUserData = player => {
    return axios
      .all([this.getProfile(player), this.getRepos(player)])
      .then((data) => {
        var profile = data[0];
        var repos = data[1];
        return {
          profile: profile,
          score: this.calculateScore(profile, repos)
        };
      });
  };

  sortPlayers = players => {
    return players.sort(function(a, b) {
      return b.score - a.score;
    });
  };

  battle = players => {
    return axios
      .all(players.map(this.getUserData))
      .then(this.sortPlayers)
      .catch(this.handleError);
  };

  componentDidMount() {

    const playerNames = qs.parse(
      this.props.history.location.search
    );
    const playerOneNameFixed = playerNames['?playerOneName'].split('?').toString()
    this.battle([playerOneNameFixed, playerNames.playerTwoName]).then(players => {
      if (players === null) {
        return this.setState({
          error:
            'Looks like there was an error. Check that both users exist on Github.',
          loading: false
        });
      }

      this.setState({
        error: null,
        winner: players[0],
        loser: players[1],
        loading: false
      })
    });
  }
  render() {
    const { error, loser, winner, loading } = this.state;

    if (loading === true) {
      return <ReactLoading type='bubbles' color='#ff4500' height={367} width={375}  style={{textAlign: 'center'}}/>
    }

    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to='/battle'>Reset</Link>
        </div>
      )
    }

    return (
      <div className='results-container'>
        <Player
          label='Winner'
          score={winner.score}
          profile={winner.profile}
          className='results-card'
        />
        <Player
          label='Loser'
          score={loser.score}
          profile={loser.profile}
          className='results-card'
        />
      </div>
    );
  }
}
