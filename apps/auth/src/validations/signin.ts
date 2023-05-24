export function validateSignIn(values: { email: string; credentials: string }) {
  return {
    email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ? null
      : 'Invalid email',
    credentials:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/.test(
        values.credentials
      )
        ? null
        : 'Password must contain 8 characters, One uppercase, One lowercase, One number and One special case character',
  };
}
