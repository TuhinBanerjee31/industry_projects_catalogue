import { useState } from "react";
import { allCertificatesData } from "../data/allCertificatesData";

// Hardcoded JSON data derived from the provided CSV snippet
const certificateData = allCertificatesData;

// console.log("length: ", certificateData.length)

function AllCertifications() {
  // State to hold the search term
  const [searchTerm, setSearchTerm] = useState("");

  // Extract unique headers for the table
  const headers =
    certificateData.length > 0 ? Object.keys(certificateData[0]) : [];

  // Filter the data based on the search term
  const filteredData = certificateData.filter((row) => {
    // If search term is empty, show all data
    if (searchTerm === "") {
      return true;
    }
    // Check if any value in the row (case-insensitive) includes the search term
    return Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen p-4 sm:p-8 font-sans antialiased">
      <header className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 tracking-tight leading-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Professional Certificates Overview
          </span>
        </h1>
        <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
          Explore the mandatory and optional certifications for various roles.
        </p>
      </header>

      {/* Search Input Field */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search certificates..."
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out text-gray-700"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto bg-white shadow-xl border rounded-xl p-4 md:p-6 lg:p-8">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider rounded-tl-lg first:rounded-bl-none last:rounded-tr-lg last:rounded-br-none"
                >
                  {/* Handle the specific naming for "Mandatory" columns for better display */}
                  {header === "MandatoryCert1"
                    ? "Mandatory (1)"
                    : header === "MandatoryCert2"
                    ? "Mandatory (2)"
                    : header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {filteredData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-blue-50 transition-colors duration-200"
              >
                {headers.map((header, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-4 py-3 whitespace-normal text-sm text-gray-800 break-words"
                  >
                    {row[header] || "-"} {/* Display '-' for empty values */}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {filteredData.length === 0 && searchTerm !== "" && (
          <div className="text-center py-8 text-gray-600 text-lg">
            No results found for "{searchTerm}".
          </div>
        )}
      </div>

      {/* <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>
          &copy; {new Date().getFullYear()} Certificate Display App. All rights
          reserved.
        </p>
      </footer> */}
    </div>
  );
}

export default AllCertifications;
