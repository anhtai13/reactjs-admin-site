import { Button } from "react-bootstrap"
import { Link } from "react-router-dom";

function AdminHomePage() {
    return (
        <>
            <div>AdminHomePage</div>

            <Link to="/">
                <Button variant="warning">Trang dành cho khách hàng</Button>
            </Link>
        </>
    );
};

export default AdminHomePage;
