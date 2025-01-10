import React, { useEffect } from 'react';
import MainLayout from './Layout/Mainlayout';

function Payment() {
  useEffect(() => {
    // Check if the form is already present to avoid adding it twice
    if (!document.getElementById('razorpay-form')) {
      const form = document.createElement('form');
      const script = document.createElement('script');

      // Configure Razorpay script
      script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
      script.setAttribute('data-payment_button_id', 'pl_P6Vv9czSHKkY2D');
      script.async = true;

      // Set an ID on the form to identify it
      form.id = 'razorpay-form';
      form.appendChild(script);

      // Append form to the container
      document.getElementById('razorpay-button-container').appendChild(form);
    }
  }, []);

  return (
    <MainLayout>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow rounded p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">Complete Your Registration</h2>
        <p className="text-center text-gray-600 mb-4">
          Finalize your registration by completing the payment below.
        </p>

        {/* {/ Razorpay payment button container /} */}
        <div id="razorpay-button-container" className="flex justify-center mb-4"></div>

        {/* {/ Secure payment notice /} */}
        <p className="text-center text-gray-500 text-sm mt-4">
          <i className="fas fa-lock mr-1"></i> Secure Payment Processing
        </p>

        {/* {/ Terms and conditions footer /} */}
        <p className="text-center text-xs text-gray-400 mt-4">
          By proceeding, you agree to our{' '}
          <a href="slide6" className="text-blue-500 hover:underline">Terms and Conditions</a>.
        </p>
      </div>
    </div>
    </MainLayout>
  );
}

export default Payment;
