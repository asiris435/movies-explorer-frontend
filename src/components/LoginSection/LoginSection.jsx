import { Link } from "react-router-dom";
import "./LoginSection.css";
import Form from "../Form/Form";

function LoginSection ({ name, children, isValid, onSubmit }) {
    return (
        <section className="login">
            <Link to={"/"} className="login__link-home"></Link>
            <h2 className="login__title">{name === "signup" ? "Добро пожаловать!" : "Рады видеть!"}</h2>
            <Form name={name} isValid={isValid} onSubmit={onSubmit}>
                {children}
            </Form>
            {name === "signup" ?
                <p className="login__text">Уже зарегистрированы? <Link to={"/signin"} className="login__link">Войти</Link></p>
                : name === "signin" ?
                <p className="login__text">Ещё не зарегистрированы? <Link to={"/signup"} className="login__link">Регистрация</Link></p>
                : 
                <Link to={"/"}>Выйти из аккаунта</Link>
            }
        </section>
    );
}

export default LoginSection;
