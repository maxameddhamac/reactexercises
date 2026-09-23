import { useState } from "react";

export default function StudentRegistration() {
  const [formData, setFormData] = useState({
    studentName: "ww",
    email: "",
    gradeLevel: "",
    subjects: [],
  });

  const [errors, setErrors] = useState({});

  const availableSubjects = ["Mathematics", "Science", "English"];

  // Handle inputs (Text, Select)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Sifaynta qaladka marka la qandhiidho input-ka
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Handle Subjects Checkboxes
  const handleSubjectChange = (subject) => {
    setFormData((prev) => {
      const updatedSubjects = prev.subjects.includes(subject)
        ? prev.subjects.filter((s) => s !== subject)
        : [...prev.subjects, subject];

      if (updatedSubjects.length > 0 && errors.subjects) {
        setErrors((prevErrors) => ({ ...prevErrors, subjects: "" }));
      }

      return { ...prev, subjects: updatedSubjects };
    });
  };

  // Validation Check
  const validateForm = () => {
    const newErrors = {};

    if (!formData.studentName.trim()) {
      newErrors.studentName = "Student name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!formData.gradeLevel) {
      newErrors.gradeLevel = "Please select a grade";
    }

    if (formData.subjects.length === 0) {
      newErrors.subjects = "Select at least one subject";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Registered Student:", formData);
      alert("Registration Successful!");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 w-full max-w-[440px]">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Student Registration
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Student Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Student Name
            </label>
            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none ${
                errors.studentName ? "border-red-500" : "border-gray-800"
              }`}
            />
            {errors.studentName && (
              <p className="text-xs text-red-500 mt-1">{errors.studentName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none ${
                errors.email
                  ? "border-blue-600 ring-1 ring-blue-600"
                  : "border-gray-800"
              }`}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Grade Level Dropdown */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Grade Level
            </label>
            <select
              name="gradeLevel"
              value={formData.gradeLevel}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md text-sm bg-white text-gray-800 focus:outline-none ${
                errors.gradeLevel ? "border-gray-800" : "border-gray-800"
              }`}
            >
              <option value="">Select Grade</option>
              <option value="Grade 1">Grade 1</option>
              <option value="Grade 2">Grade 2</option>
              <option value="Grade 3">Grade 3</option>
            </select>
            {errors.gradeLevel && (
              <p className="text-xs text-red-500 mt-1">{errors.gradeLevel}</p>
            )}
          </div>

          {/* Subjects Interest */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">
              Subjects Interest
            </label>
            <div className="space-y-2">
              {availableSubjects.map((subject) => (
                <label
                  key={subject}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.subjects.includes(subject)}
                    onChange={() => handleSubjectChange(subject)}
                    className="w-4 h-4 rounded border-gray-400 cursor-pointer"
                  />
                  <span className="text-xs font-medium text-gray-700">
                    {subject}
                  </span>
                </label>
              ))}
            </div>
            {errors.subjects && (
              <p className="text-xs text-red-500 mt-1.5">{errors.subjects}</p>
            )}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-[#ff2b56] hover:bg-[#e02449] text-white font-medium py-2.5 rounded-lg text-sm transition-colors mt-4"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
