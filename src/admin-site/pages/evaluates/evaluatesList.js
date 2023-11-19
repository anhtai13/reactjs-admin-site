import { Table, Form, } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment/moment";

import AdminPaginationComponent, {
  NUMBER_RECORDS_PER_PAGE,
} from "../../components/table/AdminPaginationComponent";

import evaluatesApi from "../../../apis/evaluates.api.js";

function EvaluatesList() {
  const navigate = useNavigate();

  const [evaluates, setEvaluate] = useState([]);
  const [total, setTotal] = useState(0);

  const [searchInputValue, setSearchInputValue] = useState("");

  const [keyword, setKeyword] = useState(null);
  const [page, setPage] = useState(1);

  const [selectedEvaluatesIds, setSelectedEvaluatesIds] = useState([]);

  const fetchUsers = () => {
    evaluatesApi
      .searchEvaluates({
        name: keyword,
        page: page,
        limit: NUMBER_RECORDS_PER_PAGE,
      })
      .then((data) => {
        setEvaluate(data.records);
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

    setSelectedEvaluatesIds([]);
  };

  useEffect(() => {
    fetchUsers();
  }, [keyword, page]);

  const handleSearch = (event) => {
    event.preventDefault();
    setKeyword(searchInputValue);
  };

  const changeEvaluateIdCheckbox = (event) => {
    if (event.target.checked) {
      setSelectedEvaluatesIds([...selectedEvaluatesIds, parseInt(event.target.value)]);
    } else {
      const newSelectedEvaluatesIds = selectedEvaluatesIds.filter(
        (selectedUserId) => selectedUserId !== parseInt(event.target.value)
      );
      setSelectedEvaluatesIds(newSelectedEvaluatesIds);
    }
  };

  const selectAllEvaluatesIdCheckboxes = (event) => {
    if (event.target.checked) {
      const evaluateIds = evaluates.map((evaluate) => evaluate.evaluate_id);
      setSelectedEvaluatesIds(evaluateIds);
    } else {
      setSelectedEvaluatesIds([]);
    }
  };

  const isSelectedAllEvaluatesId =
    selectedEvaluatesIds.length !== 0 && selectedEvaluatesIds.length === evaluates.length;

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
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <Form.Check
                type="checkbox"
                onChange={selectAllEvaluatesIdCheckboxes}
                checked={isSelectedAllEvaluatesId}
              />
            </th>
            <th>Tên người dùng</th>
            <th>Địa chỉ E-mail</th>
            <th>Content</th>
            <th>Thời gian tạo</th>
            <th>Thời gian cập nhật</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          {evaluates
            ? evaluates.map((evaluate, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <Form.Check
                        type="checkbox"
                        name="id"
                        id={"id-" + evaluate.evaluate_id}
                        value={evaluate.evaluate_id}
                        onChange={changeEvaluateIdCheckbox}
                        checked={selectedEvaluatesIds.find(
                          (id) => id === evaluate.evaluate_id
                        )}
                      />
                    </td>
                    <td>{evaluate.full_name}</td>
                    <td>{evaluate.email}</td>
                    <td>{evaluate.content}</td>
                    <td>
                      {moment(evaluate.created_at).format("YYYY-MM-DD HH:mm")}
                    </td>
                    <td>
                      {moment(evaluate.updated_at).format("YYYY-MM-DD HH:mm")}
                    </td>
                    <td>{evaluate.rate}</td>
                  </tr>
                );
              })
            : ""}
        </tbody>
      </Table>
      <AdminPaginationComponent total={total} setPage={setPage} />
    </>
  );
}

export default EvaluatesList;
