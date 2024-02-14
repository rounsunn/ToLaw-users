import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import client from "../api/clientApi";
import { LawyerInterface } from "../interface/lawyerSchema";
import { defaultLawyer } from "../interface/defaultValues";
import Datetime from "react-datetime";
import GooglePayButton from "@google-pay/button-react";
import "react-datetime/css/react-datetime.css";

const BookNow = () => {
  const id = useParams();
  const [lawyerInfo, setLawyerInfo] = useState(defaultLawyer);
  const [userEmail, setUserEmail] = useState("");
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(
    new Date()
  );
  const currency = "INR";
  const receiptId = `Appointment with ${lawyerInfo.fullName}`;

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

  const handleDatetimeChange = (selectedDate: Date | null) => {
    setSelectedDateTime(selectedDate);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(event.target.value);
  };

  const isAppointmentButtonDisabled = () => {
    const currentTime = new Date().getTime();
    return (
      userEmail.trim() === "" ||
      (selectedDateTime !== null &&
        selectedDateTime instanceof Date &&
        Math.abs(selectedDateTime.getTime() - currentTime) < 60000)
    );
  };

  const SendEmailAPI = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/sendemails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: userEmail,
          lawyerEmail: lawyerInfo?.emailId,
          selectedDateTime: selectedDateTime,
        }),
      });

      if (response.ok) {
        console.log("Emails sent successfully");
      } else {
        console.error("Failed to send emails");
      }
    } catch (error) {
      console.error("Error sending emails:", error);
    }
  };

  const handlebuttonSubmit = async (e: any) => {
    try {
      const amount = lawyerInfo.charges * 100;

      const response = await fetch("http://127.0.0.1:5000/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount, currency, receipt: receiptId }),
      });

      if (response.ok) {
        const responseData = await response.json();

        var options = {
          key: import.meta.env.RAZOR_SECRET,
          amount,
          currency,
          name: "ToLaw",
          description: "Test Transaction",
          image: lawyerInfo.profilePic,
          order_id: responseData.id,
          handler: async function (response: any) {
            const body = {
              ...response,
            };

            const validateRes = await fetch(
              "http://localhost:5000/order/validate",
              {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            const jsonRes = await validateRes.json();

            if (jsonRes.success) {
              SendEmailAPI();
              window.location.href = "/payment/success";
            } else {
              console.error("Payment validation failed:", jsonRes.message);
              window.location.href = "/payment/canceled";
            }
          },
          theme: {
            color: "#4169E1",
          },
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.on("payment.failed", function (response: any) {
          console.error(response);
        });
        rzp1.open(); //this opens up the payment window
        e.preventDefault();
      } else {
        console.error("Failed to fetch payment URL:", response.statusText);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  return (
    <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center">
      <h1>Book Now</h1>
      <div className="d-flex flex-column align-items-center justify-content-center border rounded-2 border-dark p-4">
        <div className="d-flex w-100 align-items-center justify-content-center gap-5">
          <img
            src={lawyerInfo?.profilePic}
            alt="profilePic"
            className="img-fluid"
            style={{ width: "10rem", height: "10rem" }}
          />
          <div className="d-flex align-items-center flex-column p-4">
            <h2>{lawyerInfo?.fullName}</h2>
            <p>Mobile no:- {lawyerInfo?.mobileNumber}9384730238</p>
            <p>Experience:- {lawyerInfo?.experience} years</p>
          </div>
        </div>
        <div className="d-flex flex-column align-items-center justify-content-center p-4">
          <h3>Consultation Details</h3>
          <div className="d-flex gap-3 align-items-center justify-content-center p-2">
            <p>Charges: ₹{lawyerInfo?.charges}</p>
            <p>Duration: {lawyerInfo?.consultingDuration}mins</p>
          </div>
          <div className="py-4 d-flex flex-column w-100 gap-2">
            <label htmlFor="userEmail">Enter Your Email:</label>
            <input
              type="email"
              id="userEmail"
              value={userEmail}
              onChange={handleEmailChange}
              className="form-control"
              placeholder="example@email.com"
            />
          </div>
          <div className="w-100">
            <p>Please select a Date and Time of your choosing</p>
            <Datetime
              value={selectedDateTime}
              onChange={handleDatetimeChange}
            />
          </div>
        </div>
        <div>
          <button
            onClick={handlebuttonSubmit}
            className="btn btn-primary"
            disabled={isAppointmentButtonDisabled()}
          >
            Schedule Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookNow;
