import { useNavigate } from "react-router-dom";
import UserForm from "../../components/users/UserForm";

import userApi from "../../../apis/user.api";

function UserCreate() {
  const navigate = useNavigate();

  const handleAdd = (user) => {
    userApi
      .createUser(user)
      .then((response) => {
        navigate("/admin/users");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert(error.response.statusText);
          navigate("/admin/login");
        } else {
          alert(error.response.statusText);
        }
      });
  };

  return (
    <>
      <h1>Thêm mới người dùng</h1>
      <UserForm
        onSubmit={handleAdd}
        onCancel={() => navigate("/admin/users")}
      />
    </>
  );
}

export default UserCreate;
