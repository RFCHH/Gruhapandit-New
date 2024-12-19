import React from "react";

const SubjectDetails = ({
  subjects,
  setSubjects,
  isModalOpen,
  setIsModalOpen,
  category,
  setCategory,
  subject,
  setSubject,
}) => {
  const handleAddSubject = () => {
    if (category && subject) {
      setSubjects([...subjects, { category, subject, isActive: true }]);
      setCategory("");
      setSubject("");
      setIsModalOpen(false);
    } else {
      alert("Please fill out both fields.");
    }
  };

  const toggleSubjectStatus = (index) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index].isActive = !updatedSubjects[index].isActive;
    setSubjects(updatedSubjects);
  };

  return (
    <div className="p-4">
      <h3 className="text-cyan-600 font-bold mb-4">Subjects</h3>
      {subjects.length > 0 ? (
        <ul className="list-none pl-0">
          {subjects.map((subj, index) => (
            <li
              key={index}
              className="flex items-center justify-start border-b py-2"
            >
              <div className="flex items-center gap-2 flex-1">
                <span className="font-medium text-gray-700">
                  {subj.category}
                </span>
                <span className="text-gray-600">{subj.subject}</span>
              </div>

              <div className="flex flex-col items-center ml-4">
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={subj.isActive}
                      onChange={() => toggleSubjectStatus(index)}
                      className="sr-only"
                    />
                    <div
                      className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 ${
                        subj.isActive ? "bg-green-600" : "bg-red-600"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 bg-white rounded-full shadow-md transition transform duration-300 ${
                          subj.isActive ? "translate-x-6" : "translate-x-0"
                        }`}
                      />
                    </div>
                  </div>
                </label>
                <span
                  className={`text-xs mt-1 ${
                    subj.isActive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {subj.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No subjects added yet.</p>
      )}

      <button
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
        onClick={() => setIsModalOpen(true)}
      >
        Add Subject
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h4 className="text-lg font-bold mb-4">Add Subject</h4>
            <div>
              <label className="block text-sm font-medium text-[#000000]">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border p-2 rounded mt-1"
              >
                <option value="">Select Category</option>
                <option value="SCHOOL_EDUCATION">School Education</option>
                <option value="UG_PG_EDUCATION">UG/PG Education</option>
                <option value="TECHNICAL_SKILLS">Technical Skills</option>
                <option value="GLOBAL_LANGUAGES">Global Languages</option>
                <option value="COMPETITIVE_EXAMS">Competitive Exams</option>
                <option value="ENTRANCE_EXAMS">Entrance Exams</option>
                <option value="SOFT_SKILLS">Soft Skills</option>
                <option value="HOBBIES">Hobbies</option>
              </select>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-[#000000]">
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter subject"
                className="w-full border p-2 rounded mt-1"
              />
            </div>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
                onClick={(e) => {
                  e.preventDefault();
                  handleAddSubject();
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectDetails;
