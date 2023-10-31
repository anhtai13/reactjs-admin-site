import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { getStaticResourceUrl } from "./../../utilities/getStaticResource";

const routes = [
  {
    path: "/admin/users",
    title: "Quản lý người dùng",
  },
  {
    path: "/admin/services",
    title: "Quản lý dịch vụ",
  },
  {
    path: "/admin/orders",
    title: "Quản lý đơn hàng",
  },
  {
    path: "/admin/evaluates",
    title: "Quản lý đánh giá",
  },
];

function AdminMenuComponent({ auth }) {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="bg-secondary p-1 pb-5">
      <div className="text-center">
        <img
          src={getStaticResourceUrl(auth.avatar)}
          width="160px"
          alt={(auth.username, auth.avatar)}
        />
        <p className="text-white">{auth.username}</p>
      </div>
      <Nav className="flex-column text-white nav-pills nav-fill">
        {routes.map((route, index) => {
          return (
            <Nav.Link
              key={index}
              className="border border-info text-white"
              as={Link}
              to={route.path}
              active={pathname.match("^" + route.path + ".*")}
            >
              {route.title}
            </Nav.Link>
          );
        })}
      </Nav>
    </div>
  );
}

export default AdminMenuComponent;
