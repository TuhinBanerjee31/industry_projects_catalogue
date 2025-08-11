import React, { useState } from "react";
import { internationalProjects } from "../data/internationalProjects";

export default function IntProjects() {
  // State and filtering logic (unchanged)
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  const categories = [...new Set(internationalProjects.map((p) => p.category))];
  const locations = [...new Set(internationalProjects.map((p) => p.location))];

  const filteredProjects = internationalProjects.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (category ? p.category === category : true) &&
      (location ? p.location === location : true)
  );

  return (
    <div className="p-5 font-sans">
      <h1 className="text-2xl font-bold mb-4 text-center md:text-left">
        International Project Table
      </h1>
      <div className="mb-4 flex flex-col sm:flex-row gap-4">
        {/* Search and filter inputs (unchanged) */}
        <input
          type="text"
          placeholder="Search by project name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/3 p-2 border border-gray-300 rounded shadow-sm"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full sm:w-1/3 p-2 border border-gray-300 rounded shadow-sm"
        >
          <option value="">All Categories</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full sm:w-1/3 p-2 border border-gray-300 rounded shadow-sm"
        >
          <option value="">All Locations</option>
          {locations.map((loc, idx) => (
            <option key={idx} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">SL No.</th>
              <th className="border border-gray-300 p-2 text-left">Name</th>
              <th className="border border-gray-300 p-2 text-left">
                Description
              </th>
              <th className="border border-gray-300 p-2 text-left">Category</th>
              <th className="border border-gray-300 p-2 text-left">Area</th>
              <th className="border border-gray-300 p-2 text-left">Budget</th>
              <th className="border border-gray-300 p-2 text-left">Deadline</th>
              <th className="border border-gray-300 p-2 text-left">Location</th>
              {/* Added new table header */}
              <th className="border border-gray-300 p-2 text-left">
                Exact Address
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-2">{item.id}</td>
                  <td className="border border-gray-300 p-2">{item.name}</td>
                  <td className="border border-gray-300 p-2">
                    {item.description}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {item.category}
                  </td>
                  <td className="border border-gray-300 p-2">{item.area}</td>
                  <td className="border border-gray-300 p-2">{item.budget}</td>
                  <td className="border border-gray-300 p-2">
                    {item.deadline}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {item.location}
                  </td>
                  {/* Added new table cell for the exact address */}
                  <td className="border border-gray-300 p-2">
                    {item.exact_address}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                {/* Updated colSpan to 9 */}
                <td colSpan={9} className="text-center py-4">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}