import { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import MainLayout from '../Layout/Mainlayout';
import CreateReview from './CreateReview';
import { FaEdit, FaTrash } from 'react-icons/fa';

function App() {
  const [reviews, setReviews] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [editReview, setEditReview] = useState(null);
  const [tempRating, setTempRating] = useState(0); 
  const userId = localStorage.getItem('userId'); // From local storage

  const fetchReviews = async () => {
    try {
      const response = await axiosInstance.get(
        `tuition-application/reviews/getAll/${userId}`
      );
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []); // Run once on component mount

  const handleAddReview = () => {
    setShowReviewModal(true);
    setEditReview(null);
    setTempRating(0); // Reset temporary rating when adding a new review
  };

  const handleCloseModal = () => {
    setShowReviewModal(false);
    fetchReviews();
    setEditReview(null);
    setTempRating(0); // Reset temporary rating
  };

  const handleEditReview = (review) => {
    setEditReview(review);
    setShowReviewModal(true);
    setTempRating(review.rating || 0); // Prepopulate tempRating with existing rating
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await axiosInstance.delete(`tuition-application/reviews/${reviewId}?userId=${userId}`);
      fetchReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const handleStarClick = (rating) => {
    setTempRating(tempRating === rating ? 0 : rating); // Toggle rating on click
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-100 p-8">
        <button
          onClick={handleAddReview}
          className="mt-auto bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition justify-end ml-[4rem]"
        >
          Add Review +
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 ml-[4rem] mt-[4rem]">
          {reviews.map((review) => (
            <div key={review.id} className="p-4 bg-white rounded-lg shadow relative">
              <div className="absolute top-2 right-2 flex space-x-2">
                <FaEdit
                  className="text-blue-600 cursor-pointer hover:text-blue-800"
                  onClick={() => handleEditReview(review)}
                />
                <FaTrash
                  className="text-red-600 cursor-pointer hover:text-red-800"
                  onClick={() => handleDeleteReview(review.id)}
                />
              </div>
              <p><strong>Reviewer Name:</strong> {review.reviewerName}</p>
              <p><strong>Reviewer Email:</strong> {review.reviewerEmailId}</p>
              <p><strong>Review To:</strong> {review.reviewTo}</p>
              <p><strong>Subject:</strong> {review.subject}</p>
              <p><strong>Comments:</strong> {review.comments}</p>
              <p>
                <strong>Rating:</strong>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={
                      star <= (tempRating || review.rating)
                        ? 'text-yellow-500 cursor-pointer'
                        : 'text-gray-400 cursor-pointer'
                    }
                    onClick={() => handleStarClick(star)}
                  >
                    ★
                  </span>
                ))}
              </p>
              <p><strong>Created At:</strong> {new Date(review.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>

        {showReviewModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg relative">
              <CreateReview onClose={handleCloseModal} reviewToEdit={editReview} fetchReviews={fetchReviews} />
              <button
                onClick={handleCloseModal}
                className="absolute top-5 right-5 hover:text-gray-900 text-xl font-bold text-red-700"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default App;
