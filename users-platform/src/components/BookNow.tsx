import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import client from "../api/clientApi";
import { LawyerInterface } from "../interface/lawyerSchema";
import { defaultLawyer } from "../interface/defaultValues";
import Datetime from 'react-datetime';
import GooglePayButton from "@google-pay/button-react";
import "react-datetime/css/react-datetime.css";

const BookNow = () => {
  const id = useParams();
  const [lawyerInfo, setLawyerInfo] = useState(defaultLawyer);
  const [userEmail, setUserEmail] = useState('')
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(new Date());
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

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

  console.log(lawyerInfo)

  const handleDatetimeChange = (selectedDate: Date | null) => {
    setSelectedDateTime(selectedDate);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(event.target.value);
  };

  const isAppointmentButtonDisabled = () => {
    const currentTime = new Date().getTime();
    return (
      userEmail.trim() === '' ||
      selectedDateTime !== null &&
      selectedDateTime instanceof Date &&
      Math.abs(selectedDateTime.getTime() - currentTime) < 60000
    );
  };
  

  const handlebuttonSubmit = () => {
    setShowPaymentDialog(true);
  }

  const SendEmailAPI = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/sendemails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: userEmail, // Replace with the actual user's email
          lawyerEmail: lawyerInfo?.emailId, // Replace with the actual lawyer's email
          selectedDateTime: selectedDateTime, // Replace with the actual appointment time
        }),
      });
  
      if (response.ok) {
        console.log('Emails sent successfully');
      } else {
        console.error('Failed to send emails');
      }
    } catch (error) {
      console.error('Error sending emails:', error);
    }
  }

  const handlePaymentSuccess = async (paymentRequest : any) => {
    console.log(paymentRequest)
    setPaymentSuccess(true);

    SendEmailAPI()    

    setTimeout(() => {
      setShowPaymentDialog(false);
    },2000)
    setSelectedDateTime(new Date())
  };
  
  
  return (
    <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center">
      <h1>Book Now</h1>
      <div className="d-flex flex-column align-items-center justify-content-center border rounded-2 border-dark p-4">
        <div className="d-flex w-100 align-items-center justify-content-center gap-5">
          <img src={lawyerInfo?.profilePic} alt="profilePic" className="img-fluid" style={{ width: '10rem', height: '10rem' }} />
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
            <Datetime value={selectedDateTime} onChange={handleDatetimeChange} />
          </div>
        </div>
        <div>
          <button onClick={handlebuttonSubmit} className="btn btn-primary" disabled={isAppointmentButtonDisabled()}>
            Schedule Appointment
          </button>
        </div>
      </div>

      {showPaymentDialog && (

      <div className="position-absolute top-50 start-50 translate-middle z-10 bg-light p-5 border shadow d-flex flex-column align-items-center gap-3">
        {!paymentSuccess ? (
          <div className="d-flex flex-column align-items-center">
            <h2>Proceed to Payment:</h2>
            <GooglePayButton
              environment="TEST"
              paymentRequest={{
                apiVersion: 2,
                apiVersionMinor: 0,
                allowedPaymentMethods: [
                  {
                    type: 'CARD',
                    parameters: {
                      allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                      allowedCardNetworks: ['MASTERCARD', 'VISA'],
                    },
                    tokenizationSpecification: {
                      type: 'PAYMENT_GATEWAY',
                      parameters: {
                        gateway: 'example',
                        gatewayMerchantId: 'exampleGatewayMerchantId',
                      },
                    },
                  },
                ],
                merchantInfo: {
                  merchantId: '12345678901234567890',
                  merchantName: 'Demo Merchant',
                },
                transactionInfo: {
                  totalPriceStatus: 'FINAL',
                  totalPriceLabel: 'Total',
                  totalPrice: lawyerInfo?.charges.toString(),
                  currencyCode: 'INR',
                  countryCode: 'IN',
                },
              }}
              onLoadPaymentData={paymentRequest => handlePaymentSuccess(paymentRequest)}
              buttonColor="white"
            />
          </div>
        ) : (
          <div className="position-absolute top-50 start-50 translate-middle z-10 bg-light p-5 border shadow">
          <h2>Payment Successful!</h2>
          <p>Confirmation Email has been sent to you</p>
        </div>
        )}
      </div>
      )}

    </div>
  );
};

export default BookNow;
