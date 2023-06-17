import { createRequest } from './request';

interface RegisterUserParams {
  email: string;
  username: string;
  password: string;
}

interface RegisterUserResult {
  token: string;
}

const registerUser = createRequest<RegisterUserParams, RegisterUserResult>({
  path: '/user/register',
  method: 'POST'
});

interface LoginUserParams {
  email: string;
  password: string;
}

interface LoginUserResult {
  token: string;
}

const loginUser = createRequest<LoginUserParams, LoginUserResult>({
  path: '/user/login',
  method: 'POST'
});

export { registerUser, loginUser };
