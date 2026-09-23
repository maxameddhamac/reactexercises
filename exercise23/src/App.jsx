import { useState } from "react";

export default function DeveloperApplicationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "",
    yearsOfExperience: "",
    skills: [],
    agreeToTerms: false,
    receiveNotifications: false,
  });

  const availableSkills = [
    "React",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "Python",
    "Java",
    "UI Design",
    "API Development",
  ];

  // Handle inputs (Text, Select, Number)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle Skills Checkboxes
  const handleSkillChange = (skill) => {
    setFormData((prev) => {
      const isSelected = prev.skills.includes(skill);
      return {
        ...prev,
        skills: isSelected
          ? prev.skills.filter((s) => s !== skill)
          : [...prev.skills, skill],
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    alert("Application Submitted Successfully!");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 w-full max-w-[480px]">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Developer Application Form
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-500"
              required
            />
          </div>

          {/* Role Dropdown */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white text-gray-700 focus:outline-none focus:border-red-500"
              required
            >
              <option value="" disabled>
                Select a role
              </option>
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="Backend Developer">Backend Developer</option>
              <option value="Fullstack Developer">Fullstack Developer</option>
              <option value="UI/UX Designer">UI/UX Designer</option>
            </select>
          </div>

          {/* Years of Experience */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Years of Experience
            </label>
            <input
              type="number"
              name="yearsOfExperience"
              value={formData.yearsOfExperience}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-500"
              required
            />
          </div>

          {/* Skills Checklist Grid */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-2">
              Skills
            </label>
            <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
              {availableSkills.map((skill) => (
                <label
                  key={skill}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.skills.includes(skill)}
                    onChange={() => handleSkillChange(skill)}
                    className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500 cursor-pointer"
                  />
                  <span className="text-xs font-medium text-gray-600">
                    {skill}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Checkboxes Section */}
          <div className="space-y-2 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500 cursor-pointer"
                required
              />
              <span className="text-xs text-gray-600">
                I agree to the terms and conditions
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="receiveNotifications"
                checked={formData.receiveNotifications}
                onChange={handleChange}
                className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500 cursor-pointer"
              />
              <span className="text-xs text-gray-600">
                Receive notifications about new opportunities
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#e11d48] hover:bg-[#be123c] text-white font-medium py-2.5 rounded-lg text-sm transition-colors mt-4"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}
