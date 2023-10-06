import Form from "../Form/Form";
import "./Profile.css";
import useFormValidation from "../../hooks/useFormValidation";
import { useContext, useEffect } from "react";
import Input from "../Input/Input";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { EmailRegex } from "../../utils/constants";

function Profile ({ name, outLogin, editUserProfile, setIsError, isSuccess, setSuccess, isEdit, setIsEdit }) {
    const currentUser = useContext(CurrentUserContext);
    const { values, errors, isInputValid, isValid, handleChange, reset } = useFormValidation();

    function onSubmit (evt) {
        evt.preventDefault();
        editUserProfile(values.username, values.email);
    }

    useEffect(() => {
        reset({ username: currentUser.name, email: currentUser.email })
    }, [reset, currentUser, isEdit]);

    return (
        <section aria-label="profile" className="profile">
            <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
            <Form
                name={name}
                isValid={isValid}
                onSubmit={onSubmit}
                setIsError={setIsError}
                values={values}
                isSuccess={isSuccess}
                setSuccess={setSuccess}
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
                    type="email"
                    title="E-mail"
                    value={values.email}
                    isInputValid={isInputValid.email}
                    error={errors.email}
                    onChange={handleChange}
                    pattern={EmailRegex}
                    isEdit={isEdit}
                />
            </Form>
            <Link to={"/"} onClick={outLogin} className={`profile__link ${!isEdit ? "" : "profile__link_hidden"}`}>Выйти из аккаунта</Link>
        </section>
    );
}

export default Profile;
