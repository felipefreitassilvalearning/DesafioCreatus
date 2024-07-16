import { redirect } from "react-router-dom";

import { authenticate } from "../../api/auth";
import { readUser } from "../../api/users";
import { getToken } from "../../tokenHelper";


export async function loader({ params }: { params: { userId: string } }) {
    const userToken = getToken();
    if (!userToken) {
        return redirect("/login");
    }
    try {
        await authenticate(userToken);
    } catch (error) {
        return redirect("/login");
    }

    const user = await readUser(params.userId);
    if (!user) {
        throw new Response("", {
            status: 404,
            statusText: "User Not Found",
        });
    }
    return { user };
}
