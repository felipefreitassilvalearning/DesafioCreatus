import { redirect } from "react-router-dom";

import { readUser, updateUser } from "../../api/users";
import { UserCreate, UserId } from "../../types/users";


type UserEditParams = {
    params: {
        userId: UserId;
    }
}

export async function action({ request, params }: { request: Request; } & UserEditParams) {
    const formData = await request.formData();
    // type UserEditFormData = IUserCreate & { confirmPassword?: string };
    const updatedUser = Object.fromEntries(formData) as unknown as UserCreate;
    // if (updatedUser.password !== updatedUser.confirmPassword) {
    //     throw new Error('As senhas não conferem');
    // }
    // delete updatedUser.confirmPassword;
    // TODO: Password should be opitonal when editing, as we don't want to update it if it's empty and we don't know the previous password
    updatedUser.password = updatedUser.password ?? "changedByEdit";
    await updateUser(params.userId, updatedUser);
    return redirect('/users');
}

export async function loader({ params }: UserEditParams) {
    const user = await readUser(params.userId);
    return { user };
}
