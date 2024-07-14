import { Link, useLoaderData } from "react-router-dom";

import { readUser } from "../api/users";
import { User as IUser } from "../types/users";


export async function loader({ params }: { params: { userId: string } }) {
  const user = await readUser(params.userId);
  if (!user) {
    throw new Response("", {
      status: 404,
      statusText: "User Not Found",
    });
  }
  return { user };
}

function User() {
  const { user } = useLoaderData() as { user: IUser };
  const hiddenUserFields = ["id"];
  const userDetails = Object.entries(user).filter(([key]) => !hiddenUserFields.includes(key));

  return (
    <div className="wrapper">
        <div className="header">
            <div className="name">
                <img src="" alt="User Profile Picture" />
                <h3>{user.name}</h3>
            </div>
            <div className="action">
                <Link to='/users'>Voltar para tabela</Link>
            </div>
        </div>
        <div className="content">
            <h4>Informações</h4>
            <div className="userDetails">
                {userDetails.map(([key, value]) => (
                    <div key={key} className="userDetail">
                        <label>{key}</label>
                        <input readOnly value={value} />
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
}

export default User
