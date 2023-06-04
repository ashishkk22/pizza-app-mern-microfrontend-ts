const errorMsg =
  'Password must contain 8 characters, One uppercase, One lowercase, One number and One special case character';
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;

export function validateChangePass(values: {
  oldCredential: string;
  newCredential: string;
  confirmNewCredential: string;
}) {
  return {
    oldCredential: passwordRegex.test(values.oldCredential) ? null : errorMsg,
    newCredential: passwordRegex.test(values.newCredential) ? null : errorMsg,
    confirmNewCredential:
      values.newCredential === values.confirmNewCredential &&
      values.confirmNewCredential
        ? null
        : 'Confirm password must match with above password !',
  };
}
