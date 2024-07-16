import { authenticate } from "../../api/auth";
import { getToken } from "../../tokenHelper"


export async function loader() {
    const userToken = getToken();
    if (!userToken) {
        return { isAuthenticated: false };
    }
    try {
        await authenticate(userToken);
        return { isAuthenticated: true };
    } catch (error) {
        return { isAuthenticated: false };
    }
}
