import { logOut, setCredentials } from './auth';
import { apiSlice } from '../../ApiSlice';

interface RegisterUser {
  name: string;
  email: string;
  password: string;
}
interface LoginUser {
  email: string;
  password: string;
}
/* interface User {
  id: string | null,
  name: string | null,
  email: string | null,
  password: string | null,
  refreshToken: string | null,
  provider: string | null,
  providerId: string | null,
  verified: boolean | null,
  photo: string | null;
} */
interface UserState {
  id: string | null,
  name: string | null,
  email: string | null,
  password: string | null,
  photo: string | null;
}
interface LoginResponse {
  accessToken: string;
  user: UserState;
}

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    registerUser: builder.mutation<any, RegisterUser>({
      query: (credentials: RegisterUser) => ({
        url: 'auth/register',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          
          if (data && data.accessToken) {
            dispatch(setCredentials({ accessToken: data.accessToken, newUser: data.user }));
          }
        } catch (error) {
          console.error('Register failed:', error);
        }
      },
    }),
    sendCode: builder.mutation<LoginResponse, string>({
      query: (email: string) => ({
        url: 'verify/send-code',
        method: 'POST',
        body: {email},
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
        } catch (error) {
          console.error('Couldnt send the code to your email:', error);
        }
      },
    }),
    verifyCode: builder.mutation<any, any>({
      query: (EmailAndCode: any) => ({
        url: 'verify/verify-code',
        method: 'POST',
        body: EmailAndCode,
      }),
      async onQueryStarted(_arg, {dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);

          if (data && data.accessToken) {
            dispatch(setCredentials({ accessToken: data.accessToken, newUser: data.user }));
          }

        } catch (error) {
          console.error('Couldnt Verify Your code:', error);
        }
      },
    }),
    loginUser: builder.mutation<any, LoginUser>({
      query: (credentials: LoginUser) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data && data.accessToken) {
            dispatch(setCredentials({ accessToken: data.accessToken, newUser: data.user }));
          }
        } catch (error) {
          console.error('Login failed:', error);
        }
      },
    }),
    googleAuth: builder.mutation<any, void>({
      query: () => ({
        url: 'social/google',
        method: 'GET',
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data && data.accessToken) {
            dispatch(setCredentials({ accessToken: data.accessToken, newUser: data.user }));
          } else {
            console.error('Google login failed: No access token found');
          }
        } catch (error) {
          console.error('Login With Google failed:', error);
        }
      },
    }),
    sendLogOut: builder.mutation<void, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logOut());
          dispatch(authApi.util.resetApiState());
        } catch (err) {
          console.error('Logout failed:', err);
        }
      },
    }),
    refresh: builder.mutation<void, void>({
      query: () => ({
        url: 'auth/refresh',
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useRegisterUserMutation, useSendCodeMutation, useVerifyCodeMutation, useLoginUserMutation, useGoogleAuthMutation, useSendLogOutMutation, useRefreshMutation } = authApi;
