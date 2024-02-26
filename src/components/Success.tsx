import React from 'react'

const Success = () => {
  return (
    <div className='container d-flex align-items-center justify-content-center p-5'>
        <div className='d-flex flex-column align-items-center justify-content-center gap-3 p-5 bg-light rounded-xl shadow'>
            <h2 className="font-italic text-primary fs-2 fw-bold">Thank you for booking an Appointment!</h2>
            <div className='d-flex align-items-center gap-2 justify-content-center fs-4'>
                <p className="text-primary">Please visit again to receive the best advice from our top-quality lawyers</p>
            </div>

            <a href='/' className="text-decoration-none">
                <button
                    type='button'
                    className="btn btn-success rounded p-3"                
                >
                    Back to Home
                </button>
            </a>
        </div>
    </div>

  )
}

export default Success