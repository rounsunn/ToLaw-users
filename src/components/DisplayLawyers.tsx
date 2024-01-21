import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ryan from "../assets/ryan.jpeg";
import { LawyerInterface } from "../interface/lawyerSchema";

function DisplayLawyers({ lawyersData }: { lawyersData: LawyerInterface[] }) {
  return (
    <>
      {lawyersData.length == 0 ? (
        <div className="container mt-5 justify-content-center border border-primary rounded w-50 h-50">
          <h3 className="d-flex text-info justify-content-center">
            No Result Found...
          </h3>
        </div>
      ) : (
        <div>
          {lawyersData.map((data, id) => (
            <div
              key={id}
              className="container my-5 p-2 justify-content-center border border-primary rounded border-2 w-75 bg"
            >
              <div className="row justify-content-center">
                <div className="col-md-3 d-flex flex-column align-items-center justify-content-center">
                  <img src={data.profilePic || ryan} className="img-fluid rounded-circle mb-2" />
                  <h4>{data.fullName}</h4>
                </div>
                <div className="col-md-9 d-flex flex-column">
                  <div className="row">
                    <div className="col-md-8 d-flex">
                      <div>
                        <strong className="m-1">Law Area:</strong>
                      </div>
                      {data.lawArea.map((datas, key) => (
                        <div key={key} className="text-muted">
                          {datas},
                        </div>
                      ))}
                    </div>
                    <div className="col-md-4">
                      <strong>Languages: </strong> English, Hindi
                    </div>
                  </div>
                  <div className="my-3">
                    <h5>Biography</h5>
                    <p>{data.biography}</p>
                  </div>
                  <div className="d-flex flex-row justify-content-between mt-auto">
                    <Link to={`book/${data._id}`}>
                      <Button
                        className="btn btn-primary"
                        style={{ backgroundColor: "#0C253F" }}
                      >
                        {" "}
                        Book Now{" "}
                      </Button>
                    </Link>
                    <h4>Price : {data.charges}</h4>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default DisplayLawyers;
