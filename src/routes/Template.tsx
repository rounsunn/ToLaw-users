import React from 'react';

const Template = () => {
  return (
    <div className="px-28 max-md:px-5 my-10 font-poppins h-[400px]">
      <div className="container mx-auto flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold mb-8">Coming Soon</h1>
        <div className="max-w-md text-center">
          <p className="text-lg mb-4">
            We are working hard to bring you a new feature!
          </p>
          <p className="text-lg">
            Stay tuned for the ability to notarize your documents.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Template;
