import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

function loggedIn() {
  return window.localStorage.getItem('name');
}

export default function AuthenticatedRoute({ children }) {
  return loggedIn() ? children : (<Redirect to="/login" />);
}

AuthenticatedRoute.propTypes = {
  children: PropTypes.element.isRequired,
};