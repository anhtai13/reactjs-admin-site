function AdminFooterComponent() {
  return (
    <>
      <footer className="bg-dark text-light text-center py-3">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Your Website Name</p>
          <p>Contact: contact@example.com</p>
          <p>
            <a href="/privacy-policy" className="text-light">
              Privacy Policy
            </a>{" "}
            |{" "}
            <a href="/terms-of-service" className="text-light">
              Terms of Service
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}

export default AdminFooterComponent;
