import React from 'react'

const Cancel = () => {
  return (
    <div className='container d-flex align-items-center justify-content-center p-5'>
        <div className='d-flex flex-column align-items-center justify-content-center gap-3 p-5 bg-light rounded-xl shadow'>
            <h2 className="font-italic text-danger fs-2 fw-bold">Unfortunately, we are unable to book your Appointment</h2>
            <div className='d-flex align-items-center gap-2 justify-content-center fs-4'>
                <p className="text-primary">Please try again or contact support -&nbsp;
                    <a href={`mailto:rounsunn@gmail.com`} className='text-danger'>
                        rounsunn@gmail.com
                    </a>
                </p>
            </div>

            <a href='/' className="text-decoration-none">
                <button
                    type='button'
                    className="btn btn-danger rounded p-3"                
                >
                    Back to Home
                </button>
            </a>
        </div>
    </div>
  )
}

export default Cancel