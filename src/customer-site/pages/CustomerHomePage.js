import { Button } from "react-bootstrap"
import { Link } from "react-router-dom";

function CustomerHomePage() {
    return (
        <>
            <div>CustomerHomePage</div>

            <Link to="/admin">
                <Button variant="primary">Trang quản trị viên</Button>
            </Link>
        </>
    );
};

export default CustomerHomePage;
