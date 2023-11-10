import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import ServiceForm from "../../components/services/ServiceForm";
import serviceApi from "../../../apis/service.api";
import { useEffect } from "react";

function ServiceEdit() {
  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {}, []);
  const handleUpdate = (service) => {
    serviceApi
      .updateService(id, service)
      .then(() => {
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
      <h1>Chỉnh sửa thông tin dịch vụ</h1>
      <ServiceForm
        ServiceId={id}
        onSubmit={handleUpdate}
        onCancel={() => navigate("/admin/services")}
      />
    </>
  );
}

export default ServiceEdit;
