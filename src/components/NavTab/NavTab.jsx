import "./NavTab.css";

function NavTab () {
    
    return (
        <section className="nav-promo">
            <nav className="nav-promo__comtainer">
                <a href="#about-project" className="nav__promo__link">О проекте</a>
                <a href="#techs" className="nav__promo__link">Технологии</a>
                <a href="#about-me" className="nav__promo__link">Студент</a>
            </nav>
        </section>
    );
}

export default NavTab;
