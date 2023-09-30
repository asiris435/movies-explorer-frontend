import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import { useEffect, useState } from "react";

function Header ({ name, loggedIn }) {
    const { pathname } = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    function handleClick () {
        if (isOpen) {
            setIsOpen(false);
        } else {
            setIsOpen(true);
        }
    }

    function clickLink () {
        setIsOpen(false);
    }

    useEffect(() => {
        function createBurgerMenu () {
            if (document.documentElement.clientWidth > "767") {
                setIsOpen(false);
                window.removeEventListener("resize", createBurgerMenu);
            }
        }
            if (isOpen) {
                window.addEventListener("resize", createBurgerMenu);
                return () => window.removeEventListener("resize", createBurgerMenu);
            }
    }, [isOpen]);

    return (
        <header className={`header ${name !== "homepage" ? "header__pages" : ""}`}>
            <div>
                <Link to={"/"} className="header__home-link"></Link>
            </div>
            {name === "homepage" && !loggedIn ?
                <nav>
                    <ul className="header__links-container">
                        <li>
                            <Link to={"/signup"} className="header__signup">Регистрация</Link>
                        </li>
                        <li>
                            <Link to={"/signin"} className="header__signin">Войти</Link>
                        </li>
                    </ul>
                </nav>
                :
                <>
                    <nav className={`header__nav ${isOpen ? "header__nav_open-menu" : ""}`}>
                        <ul className="header__links-container header__links-container_type_page">
                            <li className="header__link-container">
                                <Link 
                                to={"/"}
                                className={`header__links ${pathname === "/" ? "header__links_active" : ""}`}
                                onClick={clickLink}
                                >Главная</Link>
                            </li>
                            <li className="header__link-container">
                                <Link 
                                to={"/movies"}
                                className={`header__links ${pathname === "/movies" ? "header__links_active" : ""}`}
                                onClick={clickLink}
                                >Фильмы</Link>
                            </li>
                            <li className="header__link-container">
                                <Link 
                                to={"/saved-movies"}
                                className={`header__links ${pathname === "/saved-movies" ? "header__links_active" : ""}`}
                                onClick={clickLink}
                                >Сохранённые фильмы</Link>
                            </li>
                            <li className="header__link-container">
                                <Link
                                to={"/profile"}
                                className={`header__links header__links_type_profile ${pathname === "/profile" ? "header__links_active" : ""}`}
                                onClick={clickLink}
                                >Аккаунт <div className="header__profile-icon"></div></Link>
                            </li>
                        </ul>
                        <button type="button" className="header__menu-close" onClick={handleClick}></button>
                    </nav>
                    <button type="button" className="header__menu" onClick={handleClick}></button>
                </>
            }
            
        </header>
    );
}

export default Header;
