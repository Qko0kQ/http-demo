import axios from 'axios';

import './index.html';
import './styles.scss';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export function handleClickWithXHR() {
  const route = document.getElementById('route').value;
  const method = document.getElementById('method').value;
  const body = document.getElementById('body').value;

  const xhr = new XMLHttpRequest();
  const url = `${BASE_URL}${route}`;

  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      document.getElementById('result').innerHTML = xhr.responseText;
    }
  };
  xhr.open(method, url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  if (['POST', 'PUT', 'PATCH'].includes(method)) {
    xhr.send(body);
  } else {
    xhr.send(null);
  }
}

export function handleClickWithFetch() {
  const route = document.getElementById('route').value;
  const method = document.getElementById('method').value;
  const body = document.getElementById('body').value;

  const url = `${BASE_URL}${route}`;
  const options = {
    headers: { 'Content-Type': 'application/json' },
    method,
  };

  if (['POST', 'PUT', 'PATCH'].includes(method)) {
    options.body = body;
  }

  fetch(url, options)
    .then(response => response.json())
    .then((json) => {
      document.getElementById('result').innerHTML = JSON.stringify(json);
    });
}

export function handleClickWithAxios() {
  const route = document.getElementById('route').value;
  const method = document.getElementById('method').value;
  const body = document.getElementById('body').value;

  const config = {
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    method,
    url: route,
  };

  if (['POST', 'PUT', 'PATCH'].includes(method)) {
    config.data = JSON.parse(body);
  }

  axios(config)
    .then(response => response.data)
    .then((data) => {
      document.getElementById('result').innerHTML = JSON.stringify(data);
    });
}
