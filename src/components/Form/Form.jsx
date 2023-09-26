import "./Form.css";

function Form ({ name, children, isValid, onSubmit }) {
    return (
        <form noValidate name={name} onSubmit={onSubmit}>
            {children}
            {name === "signup" ?
                <>
                    <span className="login__input-error">{"Ошибка регистрации."}</span>
                    <button
                        type="submit"
                        className={`login__button ${isValid ? "" : "login__button_disabled"}`}
                        disabled={!isValid}
                    >{"Зарегистрироваться"}</button>
                </>
                :
                name === "signin" ?
                <>
                    <span className="login__input-error login__input-error_type_login">{"Ошибка входа."}</span>
                    <button type="submit" className={`login__button ${isValid ? "" : "login__button_disabled"}`}>Войти</button>
                </>
                :
                <>
                    <span className="profile__input-error">{"Ошибка редактирования профиля."}</span>
                    <button type="submit" className="profile__button">{"Редактировать"}</button>
                </> 
            }
        </form> 
    );
}

export default Form;
