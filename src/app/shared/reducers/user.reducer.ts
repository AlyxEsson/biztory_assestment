import { createReducer, on } from "@ngrx/store";
import { AddUser, AddUserFail, AddUserSuccess, DeleteUser, DeleteUserFail, DeleteUserSuccess, GetUser, GetUserFail, GetUserList, GetUserListFail, GetUserListNext, GetUserListPrevious, GetUserListSuccess, GetUserSuccess, UpdateUser, UpdateUserFail, UpdateUserSuccess, UserActionTypes } from "../actions/user.actions";
import { UserModel } from "../models/user.model";

export interface UserState {
    page: number,
    total_page: number,
    total: number,
    users: UserModel[],
    loading: boolean,
    error: string | any,
    selectedUser: UserModel | undefined,
}

const initialState: UserState = {
    page: 1,
    total_page: 0,
    total: 0,
    users: [],
    loading: false,
    error: '',
    selectedUser: undefined

}

export const userActionReducer = createReducer(
    initialState,
    on(GetUserList, GetUserListNext, GetUserListPrevious, (state) => ({ ...state, loading: true })),
    on(GetUserListNext, (state) => ({ ...state, page: state.page + 1, loading: true })),
    on(GetUserListPrevious, (state) => ({ ...state, page: state.page - 1, loading: true })),
    on(GetUserListSuccess, (state, action) => ({
        ...state, users: action.data as [], page: action.page, total: action.total, total_pages: action.total_pages, currentloading: false, loading: false,
    })),
    on(GetUserListFail, (state, err) => ({ ...state, loading: false, error: err })),
    on(DeleteUser, ((state) => ({ ...state, loading: true }))),
    on(DeleteUserSuccess, ((state, props) => ({ ...state, users: [...state.users.filter(user => user.id != props.id)], loading: false }))),
    on(DeleteUserFail, ((state, err) => ({ ...state, loading: false, error: err }))),

    on(AddUser, ((state) => ({ ...state, loading: true }))),
    on(AddUserSuccess, ((state, user) => ({ ...state, users: [user, ...state.users], loading: false }))),
    on(AddUserFail, ((state, err) => ({ ...state, error: err, loading: false }))),

    on(GetUser, (state) => ({ ...state, selectedUser: undefined, loading: true })),
    on(GetUserSuccess, (state, user) => ({ ...state, selectedUser: user, loading: false })),
    on(GetUserFail, (state, err) => ({ ...state, error: err, loading: false })),

    on(UpdateUser, (state) => ({ ...state, loading: true })),
    on(UpdateUserSuccess, (state) => ({ ...state, loading: false })),
    on(UpdateUserFail, (state, err) => ({ ...state, error: err, loading: false })),
);
