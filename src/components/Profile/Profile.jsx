import Form from "../Form/Form";
import "./Profile.css";
import useFormValidation from "../../hooks/useFormValidation";
import { useEffect, useState } from "react";
import Input from "../Input/Input";
import { Link } from "react-router-dom";

function Profile ({ name, setLoggedIn }) {
    const { values, errors, isInputValid, isValid, handleChange, reset } = useFormValidation();
    const [isEdit, setIsEdit] = useState(false);

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
        <section aria-label="profile" className="profile">
            <h2 className="profile__title">{`Привет, Виталий!`}</h2>
            <Form
                name={name}
                isValid={isValid}
                onSubmit={onEditProfile}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
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
                    isEdit={isEdit}
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
                    isEdit={isEdit}
                />
            </Form>
            <Link to={"/"} onClick={outLogin} className={`profile__link ${!isEdit ? "" : "profile__link_hidden"}`}>Выйти из аккаунта</Link>
        </section>
    );
}

export default Profile;
