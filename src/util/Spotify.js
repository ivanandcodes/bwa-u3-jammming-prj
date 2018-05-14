import React from 'react';

let accessToken;
let ttl;
let tracksArray = [];
const clientId = '4bb3e420c95945ffbd39cca8b9094b84';
const siteURL = 'http://localhost:3000/';

const apiURL = 'https://api.spotify.com/v1';
const headers = { headers: { Authorization: `Bearer ${accessToken}` } };
export default Spotify;

export const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return new Promise(resolve => resolve(accessToken));
    }
    else {
      let temp = window.location.href.match(/access_token=([^&]*)/);
      if (temp) {
        accessToken = temp[1];
        temp = window.location.href.match(/expires_in=([^&]*)/);
        ttl = temp[1];
        window.setTimeout(() => accessToken = '', ttl * 1000);
        window.history.pushState('Access Token', null, '/');
      }
      else {
        const scope = 'user-read-private playlist-modify-public';
        const redirectUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${siteURL}&scope=${scope}&response_type=token`;
        window.location = redirectUrl;
      }
    }
  },
