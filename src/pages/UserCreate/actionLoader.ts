import { redirect } from 'react-router-dom';

import { createUser } from '../../api/users';
import { UserCreate as IUserCreate } from '../../types/users';


export async function action({ request }: { request: Request; }) {
    const formData = await request.formData();
    type UserCreateFormData = IUserCreate & { confirmPassword?: string };
    const user = Object.fromEntries(formData) as unknown as UserCreateFormData;
    if (user.password !== user.confirmPassword) {
        throw new Error('As senhas não conferem');
    }
    delete user.confirmPassword;
    await createUser(user);
    return redirect('/users');
}
