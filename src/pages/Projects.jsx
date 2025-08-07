import { useState, useEffect } from "react";
import { otherProjects } from "../data/otherProjects";
import { portInfrastructureProjects } from "../data/portInfrastructureProjects";
import { solarEnergyProjects } from "../data/solarEnergyProjects";
import { thermalEnergyProjects } from "../data/thermalEnergyProjects";
import { windEnergyProjects } from "../data/windEnergyProjects";
import { newProjects } from "../data/newProjects";

const Projects = () => {
  const initialData = [
    ...otherProjects,
    ...portInfrastructureProjects,
    ...solarEnergyProjects,
    ...thermalEnergyProjects,
    ...windEnergyProjects,
    ...newProjects,
  ];

  const initialCategories = [
    "Aviation",
    "Commercial Infrastructure",
    "Industrial Infrastructure",
    "Port Infrastructure",
    "Railways",
    "Renewable Energy",
    "Roads and Bridges",
    "Roads and Highways",
    "Urban Infrastructure",
    "Urban Transportation",
    "Water Infrastructure",
    "Solar Energy",
    "Thermal Energy",
    "Wind Energy",
  ];
  const initailLocations = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep",
    "Delhi",
    "Puducherry",
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [filteredData, setFilteredData] = useState(initialData); // State for filteredData

  const categories = [...new Set(initialCategories.map((item) => item))];
  const locations = [...new Set(initailLocations.map((item) => item))];

  console.log(categories);
  console.log(locations);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  // Update filteredData whenever any filter changes
  useEffect(() => {
    console.log("useEffect triggered");

    const newFilteredData = initialData.filter((item) => {
      const matchesSearchQuery =
        item.name.toLowerCase().includes(searchQuery) ||
        item.description.toLowerCase().includes(searchQuery) ||
        item.category.toLowerCase().includes(searchQuery) ||
        item.area.toLowerCase().includes(searchQuery) ||
        item.budget.toLowerCase().includes(searchQuery) ||
        item.deadline.toLowerCase().includes(searchQuery) ||
        item.location.toLowerCase().includes(searchQuery);

      const matchesCategory = selectedCategory
        ? item.category === selectedCategory
        : true;

      const matchesLocation = selectedLocation
        ? item.location.toLowerCase().includes(selectedLocation.toLowerCase())
        : true;

      return matchesSearchQuery && matchesCategory && matchesLocation;
    });

    console.log("Filtered data inside useEffect:", newFilteredData); // Log filtered data

    setFilteredData(newFilteredData); // Set filtered data to state
  }, [searchQuery, selectedCategory, selectedLocation]); // Dependencies for re-filtering

  console.log(filteredData);

  return (
    <div className="p-5 font-sans">
      <h1 className="text-2xl font-bold mb-4 text-center md:text-left">
        Project Table
      </h1>
      <div className="mb-4 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full sm:w-1/3 p-2 border border-gray-300 rounded shadow-sm"
        />
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-full sm:w-1/3 p-2 border border-gray-300 rounded shadow-sm"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          value={selectedLocation}
          onChange={handleLocationChange}
          className="w-full sm:w-1/3 p-2 border border-gray-300 rounded shadow-sm"
        >
          <option value="">All Locations</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
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
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={item.id || index} className="hover:bg-gray-50">
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
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-4">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Projects;
