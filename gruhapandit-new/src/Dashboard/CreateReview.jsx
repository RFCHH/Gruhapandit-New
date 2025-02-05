

// function CreateReview() {
//   return (
//     <>      
//       <div>
//         <div className="text-lg grid grid-cols-2  text-center max-w-2xl  mb-4 space-y-4 ">CreateReview</div>
//         <div className="border border-black justify-center text-center max-w-2xl mx-auto">
//         <label htmlFor="ratings" className="ml-4">Reviewer Name:</label>
//         <input type="text" className="border border-black bg-gray-300" />
//         <label htmlFor="ratings" className="ml-4">Subject:</label>
//         <input type="text" className="border border-black bg-gray-300" />        
//         </div>

//         <div className="border border-black justify-center text-center max-w-2xl mx-auto">
//         <label htmlFor="ratings" className="ml-4">Reviewer Email:</label>
//         <input type="text" className="border border-black bg-gray-300" />       
//         <label htmlFor="ratings" className="ml-4">Comments:</label>
//         <input type="text" className="border border-black bg-gray-300" />       
//         </div>

//         <div className="border border-black justify-center text-center max-w-2xl mx-auto">
//         <label htmlFor="ratings" className="ml-4">Review To:</label>
//         <input type="text" className="border border-black bg-gray-300" />       
//         <label htmlFor="ratings" className="ml-4">Ratings:</label>
//         <input type="text" className="border border-black bg-gray-300" />
//         <button type="save">Submit</button>      
//         </div>
//         <div>
           
//         </div>
//       </div>
//     </>
//   );
// }
// export default CreateReview;
import { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';

function CreateReview({ onClose, reviewToEdit,fetchReviews }) {
  const [rating, setRating] = useState(0);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerEmail, setReviewerEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [reviewTo, setReviewTo] = useState('');
  const [comments, setComments] = useState('');
  const [error,setError]=useState({
    reviewerName:"",
    subject:"",
    reviewerEmail:"",
    reviewTo:"",
    comments:"",
  });

  // Reset or prefill form based on reviewToEdit
  useEffect(() => {
    if (reviewToEdit) {
      setRating(reviewToEdit.rating || 0);
      setReviewerName(reviewToEdit.reviewerName || '');
      setReviewerEmail(reviewToEdit.reviewerEmailId || '');
      setSubject(reviewToEdit.subject || '');
      setReviewTo(reviewToEdit.reviewTo || '');
      setComments(reviewToEdit.comments || '');
    } else {
      resetForm();
    }
  }, [reviewToEdit]);

  const userId = localStorage.getItem('userId');

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!reviewerName.trim()) {
      errors.reviewerName = 'Reviewer name is required';
      isValid = false;
    }

    if (!subject.trim()) {
      errors.subject = 'Subject is required';
      isValid = false;
    }

    if (!reviewerEmail.trim()) {
      errors.reviewerEmail = 'Email is required';
      isValid = false;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(reviewerEmail)) {
      errors.reviewerEmail = 'Invalid email format';
      isValid = false;
    }

    if (!reviewTo.trim()) {
      errors.reviewTo = 'Review To field is required';
      isValid = false;
    }

    if (!comments.trim()) {
      errors.comments = 'Comments cannot be empty';
      isValid = false;
    }

    setError(errors);
    return isValid;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!validateForm()){
      return;
    }
  
    const reviewData = {
      userId,
      reviewerName,
      reviewerEmailId: reviewerEmail,
      reviewTo,
      subject,
      comments,
      rating,
      createdAt: new Date().toISOString(),
    };
  
    try {
      if (reviewToEdit) {
        // Update review
        reviewData.reviewId = reviewToEdit.id;
        await axiosInstance.patch(`/reviews/`, reviewData, {
          headers: { 'Content-Type': 'application/json' },
        });
      } else {
        // Create new review
        await axiosInstance.post('/reviews/create', reviewData, {
          headers: { 'Content-Type': 'application/json' },
        });
      }
  
      onClose(); // Close the modal
      fetchReviews(); 
      alert("Review successfully created!");
    } catch (error) {
      console.error('Error submitting the review:', error);
    }
  };
  

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setRating(0);
    setReviewerName('');
    setReviewerEmail('');
    setSubject('');
    setReviewTo('');
    setComments('');
  };

  const stars = Array(5).fill(false);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="text-2xl text-center mb-6 font-semibold">
        {reviewToEdit ? 'Edit Review' : 'Create Review'}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-4">
          <div className="col-span-1">
            <label htmlFor="name" className="block text-left text-gray-700">Reviewer Name:</label>
            <input
              id="name"
              type="text"
              value={reviewerName}
              onChange={(e) => setReviewerName(e.target.value)}
              className="border border-gray-300 bg-gray-50 w-full p-3 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            />
            {
              error.reviewerName && (
                <p className='text-red-500 text-sm mt-1'>{error.reviewerName}</p>
              )
            }
          </div>

          <div className="col-span-1">
            <label htmlFor="subject" className="block text-left text-gray-700">Subject:</label>
            <input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="border border-gray-300 bg-gray-50 w-full p-3 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            />
            {
              error.subject && (
                <p className='text-red-500 text-sm mt-1'>{error.subject}</p>
              )
            }
          </div>

          <div className="col-span-1">
            <label htmlFor="email" className="block text-left text-gray-700">Reviewer Email:</label>
            <input
              id="email"
              type="email"
              value={reviewerEmail}
              onChange={(e) => setReviewerEmail(e.target.value)}
              className="border border-gray-300 bg-gray-50 w-full p-3 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            />
            {
              error.reviewerEmail && (
                <p className='text-red-500 text-sm mt-1'>{error.reviewerEmail}</p>
              )
            }
          </div>

          <div className="col-span-1">
            <label htmlFor="reviewTo" className="block text-left text-gray-700">Review To:</label>
            <input
              id="reviewTo"
              type="text"
              value={reviewTo}
              onChange={(e) => setReviewTo(e.target.value)}
              className="border border-gray-300 bg-gray-50 w-full p-3 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            />
            {
              error.reviewTo && (
                <p className='text-red-500 text-sm mt-1'>{error.reviewTo}</p>
              )
            }
          </div>

          <div className="col-span-1 lg:col-span-2">
            <label htmlFor="comments" className="block text-left text-gray-700">Comments:</label>
            <textarea
              id="comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="border border-gray-300 bg-gray-50 w-full p-3 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              rows="4"
            ></textarea>
            {
              error.comments && (
                <p className='text-red-500 mt-1 text-sm'>{error.comments}</p>
              )
            }
          </div>

          <div className="col-span-1">
            <label htmlFor="ratings" className="block text-left text-gray-700">Ratings:</label>
            <div className="flex items-center">
              {stars.map((_, index) => (
                <span
                  key={index}
                  className={`cursor-pointer text-3xl ${rating > index ? 'text-yellow-500' : 'text-gray-400'}`}
                  onClick={() => handleStarClick(index)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white p-3 rounded-md w-full mt-6 shadow-md hover:bg-blue-700 transition duration-300"
        >
          {reviewToEdit ? 'Update' : 'Submit'}
        </button>
        {/* <button
          type="button"
          onClick={handleClose}
          className="bg-gray-300 text-black p-3 rounded-md w-full mt-4 shadow-md hover:bg-gray-400 transition duration-300"
        >
          Cancel
        </button> */}
      </form>
    </div>
  );
}

export default CreateReview;
