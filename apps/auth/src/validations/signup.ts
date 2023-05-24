export function validateSignUp(
  values: {
    name: string;
    email: string;
    credentials: string;
    confirmCredentials: string;
    isLoggedIn: boolean;
    otp: string;
  },
  isOptSent: boolean
) {
  return {
    name:
      values.name.trim().length < 6
        ? 'Username must include at least 6 characters'
        : null,
    email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ? null
      : 'Invalid email',
    credentials:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/.test(
        values.credentials
      )
        ? null
        : 'Password must contain 8 characters, One uppercase, One lowercase, One number and One special case character',
    confirmCredentials:
      values.confirmCredentials === values.credentials &&
      values.confirmCredentials
        ? null
        : 'Confirm password must match with above password !',
    otp: isOptSent
      ? /^[0-9]{6}$/.test(values.otp)
        ? null
        : 'Enter valid 6 digit unique otp'
      : null,
  };
}
