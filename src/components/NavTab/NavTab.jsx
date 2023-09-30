import "./NavTab.css";

function NavTab () {
    
    return (
        <section aria-label="navigation" className="nav-promo">
            <nav className="nav-promo__container">
                <a href="#about-project" className="nav-promo__link">О проекте</a>
                <a href="#techs" className="nav-promo__link">Технологии</a>
                <a href="#about-me" className="nav-promo__link">Студент</a>
            </nav>
        </section>
    );
}

export default NavTab;
