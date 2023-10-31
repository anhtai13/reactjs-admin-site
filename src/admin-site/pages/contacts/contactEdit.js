import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import ContactForm from "../../components/contacts/ContactForm";

import contactApi from "../../../apis/contact.api";
import { useEffect } from "react";

function ContactEdit() {
  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {}, []);
  const handleUpdate = (contact) => {
    contactApi
      .updateContact(id, contact)
      .then(() => {
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
      <h1>Quản lý liên hệ</h1>
      <ContactForm
        contactId={id}
        onSubmit={handleUpdate}
        onCancel={() => navigate("/admin/contacts")}
      />
    </>
  );
}

export default ContactEdit;
