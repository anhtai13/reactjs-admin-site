import { useNavigate } from "react-router-dom";

import contactApi from "../../../apis/contact.api";
import ContactForm from "../../components/contacts/ContactForm";

function ContactCreate() {
  const navigate = useNavigate();

  const handleAdd = (contact) => {
    contactApi
      .createContact(product)
      .then((response) => {
        navigate("/admin/contacts");
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
      <ContactForm
        onSubmit={handleAdd}
        onCancel={() => navigate("/admin/products")}
      />
    </>
  );
}

export default ContactCreate;
