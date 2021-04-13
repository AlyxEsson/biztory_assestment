import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AddUserFail, AddUserSuccess, DeleteUserFail, DeleteUserSuccess, GetUserFail, GetUserListFail, GetUserListSuccess, GetUserSuccess, UpdateUserFail, UpdateUserSuccess, UserActionTypes } from "../actions/user.actions";
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserService } from "../services/user.service";
import { of } from "rxjs";
import { UserModel } from "../models/user.model";

@Injectable()
export class UserEffect {
    constructor(
        private actions$: Actions,
        private userService: UserService
    ) { }
    getUserList$ = createEffect(() => this.actions$
        .pipe(
            ofType(UserActionTypes.GET_USER_LIST),
            mergeMap(
                () => this.userService.getUsers()
                    .pipe(
                        map(payload => GetUserListSuccess(payload)),
                        catchError(err => of(GetUserListFail(err))),
                    )
            )
        )
    );

    deleteUser$ = createEffect(() => this.actions$
        .pipe(ofType(UserActionTypes.DELETE_USER),
            mergeMap(
                (action: { id: number }) => {
                    console.log('UserEffects.action', action);
                    return this.userService.deleteUser(action.id).pipe(
                        map(payload => {
                            return DeleteUserSuccess({ id: action.id });
                        }),
                        catchError(err => of(DeleteUserFail(err))),
                    )
                }
            )
        )
    )

    addUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActionTypes.ADD_USER),
            mergeMap((user: UserModel) => {
                return this.userService.addUser(user).pipe(
                    map(payload => {
                        console.log('UserEffect.addUser.Success');
                        return AddUserSuccess(user);
                    }),
                    catchError(err => of(AddUserFail(err))),
                );
            })
        )
    })

    getUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActionTypes.GET_USER),
            mergeMap((payload: { id: number }) => {
                return this.userService.getUser(payload.id).pipe(
                    map(payload => {
                        return GetUserSuccess(payload.data as UserModel);
                    }),
                    catchError(err => of(GetUserFail(err))
                    )
                );
            })
        )
    })

    updateUser$ = createEffect(() => {
        console.log('User.Effect.UpdateUser');
        return this.actions$.pipe(ofType(UserActionTypes.UPDATE_USER),
            mergeMap((user: UserModel) => {
                return this.userService.updateUser(user).pipe(
                    map(payload => UpdateUserSuccess()),
                    catchError(err => of(UpdateUserFail(err))
                    )

                );
            }))
    });

}