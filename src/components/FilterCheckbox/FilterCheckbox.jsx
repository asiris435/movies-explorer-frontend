import "./FilterCheckbox.css";

function FilterCheckbox ({ isChecked, changeShortFilm }) {
    return (
        <label className="search__label-container">
            <div className="search__checkbox-container">
                <input type="checkbox" className="search__checkbox-input" onChange={() => changeShortFilm()} />
                <svg className="search__checkbox-svg" width="36" height="20" viewBox="0 0 36 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="smalltumb">
                        <rect
                        className={`search__checkbox-svg-rect ${!isChecked ? "search__checkbox-svg-rect_active" : ""}`}
                        id="tumb__COLOR:tumbler-on" width="36" height="20" rx="10" fill="#2BE080"
                        />
                        <circle
                        className={`search__checkbox-svg-circle ${!isChecked ? "search__checkbox-svg-circle_active" : ""}`}
                        id="tumb__COLOR:tumbler-on-2" cx="26" cy="10" r="8" fill="white"
                        />
                    </g>
                </svg>
            </div>
            <span className="search__checkbox-text">Короткометражки</span>
        </label>
    );
}

export default FilterCheckbox;
