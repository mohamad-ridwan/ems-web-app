import { createAction, props } from '@ngrx/store';

export interface UserInfo {
  username: string;
  group: string;
}

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: UserInfo }>()
);

export const logout = createAction('[Auth] Logout');
