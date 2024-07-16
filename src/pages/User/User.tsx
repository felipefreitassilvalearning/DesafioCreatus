import { useLoaderData, useNavigate } from "react-router-dom";

import styles from './User.module.scss'
import { User as IUser } from '../../types/users'


function User() {
    const navigate = useNavigate()
    const { user } = useLoaderData() as { user: IUser };
    const hiddenUserFields = ["id"];
    const userDetails = Object.entries(user).filter(([key]) => !hiddenUserFields.includes(key));
    const userInitials = (() => {
        const [firstName, ...otherNames] = user.name.split(" ");
        const lastName = otherNames.pop();
        if (lastName) {
            return `${firstName.charAt(0)}${lastName.charAt(0)}`;
        }
        return firstName.charAt(0);
    })()
    const toUpperCase = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

    return (
        <div className="wrapper">
            <div className={styles.header}>
                <div className={styles.name}>
                    <span className={styles.profilePicture}>
                        {userInitials}
                    </span>
                    {/* <img
                        src=""
                        alt="User Profile Picture"
                        className={styles.profilePicture}
                    /> */}
                    <h3>{user.name}</h3>
                </div>
                <div className={styles.action}>
                    <button onClick={() => { navigate("/users") }}>Voltar para tabela</button>
                </div>
            </div>
            <div className={styles.content}>
                <h4>Informações</h4>
                <div className={styles.userDetails}>
                    {userDetails.map(([key, value]) => (
                        <div key={key} className={styles.userDetail}>
                            <label>{toUpperCase(key)}</label>
                            <input readOnly value={value} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default User
