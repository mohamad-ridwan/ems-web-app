import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  user: AuthActions.UserInfo | null;
}

export const initialState: AuthState = {
  user: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { user }) => {
    return {
      ...state,
      user,
    };
  }),
  on(AuthActions.logout, (state) => {
    try {
      localStorage.removeItem('access_token');
    } catch (e) {
      console.error('Failed to clear credentials from localStorage', e);
    }
    return {
      ...state,
      user: null,
    };
  })
);
