const StatCard = ({ title, value, bg, icon }) => {
  return (
    <div className="col-md-4">
      <div
        className="stat-card shadow"
        style={{ background: bg }}
      >
        <div className="d-flex justify-content-between">
          <div>
            <h6>{title}</h6>
            <h2>{value}</h2>
          </div>
          <i className={`fa ${icon} fa-2x`}></i>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
//  routing 
//  gloable 