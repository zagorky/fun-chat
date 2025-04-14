export function validateLogin(login: string) {
  const MIN_LENGTH = 4;
  if (!login) {
    return 'Login is required';
  }
  if (login.length < MIN_LENGTH) {
    return 'Login must be at least 4 symbols';
  }
  return '';
}

export function validatePassword(password: string) {
  const MIN_LENGTH = 6;
  if (!password) {
    return 'Password is required';
  }
  if (password.length <= MIN_LENGTH) {
    return 'Password must be at least 6 latin letter';
  }
  if (!/^(?=.*[A-Z])(?=.*\d).+$/.test(password)) {
    return 'Password must include at least 1 number and 1 uppercase letter';
  }
  return '';
}
