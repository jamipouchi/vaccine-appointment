import { Link } from "react-router-dom";
import Login from "./Login";

const VaccineAppointment = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Login />;
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1>Vaccine Appointment</h1>
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    <Link to="/vaccine-info">Vaccine Info</Link>
                  </h5>
                  <p className="card-text">
                    This is a simple example of a vaccine appointment site.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    <Link to="/vaccine-info">Vaccine Info</Link>
                  </h5>
                  <p className="card-text">
                    This is a simple example of a vaccine
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaccineAppointment;
