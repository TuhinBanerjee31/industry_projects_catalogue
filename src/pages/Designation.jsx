import { useState } from "react";
import { Link } from "react-router-dom";
import { jdWithQuestionData } from "../data/jdWithQuestionsData";

const Designation = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [jdFilter, setJdFilter] = useState("");
  
    const jdData = jdWithQuestionData.filter((item) => {
      return (
        item.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (jdFilter === "" || item.jobTitle === jdFilter)
      );
    });
  
    // const countries = [...new Set(refineryData.map((item) => item.country))];

  return (
    <div className="min-h-screen p-6">
    <div className="max-w-7xl mx-auto bg-white p-8 rounded-3xl shadow-2xl transition-all duration-300">
      <h1 className="text-4xl font-bold uppercase tracking-wider text-blue-700 mb-8 text-center">
        Designations
      </h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center">
        <input
          type="text"
          placeholder="Search by project name..."
          className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-full px-6 py-3 w-full  text-lg transition-all duration-200"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* <select
          className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-3 py-3 w-full md:w-1/3 text-lg transition-all duration-200 bg-white rounded-md"
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
        >
          <option value="">All Countries</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select> */}
      </div>

      <div className="overflow-x-auto rounded-2xl shadow-md">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-blue-100 text-blue-700 uppercase text-sm leading-normal">
              <th className="px-6 py-4 text-left">Job Title</th>
              <th className="px-6 py-4 text-left">Department</th>
              <th className="px-6 py-4 text-left">Reporting To</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {jdData.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-200 hover:bg-blue-50 transition-all"
              >
                <td className="px-6 py-4 font-semibold">
                  <Link to={`/jd/${jdData.indexOf(item)}`}>
                    {item.jobTitle}
                  </Link>
                </td>
                <td className="px-6 py-4">{item.department}</td>
                <td className="px-6 py-4">{item.reportsTo}</td>
              </tr>
            ))}
            {jdData.length === 0 && (
              <tr>
                <td
                  colSpan="3"
                  className="px-6 py-8 text-center text-gray-400 italic"
                >
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  )
}

export default Designation
