/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest } from 'redux-saga/effects';

import { RESPONSE_CODE, SUBMIT } from './constants';

function* apiFetch(url, method = 'POST', data) {
  const headers = {
    Accept: '*/*',
    'Content-Type': 'application/json',
  };
  const body = data;
  const params = { headers, method, body };
  const response = yield call(fetch, url, params);
  const { status } = response;
  if (status) {
    yield put({ type: RESPONSE_CODE, responseCode: status });
  }
  return yield response.json();
}

export function* apiPost(url, body) {
  return yield apiFetch(url, 'POST', body);
}

export function* getAuth(action) {
  const url = `http://ec2-18-117-84-227.us-east-2.compute.amazonaws.com:3000/${
    action.dataPost.submitKind
  }`;
  const body = {
    login: action.dataPost.login,
    password: action.dataPost.password,
    ...(action.dataPost.submitKind === 'register' && {
      email: action.dataPost.email,
    }),
  };
  try {
    yield call(apiPost, url, JSON.stringify(body));
  } catch (err) {
    console.log('error', err);
  }
}

export default function* githubData() {
  yield takeLatest(SUBMIT, getAuth);
}
