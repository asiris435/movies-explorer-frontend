import "./Input.css";
import SendingContext from "../../contexts/SendingContext";
import { useContext } from "react";

function Input ({ selectname, name, type, title, minLength, value, isInputValid, error, onChange, placeholder, isEdit, pattern }) {
    const isSending = useContext(SendingContext);

    return (
        <>
            {selectname !== "profile" ? 
                <label className="login__label">
                    <span className="login__subtitle">{title}</span>
                    <input 
                        required
                        type={type}
                        name={name}
                        minLength={minLength || ""}
                        className={`login__input ${isInputValid === undefined || isInputValid ? "" : "login__input_invalid"}`}
                        value={value || ""}
                        onChange={onChange}
                        placeholder={placeholder}
                        disabled={isSending}
                        pattern={pattern}
                    />
                    <span className="login__error">{error}</span>
                </label>
                :
                <>
                <label className="profile__label">
                    <span className="profile__subtitle">{title}</span>
                    <input
                        required
                        type={type}
                        name={name}
                        minLength={minLength || ""}
                        className={`profile__input ${isInputValid === undefined || isInputValid ? "" : "profile__input_invalid"}`}
                        value={value || ""}
                        onChange={onChange}
                        disabled={!isEdit || isSending}
                        pattern={pattern}
                    />
                </label>
                <span className={`profile__error ${name === "username" ? "profile__error_type_name" : ""}`}>{error}</span>
                </>
            }
        </>
    );
}

export default Input;
