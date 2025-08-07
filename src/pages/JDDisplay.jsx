import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { jdWithQuestionData } from "../data/jdWithQuestionsData";

const JDDisplay = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedCategory, setSelectedCategory] = useState("Easy");

  const { id } = useParams();
  const data = jdWithQuestionData[id];

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Link to="/" className="inline-block mt-8 text-blue-500 hover:underline">
        ← Back to list
      </Link>
      <h1 className="text-3xl font-bold mb-2">{data.jobTitle}</h1>
      <p className="text-gray-600 mb-4">Department: {data.department}</p>
      <p className="text-gray-600 mb-4">Reports To: {data.reportsTo}</p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Job Summary</h2>
        <p className="text-gray-700">{data.jobSummary}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Responsibilities</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          {data.responsibilities.map((item, index) => (
            <li key={`resp-${index}`}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Qualifications</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          {data.qualifications.map((item, index) => (
            <li key={`qual-${index}`}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Skills & Competencies</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          {data.skillsAndCompetencies.map((item, index) => (
            <li key={`skill-${index}`}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Interview Questions</h2>
        <div className="flex gap-4 mb-4">
          {Object.keys(data.categories).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <ul className="space-y-4">
          {data.categories[selectedCategory].map((q, index) => (
            <li
              key={`q-${index}`}
              className="border border-gray-300 p-4 rounded shadow-sm"
            >
              <p className="font-semibold text-blue-700">
                Q{index + 1}. {q.question}
              </p>
              <p className="text-gray-700 mt-1">
                <span className="font-medium text-green-700">Answer:</span>{" "}
                {q.answer}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default JDDisplay;
