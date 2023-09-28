import { useNavigate } from "react-router-dom";
import LoginSection from "../LoginSection/LoginSection";
import Input from "../Input/Input";
import useFormValidation from "../../hooks/useFormValidation";

function Register ({ name, setLoggedIn }) {
    const navigate = useNavigate();
    const { values, errors, isInputValid, isValid, handleChange } = useFormValidation();

    function onLogin (evt) {
        evt.preventDefault();
        navigate("/signin");
        setLoggedIn(true);
    }

    return (
        <LoginSection name={name} onLogin={onLogin} isValid={isValid}>
            <Input
                name="username"
                type="text"
                title="Имя"
                minLength="2"
                value={values.username}
                isInputValid={isInputValid.username}
                error={errors.username}
                onChange={handleChange}
                placeholder="Введите имя"
            />
            <Input 
                name="email"
                type="email"
                title="E-mail"
                value={values.email}
                isInputValid={isInputValid.email}
                error={errors.email}
                onChange={handleChange}
                placeholder="Введите E-mail"
            />
            <Input
                name="password"
                type="password"
                title="Пароль"
                minLength="3"
                value={values.password}
                isInputValid={isInputValid.password}
                error={errors.password}
                onChange={handleChange}
                placeholder="Введите пароль"
            />
        </LoginSection>
    );
}

export default Register;
