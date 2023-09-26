import "./Input.css";

function Input ({ selectname, name, type, title, minLength, value, isInputValid, error, onChange }) {
    return (
        <>
            {selectname !== "profile" ? 
                <label className="label__login">
                    <span className="subtitle__login">{title}</span>
                    <input 
                        required
                        type={type}
                        name={name}
                        minLength={minLength || ""}
                        className={`input__login ${isInputValid === undefined || isInputValid ? "" : "input__login_invalid"}`}
                        value={value || ""}
                        onChange={onChange}
                    />
                    <span className="error__login">{error}</span>
                </label>
                :
                <>
                <label className="label__profile">
                    <span className="subtitle__profile">{title}</span>
                    <input
                        required
                        type={type}
                        name={name}
                        minLength={minLength || ""}
                        className={`input__profile ${isInputValid === undefined || isInputValid ? "" : "input__profile_invalid"}`}
                        value={value || ""}
                        onChange={onChange}
                    />
                </label>
                <span className={`error__profile ${name === "username" ? "error__profile_type_name" : ""}`}>{error}</span>
                </>
            }
        </>
    );
}

export default Input;
