import { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import ryan from "../assets/ryan.jpeg";
import { defaultLawyers } from "../interface/defaultValues";
import { LawyerInterface } from "../interface/lawyerSchema";
import fetchAllLawyers from "../data/fetchAllLawyers";

const LawyersCard = () => {
  const [lawyersData, setLawyersData] = useState(defaultLawyers);

  useEffect(() => {
    async function fetchData() {
      const data: LawyerInterface[] = await fetchAllLawyers();
      setLawyersData(data);
    }

    fetchData();
  }, []);

  return (
    <>
      {lawyersData.length == 0 ? (
        <h1 className="d-flex text-info justify-content-center">Loading...</h1>
      ) : (
        <div className="container mt-5">
          <div className="row">
            <div className="col">
              <h2 className="m-3 d-flex justify-content-center">
                Top Rated Lawyers
              </h2>
              <div className="d-flex flex-nowrap overflow-auto">
                {lawyersData.map((data, key) => (
                  <div key={key} className="col-md-3 px-1">
                    <Card>
                      <Card.Img
                        variant="top"
                        src={data.profilePic || ryan}
                        className="img-fluid img-thumbnail"
                      ></Card.Img>
                      <Card.Body>
                        <Card.Title>{data.fullName}</Card.Title>
                        <div className="d-inline-flex flex-row justify-content-around">
                          {data.lawArea.map((datas, key) => (
                            <Card.Subtitle key={key} className="m-2 text-muted">
                              {"   "}
                              {datas}
                              {"   "}
                            </Card.Subtitle>
                          ))}
                        </div>
                        <Card.Text>{data.biography}</Card.Text>
                        <Link to={`/lawyers/${data._id}`}>
                          <Button
                            className="btn"
                            style={{ backgroundColor: "#0C253F" }}
                          >
                            Book a consultation{" "}
                          </Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LawyersCard;
