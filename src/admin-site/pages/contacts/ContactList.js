import { Table, Button, Form, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment/moment";

import AdminPaginationComponent, {
  NUMBER_RECORDS_PER_PAGE,
} from "../../components/table/AdminPaginationComponent";

import contactApi from "../../../apis/contact.api";

function ContactList() {
  const navigate = useNavigate();

  const [contact, setContact] = useState([]);
  const [total, setTotal] = useState(0);

  const [searchInputValue, setSearchInputValue] = useState("");

  const [keyword, setKeyword] = useState(null);
  const [page, setPage] = useState(1);

  const [selectedContactIds, setSelectedContactIds] = useState([]);

  const fetchContact = () => {
    contactApi
      .searchContacts({
        name: keyword,
        page: page,
        limit: NUMBER_RECORDS_PER_PAGE,
      })
      .then((data) => {
        setContact(data.records);
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

    setSelectedContactIds([]);
  };

  useEffect(() => {
    fetchContact();
  }, [keyword, page]);

  const handleSearch = (event) => {
    event.preventDefault();
    setKeyword(searchInputValue);
  };

  const handleAdd = () => {
    navigate("/admin/contacts/new");
  };

  const handleEdit = (id) => {
    navigate(`/admin/contacts/${id}/edit`);
  };

  const handleBulkDelete = () => {
    const full_name = contact
      .filter(
        (contact) =>
          !!selectedContactIds.find(
            (selectedContactIds) => selectedContactIds === contact.contact_id
          )
      )
      .map((contact) => contact.full_name);

    if (
      window.confirm(
        `Bạn có chắc chắn muốn xóa người dùng [${full_name}] không ?`
      )
    ) {
      // TODO
      fetchContact();
    }
  };

  const handleDelete = (contact_id, full_name) => {
    if (
      window.confirm(
        `Bạn có chắc chắn muốn xóa người dùng ${full_name} không ?`
      )
    ) {
      contactApi
        .deleteContact(contact_id)
        .then(() => {
          fetchContact();
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

  const changeContactIdCheckbox = (event) => {
    if (event.target.checked) {
      setSelectedContactIds([
        ...selectedContactIds,
        parseInt(event.target.value),
      ]);
    } else {
      const newSelectedContactIds = selectedContactIds.filter(
        (selectedContactIds) =>
          selectedContactIds !== parseInt(event.target.value)
      );
      setSelectedContactIds(newSelectedContactIds);
    }
  };

  const selectAllContactIdCheckboxes = (event) => {
    if (event.target.checked) {
      const contactIds = contact.map((contact) => contact.contact_id);
      setSelectedContactIds(contactIds);
    } else {
      setSelectedContactIds([]);
    }
  };

  const isSelectedAllContactId =
    selectedContactIds.length !== 0 &&
    selectedContactIds.length === contact.length;

  return (
    <>
      <h1>Danh sách đánh giá</h1>
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

          {selectedContactIds.length !== 0 && (
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
                onChange={selectAllContactIdCheckboxes}
                checked={isSelectedAllContactId}
              />
            </th>
            <th>Họ và tên</th>
            <th>Địa chỉ E-mail</th>
            <th>Trạng thái</th>
            <th>Thời gian tạo</th>
            <th>Thời gian cập nhật</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {contact.map((contact, index) => {
            return (
              <tr key={index}>
                <td>
                  <Form.Check
                    type="checkbox"
                    name="id"
                    id={"id-" + contact.contact_id}
                    value={contact.contact_id}
                    onChange={changeContactIdCheckbox}
                    checked={selectedContactIds.find((id) => id === contact.id)}
                  />
                </td>
                <td>{contact.full_name}</td>
                <td>{contact.email}</td>
                <td>{contact.status}</td>
                <td>{moment(contact.created_at).format("YYYY-MM-DD HH:mm")}</td>
                <td>{moment(contact.updated_at).format("YYYY-MM-DD HH:mm")}</td>
                <td>
                  <Button
                    variant="warning"
                    className="m-1"
                    onClick={() => handleEdit(contact.contact_id)}
                  >
                    Cập nhật
                  </Button>
                  <Button
                    variant="danger"
                    className="m-1"
                    onClick={() =>
                      handleDelete(contact.contact_id, contact.full_name)
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

export default ContactList;
