import React, { Component } from 'react';
import axios from 'axios';
import keys from '../config/keys';
import ReactLoading from 'react-loading';

export const PolularLinks = props => {
  let languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];
  return (
    <div>
      <ul className="popular-links">
        {languages.map(language => {
          return (
            <li
              key={language}
              onClick={() => props.languageSelect(language)}
              style={language === props.selected ? { color: '#d0021b' } : null}
            >
              {language}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const PopularRepos = props => {
  return (
    <ul className="popular-list">
      {props.repos.map(function(repo, index) {
        return (
          <li key={repo.name} className="popular-item">
            <div className="popular-rank">#{index + 1}</div>
            <ul className="space-list-items">
              <li>
                <img
                  className="avatar"
                  src={repo.owner.avatar_url}
                  alt={'Avatar for ' + repo.owner.login}
                />
              </li>
              <li>
                <a href={repo.html_url}>{repo.name}</a>
              </li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
          </li>
        );
      })}
    </ul>
  );
};

export default class Popular extends Component {
  state = {
    languageSelected: 'All',
    repos: null
  };

  componentDidMount() {
    this.onSelectHandler(this.state.languageSelected);
  }

  onSelectHandler = language => {
    this.setState({
      languageSelected: language,
      repos: null
    });
    const id = keys.github_clientId;
    const sec = keys.github_clientSecret;
    const params = '?client_id=' + id + '&client_secret=' + sec;
    const url = window.encodeURI(
      'https://api.github.com/search/repositories?q=stars:>1+language:' +
        language +
        '&sort=stars&order=desc&type=Repositories' +
        params
    );
    axios.get(url).then(response => {
      this.setState({
        repos: response.data.items
      });
    });
  };

  render() {
    return (
      <div>
        <PolularLinks
          languageSelect={this.onSelectHandler}
          selected={this.state.languageSelected}
        />
        {!this.state.repos ? (
          <ReactLoading type='bubbles' color='#ff4500' height={367} width={375}  style={{textAlign: 'center'}}/>
        ) : (
          <PopularRepos repos={this.state.repos} />
        )}
      </div>
    );
  }
}
