import { useState } from "react";

export default function UserForm() {
  // 1. Single state object for all inputs
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "Student",
    agreeToTerms: false,
  });

  // State to store submitted data
  const [submittedData, setSubmittedData] = useState(null);

  // 2. Handle input changes dynamically
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // 3. Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(formData);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-slate-800 text-center">
          User Registration
        </h2>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Input */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          {/* Select Dropdown */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:border-indigo-500"
            >
              <option value="Student">Student</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
            </select>
          </div>

          {/* Checkbox Input */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              name="agreeToTerms"
              id="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
              required
            />
            <label
              htmlFor="agreeToTerms"
              className="text-sm text-slate-600 cursor-pointer"
            >
              I agree to the terms and conditions
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg text-sm transition-colors"
          >
            Submit
          </button>
        </form>

        {/* Display Submitted Data */}
        {submittedData && (
          <div className="mt-6 p-4 bg-slate-100 rounded-xl border border-slate-200 text-sm space-y-2">
            <h3 className="font-bold text-slate-800 text-base border-b border-slate-200 pb-2">
              Submitted Data Output:
            </h3>
            <p>
              <strong className="text-slate-700">Username:</strong>{" "}
              {submittedData.username}
            </p>
            <p>
              <strong className="text-slate-700">Email:</strong>{" "}
              {submittedData.email}
            </p>
            <p>
              <strong className="text-slate-700">Password:</strong>{" "}
              {submittedData.password}
            </p>
            <p>
              <strong className="text-slate-700">Role:</strong>{" "}
              {submittedData.role}
            </p>
            <p>
              <strong className="text-slate-700">Agreed to Terms:</strong>{" "}
              {submittedData.agreeToTerms ? "Yes" : "No"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
