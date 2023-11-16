import { Table, Button, Form, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment/moment";

import AdminPaginationComponent, {
  NUMBER_RECORDS_PER_PAGE,
} from "../../components/table/AdminPaginationComponent";

import serviceApi from "../../../apis/service.api";

const formatCategory = (category) => {
  if (category === 1) {
    return <Badge bg="warning">Giặt thường</Badge>;
  } else if (category === 2) {
    return <Badge bg="success">Hong khô</Badge>;
  } else if (category === 3) {
    return <Badge bg="primary">Giặt tay</Badge>;
  } else if (category === 4) {
    return <Badge bg="info">Giặt giày</Badge>;
  } else if (category === 5) {
    return <Badge bg="secondary">Giặt nhanh</Badge>;
  }
};

function ServiceList() {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [total, setTotal] = useState(0);

  const [searchInputValue, setSearchInputValue] = useState("");

  const [keyword, setKeyword] = useState(null);
  const [page, setPage] = useState(1);

  const [selectedServiceIds, setSelectedServiceIds] = useState([]);

  const fetchServices = () => {
    serviceApi
      .searchServices({
        name: keyword,
        page: page,
        limit: 5,
      })
      .then((data) => {
        setServices(data.records);
        setTotal(data.total);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert(error.response.statusText);
          navigate("/admin/login");
        } else {
          alert(error.response.statusText);
        }
      });

    setSelectedServiceIds([]);
  };

  useEffect(() => {
    fetchServices();
  }, [keyword, page]);

  const handleSearch = (event) => {
    event.preventDefault();
    setKeyword(searchInputValue);
  };

  const handleAdd = () => {
    navigate("/admin/services/new");
  };

  const handleEdit = (id) => {
    navigate(`/admin/services/${id}/edit`);
  };

  const handleBulkDelete = () => {
    const name = services
      .filter(
        (service) =>
          !!selectedServiceIds.find(
            (selectedServiceId) => selectedServiceId === service.service_id
          )
      )
      .map((service) => service.name);

    if (window.confirm(`Bạn có chắc chắn muốn xóa dịch vụ ${name} không ?`)) {
      // TODO
      fetchServices();
    }
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa dịch vụ ${name} không ?`)) {
      serviceApi
        .deleteService(id)
        .then(() => {
          fetchServices();
        })
        .catch((error) => {
          if (error.response.status === 401) {
            alert(error.response.statusText);
            navigate("/admin/login");
          } else {
            alert(error.response.statusText);
          }
        });
    }
  };

  const changeServiceCheckbox = (event) => {
    if (event.target.checked) {
      setSelectedServiceIds([
        ...selectedServiceIds,
        parseInt(event.target.value),
      ]);
    } else {
      const newSelectedServiceIds = selectedServiceIds.filter(
        (selectedServiceId) =>
          selectedServiceId !== parseInt(event.target.value)
      );
      setSelectedServiceIds(newSelectedServiceIds);
    }
  };

  const selectAllServiceIdCheckboxes = (event) => {
    if (event.target.checked) {
      const ServiceIds = services.map((service) => service.service_id);
      setSelectedServiceIds(ServiceIds);
    } else {
      setSelectedServiceIds([]);
    }
  };

  const isSelectedAllServiceId =
    selectedServiceIds.length !== 0 &&
    selectedServiceIds.length === services.length;

  return (
    <>
      <h1>Danh sách dịch vụ</h1>
      <Form className="row m-1 mb-3" onSubmit={handleSearch}>
        <div className="col-8">
          <Form.Control
            type="text"
            value={searchInputValue}
            onChange={(event) => setSearchInputValue(event.target.value)}
            placeholder="Nhập từ khóa"
          />
        </div>
        <div className="col-4">
          <Button type="submit" variant="info mx-1">
            Tìm kiếm
          </Button>
          <Button type="button" variant="primary mx-1" onClick={handleAdd}>
            Thêm mới
          </Button>
          {selectedServiceIds.length !== 0 && (
            <Button
              type="button"
              variant="danger mx-1"
              onClick={handleBulkDelete}
            >
              Xóa
            </Button>
          )}
        </div>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <Form.Check
                type="checkbox"
                onChange={selectAllServiceIdCheckboxes}
                checked={isSelectedAllServiceId}
              />
            </th>
            <th>Tên dịch vụ</th>
            <th>Mô tả dịch vụ</th>
            <th>Loại hàng</th>
            <th>Giá tiền</th>
            <th>Thời gian tạo</th>
            <th>Thời gian cập nhật</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service, index) => {
            return (
              <tr key={index}>
                <td>
                  <Form.Check
                    type="checkbox"
                    name="id"
                    id={"id-" + service.service_id}
                    value={service.service_id}
                    onChange={changeServiceCheckbox}
                    checked={selectedServiceIds.find(
                      (id) => id === service.serservice_id
                    )}
                  />
                </td>
                <td>{service.name_service}</td>
                <td>{service.description}</td>
                <td>{formatCategory(service.category_id)}</td>
                <td>{service.unit_price.toLocaleString()}</td>
                <td>{moment(service.created_at).format("YYYY-MM-DD HH:mm")}</td>
                <td>{moment(service.updated_at).format("YYYY-MM-DD HH:mm")}</td>
                <td>
                  <Button
                    variant="warning"
                    className="m-1"
                    onClick={() => handleEdit(service.service_id)}
                  >
                    Sửa
                  </Button>
                  <Button
                    variant="danger"
                    className="m-1"
                    onClick={() =>
                      handleDelete(service.service_id, service.name_service)
                    }
                  >
                    Xóa
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <AdminPaginationComponent total={total} setPage={setPage} />
    </>
  );
}

export default ServiceList;
