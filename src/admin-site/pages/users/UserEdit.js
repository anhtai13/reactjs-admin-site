import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import UserForm from "../../components/users/UserForm";

import userApi from "../../../apis/user.api";

function UserEdit() {
  const navigate = useNavigate();

  const { id } = useParams();

  const handleUpdate = (user) => {
    userApi
      .updateUser(Number(id), user)
      .then(() => {
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
      <h1>Chỉnh sửa thông tin người dùng</h1>
      <UserForm
        userId={Number(id)}
        onSubmit={handleUpdate}
        onCancel={() => navigate("/admin/users")}
      />
    </>
  );
}

export default UserEdit;
