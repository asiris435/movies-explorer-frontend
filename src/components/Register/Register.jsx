import LoginSection from "../LoginSection/LoginSection";
import Input from "../Input/Input";
import useFormValidation from "../../hooks/useFormValidation";
import { EmailRegex } from "../../utils/constants";

function Register ({ name, onRegistration, setIsError }) {
    const { values, errors, isInputValid, isValid, handleChange } = useFormValidation();

    function onSubmit (evt) {
        evt.preventDefault();
        onRegistration(values.username, values.email, values.password);
    }

    return (
        <LoginSection name={name} onSubmit={onSubmit} isValid={isValid} setIsError={setIsError}>
            <Input
                name="username"
                type="text"
                title="Имя"
                minLength="2"
                value={values.username}
                isInputValid={isInputValid.username}
                error={errors.username}
                onChange={(evt) => {
                    handleChange(evt);
                    setIsError(false);
                }}
                placeholder="Введите имя"
            />
            <Input 
                name="email"
                type="email"
                title="E-mail"
                value={values.email}
                isInputValid={isInputValid.email}
                error={errors.email}
                onChange={(evt) => {
                    handleChange(evt);
                    setIsError(false);
                }}
                pattern={EmailRegex}
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
                onChange={(evt) => {
                    handleChange(evt);
                    setIsError(false);
                }}
                placeholder="Введите пароль"
            />
        </LoginSection>
    );
}

export default Register;
