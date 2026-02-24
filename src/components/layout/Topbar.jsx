const Topbar = () => {
  return (
    <div
      className="d-flex justify-content-between align-items-center px-4 py-3 shadow-sm bg-white"
    >
      <h5 className="mb-0">Dashboard</h5>
      <div>
        <i className="fa fa-bell me-3"></i>
        <span className="fw-semibold">Admin</span>
      </div>
    </div>
  );
};

export default Topbar;