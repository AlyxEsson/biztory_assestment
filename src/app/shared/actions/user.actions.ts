import { Action, createAction, props } from '@ngrx/store';
import { UserModel } from '../models/user.model';
import { UserReturn } from '../models/user.return.model';



export enum UserActionTypes {
    GET_USER_LIST = '[USER] Get User List',
    GET_USER_LIST_SUCCESS = '[USER] Get User List Success',
    GET_USER_LIST_FAIL = '[USER] Get User List Fail',
    GET_USER_LIST_NEXT = '[USER] Get User List Next',
    GET_USER_LIST_PREV = '[USER] Get User List Previous',

    GET_USER = '[USER] Get User',
    GET_USER_SUCCESS = '[USER] Get User Success',
    GET_USER_FAIL = '[USER] Get User Fail',

    ADD_USER = '[USER] Add User',
    ADD_USER_SUCCESS = '[USER] Add User Success',
    ADD_USER_FAIL = '[USER] Add User Fail',


    DELETE_USER = '[USER] Delete User',
    DELETE_USER_SUCCESS = '[USER] Delete User Success',
    DELETE_USER_FAIL = '[USER] Delete User Fail',

    UPDATE_USER = '[USER] Update User',
    UPDATE_USER_SUCCESS = '[USER] Update User Success',
    UPDATE_USER_FAIL = '[USER] Update User Fail',
}

export const GetUserList = createAction(UserActionTypes.GET_USER_LIST);
export const GetUserListNext = createAction(UserActionTypes.GET_USER_LIST_NEXT);
export const GetUserListPrevious = createAction(UserActionTypes.GET_USER_LIST_PREV);
export const GetUserListSuccess = createAction(UserActionTypes.GET_USER_LIST_SUCCESS, props<UserReturn>());
export const GetUserListFail = createAction(UserActionTypes.GET_USER_LIST_FAIL, props<any>());

export const GetUser = createAction(UserActionTypes.GET_USER, props<{ id: number }>());
export const GetUserSuccess = createAction(UserActionTypes.GET_USER_SUCCESS, props<UserModel>());
export const GetUserFail = createAction(UserActionTypes.GET_USER_FAIL, props<any>());

export const DeleteUser = createAction(UserActionTypes.DELETE_USER, props<{ id: number }>());
export const DeleteUserSuccess = createAction(UserActionTypes.DELETE_USER_SUCCESS, props<{ id: number }>());
export const DeleteUserFail = createAction(UserActionTypes.DELETE_USER_FAIL, props<any>());

export const AddUser = createAction(UserActionTypes.ADD_USER, props<UserModel>());
export const AddUserSuccess = createAction(UserActionTypes.ADD_USER_SUCCESS, props<UserModel>());
export const AddUserFail = createAction(UserActionTypes.ADD_USER_FAIL, props<any>());

export const UpdateUser = createAction(UserActionTypes.UPDATE_USER, props<UserModel>());
export const UpdateUserSuccess = createAction(UserActionTypes.UPDATE_USER_SUCCESS);
export const UpdateUserFail = createAction(UserActionTypes.UPDATE_USER_FAIL, props<any>());