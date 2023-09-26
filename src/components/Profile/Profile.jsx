import Form from "../Form/Form";
import "./Profile.css";
import useFormValidation from "../../hooks/useFormValidation";
import { useEffect } from "react";
import Input from "../Input/Input";
import { Link } from "react-router-dom";

function Profile ({ name, setLoggedIn }) {
    const { values, errors, isInputValid, isValid, handleChange, reset } = useFormValidation();

    function onEditProfile (evt) {
        evt.preventDefault();
    }

    function outLogin () {
        setLoggedIn(false);
    }

    useEffect(() => {
        reset({username: "Виталий", email: "pochta@yandex.ru"})
    }, [reset]);

    return (
        <section className="profile">
            <h2 className="profile__title">{`Привет, Виталий!`}</h2>
            <Form
                name={name}
                isValid={isValid}
                onSubmit={onEditProfile}
            >
                <Input 
                    selectname={name}
                    name="username"
                    type="text"
                    title="Имя"
                    minLength="3"
                    value={values.username}
                    isInputValid={isInputValid.username}
                    error={errors.username}
                    onChange={handleChange}
                />
                <Input 
                    selectname={name}
                    name="email"
                    type="text"
                    title="E-mail"
                    value={values.email}
                    isInputValid={isInputValid.email}
                    error={errors.email}
                    onChange={handleChange}
                />
            </Form>
            <Link to={"/"} onClick={outLogin} className="profile__link">Выйти из аккаунта</Link>
        </section>
    );
}

export default Profile;
