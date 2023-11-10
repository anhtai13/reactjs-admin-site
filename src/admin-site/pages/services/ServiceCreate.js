import { useNavigate } from "react-router-dom";
import ServiceForm from "../../components/services/ServiceForm";
import serviceApi from "../../../apis/service.api";

function ServiceCreate() {
  const navigate = useNavigate();

  const handleAdd = (service) => {
    serviceApi
      .createServices(service)
      .then((response) => {
        navigate("/admin/services");
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
      <ServiceForm
        onSubmit={handleAdd}
        onCancel={() => navigate("/admin/services")}
      />
    </>
  );
}

export default ServiceCreate;
