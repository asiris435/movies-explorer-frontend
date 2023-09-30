import "./Form.css";

function Form ({ name, children, isValid, onSubmit, isEdit, setIsEdit }) {
    
    function clickProfileButton (evt) {
        evt.preventDefault();
        setIsEdit(true);
    }

    return (
        <form noValidate name={name} onSubmit={onSubmit}>
            {children}
            {name === "signup" ?
                <>
                    <span className="login__request-error">{"При регистрации пользователя произошла ошибка."}</span>
                    <button
                        type="submit"
                        className={`login__button ${isValid ? "" : "login__button_disabled"}`}
                        disabled={!isValid}
                    >{"Зарегистрироваться"}</button>
                </>
                :
                name === "signin" ?
                <>
                    <span className="login__request-error login__request-error_type_login">{"При авторизации произошла ошибка."}</span>
                    <button type="submit" className={`login__button ${isValid ? "" : "login__button_disabled"}`}>Войти</button>
                </>
                :
                !isEdit ?
                <>
                    <span className="profile__request-error">{"При обновлении профиля произошла ошибка."}</span>
                    <button 
                        type="submit"
                        className={`profile__button`}
                        onClick={clickProfileButton}
                    >{"Редактировать"}</button>
                </> 
                :
                <>
                    <span className="profile__request-error">{"При обновлении профиля произошла ошибка."}</span>
                    <button 
                        type="submit"
                        className={`login__button ${isValid ? "" : "login__button_disabled"}`}
                    >{"Сохранить"}</button>
                </>
            }
        </form> 
    );
}

export default Form;
