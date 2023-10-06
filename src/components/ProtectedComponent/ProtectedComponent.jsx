import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Main from "../Main/Main";

function ProtectedComponent ({ ...props }) {
    return (
        <>
            <Header />
            <Main {...props} />
            <Footer />
        </>
    );
}

export default ProtectedComponent;
