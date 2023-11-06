import { useLocation } from "react-router-dom";
import "./Form.css";
import ErrorContext from "../../contexts/ErrorContext";
import { useContext, useEffect } from "react";
import SendingContext from "../../contexts/SendingContext";
import Preloader from "../Preloader/Preloader";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Form ({ name, children, isValid, onSubmit, isEdit, setIsEdit, setIsError, values, isSuccess, setSuccess }) {
    const { pathname } = useLocation();
    const isError = useContext(ErrorContext);
    const isSending = useContext(SendingContext);
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        setIsError(false);
    }, [setIsError, values]);
    
    useEffect(() => {
        if (pathname === "/profile") {
            setSuccess(false);
            setIsEdit(false);
        }
    }, [setSuccess, setIsEdit, pathname]);

    return (
        <form noValidate name={name} onSubmit={onSubmit}>
            {children}
            {name === "signup" ?
                <>
                    <span className={`login__request-error ${isError && "login__request-error_active"}`}
                    >{"При регистрации пользователя произошла ошибка."}</span>
                    <button
                        type="submit"
                        className={`login__button ${isValid && !isError ? "" : "login__button_disabled"}`}
                        disabled={!isValid || isError || isSending}
                    >{isSending ? <Preloader name="button" /> : "Зарегистрироваться"}</button>
                </>
                :
                name === "signin" ?
                <>
                    <span className={`login__request-error login__request-error_type_login ${isError && "login__request-error_active"}`}
                    >{"При авторизации произошла ошибка."}</span>
                    <button 
                        type="submit" 
                        className={`login__button ${isValid && !isError ? "" : "login__button_disabled"}`}
                        disabled={!isValid || isError || isSending}
                    >{isSending ? <Preloader name="button" /> : "Войти"}</button>
                </>
                :
                !isEdit ?
                <>
                    <span 
                        className={`profile__request-error ${isError ? "profile__request-error_active" : isSuccess && "profile__request-error_type_success"}`}
                    >{isError ? "При обновлении профиля произошла ошибка." : "Профиль обновлён."}</span>
                    <button 
                        type="submit"
                        className={`profile__button`}
                        onClick={() => {
                            setIsEdit(true);
                            setSuccess(false);
                        }}
                    >{"Редактировать"}</button>
                </> 
                :
                <>
                    <span className={`profile__request-error ${isError ? "profile__request-error_active" : isSuccess && "profile__request-error_type_success"}`}
                    >{isError ? "При обновлении профиля произошла ошибка." : "Профиль обновлён."}</span>
                    <button 
                        type="submit"
                        className={`login__button ${(values.username === currentUser.name && values.email === currentUser.email) || !isValid || isError ? "login__button_disabled" : ""}`}
                        disabled={!isValid || isError || isSending}
                    >{isSending ? <Preloader name="button" /> : "Сохранить"}</button>
                </>
            }
        </form> 
    );
}

export default Form;
