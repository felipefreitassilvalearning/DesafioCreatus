import { redirect } from "react-router-dom";

import { getToken } from "../../utils/tokenHelper";
import { authenticate } from "../../api/auth";
import { readUsers } from "../../api/users";
import { User } from "../../types/users";


export async function loader({ request }: { request: Request; }) {
    const userToken = getToken();
    if (!userToken) {
        return redirect("/login");
    }
    try {
        await authenticate(userToken);
    } catch (error) {
        return redirect("/login");
    }

    const url = new URL(request.url);
    const query = url.searchParams.get("query");
    const orderBy = url.searchParams.get("orderBy") as keyof User | null;
    const users = await readUsers(query, orderBy);
    return { users, query, orderBy };
}
