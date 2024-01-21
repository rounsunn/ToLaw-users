import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import client from "../api/clientApi";
import ryan from "../assets/ryan.jpeg";
import { LawyerInterface } from "../interface/lawyerSchema";
import { defaultLawyer } from "../interface/defaultValues";

const Profile = () => {
  const id = useParams();
  const [lawyerInfo, setLawyerInfo] = useState(defaultLawyer);
  async function get(url: string) {
    let response = await client.get(url);
    return response.data;
  }
  useEffect(() => {
    if (lawyerInfo === undefined) return;
    async function fetchData() {
      const data: LawyerInterface = await get(`lawyers/${id._id}`);
      setLawyerInfo(data);
    }

    fetchData();
  }, []);
  return (
    <>
      <div className="container mt-5 justify-content-center border border-primary rounded border-2">
        <div className="row justify-content-center">
          <div className="col-md-3">
            <img
              src={lawyerInfo.profilePic || ryan}
              className="img-fluid rounded-circle m-5"
              style={{ maxWidth: "200px" }}
            />
            <div className="text-center">
              <div className="stars">{/* Add star icons here */}★ ★ ★ ★ ★</div>
            </div>
          </div>
          <div className="col-md-9 mt-4">
            <h1>{lawyerInfo.fullName}</h1>
            <br />
            <br />
            <div className="row">
              <div className="col-md-6">
                <div className="mb-4 d-flex flex-row align-items-center">
                  <strong>Law Area:</strong>
                  {lawyerInfo.lawArea.map((datas, key) => (
                    <div key={key} className="m-2 text-muted">
                      {"   "}
                      {datas}
                      {"   "}
                    </div>
                  ))}
                </div>

                <div className="mb-4">
                  <strong>Experience:</strong> {lawyerInfo.experience} years
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-4">
                  <strong>Languages:</strong> English, Hindi
                </div>
                <div className="mb-4">
                  <strong>Region:</strong> {lawyerInfo.region}
                </div>
              </div>
            </div>
            <div className="mb-4">
              <h2>Biography</h2>
              <p>{lawyerInfo.biography}</p>
            </div>
            <br />
            <div className="mb-4">
              <h2 className="text-info">Charges : {lawyerInfo.charges}</h2>
              <p className="h4 text-info">
                Consultation Time : {lawyerInfo.consultingTime}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
