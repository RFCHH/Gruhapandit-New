import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaLessThan, FaEdit, FaTrashAlt } from 'react-icons/fa'; // Importing react-icons
import { NavLink } from 'react-router-dom';
import axiosInstance  from '../axiosInstance';

function CreateQuestion() {
  const [popUp, setPopUp] = useState(false);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState({
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: ''
  });
  const [correctOption, setCorrectOption] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [questions, setQuestions] = useState([]);
  const [editingQuestion, setEditingQuestion] = useState(null); // Track the question being edited
const {assignedTo} = useParams()
  // const examId  =localStorage.getItem("examId"); // Dynamic examId from URL
//   const userId=localStorage.getItem("UserId");
//   console.log(userId);
// console.log(examId);


  const resetForm = () => {
    setQuestion('');
    setOptions({
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: ''
    });
    setCorrectOption('');
    setEditingQuestion(null);
    setError('');
  };

  const handleOpenPopup = () => {
    setPopUp(true);
  };

  const handleClosePopup = () => {
    setPopUp(false);
    resetForm(); // Call resetForm when closing the popup
  };

  const handleEdit = (questionData) => {
    setEditingQuestion(questionData); // Set the question being edited
    setPopUp(true); // Open the popup
  
    // Pre-fill question field
    setQuestion(questionData.question);
  
    // Pre-fill options
    setOptions({
      optionA: questionData.options[0].option,
      optionB: questionData.options[1].option,
      optionC: questionData.options[2].option,
      optionD: questionData.options[3].option,
    });
  
    // Find the correct option
    const correctOption = questionData.options.find(option => option.correct);
    
    // Set the correct option based on the one marked as correct
    if (correctOption) {
      switch (correctOption.option) {
        case questionData.options[0].option:
          setCorrectOption('A');
          break;
        case questionData.options[1].option:
          setCorrectOption('B');
          break;
        case questionData.options[2].option:
          setCorrectOption('C');
          break;
        case questionData.options[3].option:
          setCorrectOption('D');
          break;
        default:
          setCorrectOption('');
      }
    } else {
      setCorrectOption(''); // In case no option is marked as correct, which should not happen
    }
  };

  
  const handleSave = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem("Token");
    const examId = localStorage.getItem("examId");
    // const userId = localStorage.getItem("UserId");
  const userId = assignedTo
    if (!token || !examId || !userId) {
      alert("Missing token, examId, or userId. Please check your session.");
      return;
    }
  
    if (!question || !options.optionA || !options.optionB || !options.optionC || !options.optionD) {
      alert("Please provide a question and all options.");
      return;
    }
  
    if (!['A', 'B', 'C', 'D'].includes(correctOption)) {
      alert("Please select a valid correct option (A, B, C, or D).");
      return;
    }
  
    const requestBody = {
      // userId: userId,
      examId: examId,
      question: question,
      options: [
        { option: options.optionA, correct: correctOption === "A" },
        { option: options.optionB, correct: correctOption === "B" },
        { option: options.optionC, correct: correctOption === "C" },
        { option: options.optionD, correct: correctOption === "D" },
      ],
    };
  
    try {
      const response = await axiosInstance.post(
        `/exams/addquestions`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            // userId: userId,
          },
        }
      );
      alert("Question added successfully!");
    } catch (error) {
      console.error("Error adding question:", error.response?.data || error.message);
      // alert(error.response?.data?.message || "Failed to add question. Please try again.");
    }
  };
  


  return (
    <div className="container mx-auto p-6">
      <div className='flex flex-row justify-between'>
        <NavLink
          to='/ExamList'
          className="flex items-center justify-start px-2 py-2 overflow-x-auto border-2 border-gray-800 rounded-md w-40 ml-5 mb-5 mt-5">
          <FaLessThan className="text-black mr-2" />
          <button>
            <span className="text font-semibold text-black">Previous Page</span>
          </button>
        </NavLink>
        <button 
          onClick={handleOpenPopup} 
          className="flex items-center justify-center px-2 py-2 overflow-x-auto border-2 border-gray-800 rounded-md w-40  mb-5 mt-5">
          Create Question
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Existing Questions</h2>
        {questions.length === 0 ? (
          <p>No questions available for this exam.</p>
        ) : (
          questions.map((questionData, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-lg mb-4">
              <div className="font-medium text-xl">{questionData.question}</div>
              <div className="mt-2">
                {questionData.options.map((option, optIndex) => (
                  <div 
                    key={optIndex}
                    className={`py-2 px-4 rounded mt-2 ${option.correct ? 'bg-green-100 text-black' : 'bg-gray-100'}`} >
                    {option.option}
                  </div>
                ))}
              </div>
              <button 
                onClick={() => handleDelete(questionData.questionId)} // Handle delete action
                className="mt-2 p-2 bg-red-500 text-white rounded hover:bg-red-600">
                <FaTrashAlt /> 
              </button>
              <button 
                onClick={() => handleEdit(questionData)} // Handle edit action
                className="mt-2 p-2 bg-green-500 text-white rounded hover:bg-green-600">
                <FaEdit /> 
              </button>
            </div>
          ))
        )}
      </div>

      {popUp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-3/4 mx-auto">
            <div className="text-white flex justify-between items-center mb-4 bg-black p-2 rounded">
              <div className="text-xl font-semibold">Create Question</div>
              <div onClick={handleClosePopup} className="cursor-pointer text-lg font-bold">X</div>
            </div>

            {error && <p className="text-red-600 mt-2">{error}</p>}

            <div className="mt-4">
              <label className="block font-medium">Question</label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="border border-black w-full p-4 rounded mt-2 h-32"
              />
              <div className='grid grid-cols-2 gap-4'>
                <div className="mt-4">
                  <label className="block font-medium">Option A</label>
                  <input
                    type="text"
                    value={options.optionA}
                    onChange={(e) => setOptions({ ...options, optionA: e.target.value })}
                    className="border border-black w-full p-2 rounded mt-2"
                  />
                </div>

                <div className="mt-4">
                  <label className="block font-medium">Option B</label>
                  <input
                    type="text"
                    value={options.optionB}
                    onChange={(e) => setOptions({ ...options, optionB: e.target.value })}
                    className="border border-black w-full p-2 rounded mt-2"
                  />
                </div>

                <div className="mt-4">
                  <label className="block font-medium">Option C</label>
                  <input
                    type="text"
                    value={options.optionC}
                    onChange={(e) => setOptions({ ...options, optionC: e.target.value })}
                    className="border border-black w-full p-2 rounded mt-2"
                  />
                </div>

                <div className="mt-4">
                  <label className="block font-medium">Option D</label>
                  <input
                    type="text"
                    value={options.optionD}
                    onChange={(e) => setOptions({ ...options, optionD: e.target.value })}
                    className="border border-black w-full p-2 rounded mt-2"
                  />
                </div>
              </div>

              <div className="mt-4">
                <p className="font-medium">Select Correct Option</p>
                <div className="flex space-x-4">
                  {['A', 'B', 'C', 'D'].map((opt) => (
                    <label key={opt} className="flex items-center">
                      <input
                        type="radio"
                        name="correctOption"
                        value={opt}
                        checked={correctOption === opt}  // Ensure the correct option is selected
                        onChange={(e) => setCorrectOption(e.target.value)}
                        className="mr-2"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={handleClosePopup}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                {editingQuestion ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateQuestion;