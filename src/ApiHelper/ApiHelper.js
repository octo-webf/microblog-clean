/* eslint import/prefer-default-export : 0 */
export function fetchMessages() {
  return fetch('https://skool-microblog.herokuapp.com/messages')
    .then(response => response.json());
}
