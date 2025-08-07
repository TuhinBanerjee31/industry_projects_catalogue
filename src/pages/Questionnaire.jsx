import { useState } from 'react';
import { ChevronDown, ChevronUp, Search, Filter } from 'lucide-react';
import { questionsData } from '../data/questionsData';

export default function Questionnaire() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [expandedDesignation, setExpandedDesignation] = useState(null);
  const [expandedQuestions, setExpandedQuestions] = useState({});

  // Filter data based on search term
  const filteredData = questionsData.filter(d => 
    d.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Toggle designation accordion
  const toggleDesignation = (idx) => {
    setExpandedDesignation(expandedDesignation === idx ? null : idx);
  };

  // Toggle question accordion
  const toggleQuestion = (designationIdx, categoryName, questionIdx) => {
    const key = `${designationIdx}-${categoryName}-${questionIdx}`;
    setExpandedQuestions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Check if question is expanded
  const isQuestionExpanded = (designationIdx, categoryName, questionIdx) => {
    const key = `${designationIdx}-${categoryName}-${questionIdx}`;
    return expandedQuestions[key];
  };

  return (
    <div className="p-4 max-w-4xl mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 rounded-lg shadow-lg mb-6">
        <h1 className="text-3xl font-bold text-white">Oil & Gas Interview Questions</h1>
        <p className="text-blue-100 mt-2">comprehensive question bank</p>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input 
            type="text" 
            className="pl-10 p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
            placeholder="Search by designation..." 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)} 
          />
        </div>
        <div className="relative w-full md:w-64">
          <Filter className="absolute left-3 top-3 text-gray-400" size={18} />
          <select 
            className="pl-10 p-2 border border-gray-300 rounded-lg w-full appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white" 
            value={categoryFilter} 
            onChange={e => setCategoryFilter(e.target.value)}
          >
            <option value="All">All Difficulty Levels</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4 text-gray-600">
        Found {filteredData.length} designation{filteredData.length !== 1 ? 's' : ''}
      </div>

      {/* Questions Content */}
      {filteredData.length > 0 ? (
        filteredData.map((designation, idx) => (
          <div key={idx} className="mb-4 bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300">
            {/* Designation Header */}
            <div 
              className="flex justify-between items-center p-4 cursor-pointer bg-blue-50 hover:bg-blue-100 transition-colors"
              onClick={() => toggleDesignation(idx)}
            >
              <h2 className="text-xl font-semibold text-blue-800">{designation.designation}</h2>
              {expandedDesignation === idx ? 
                <ChevronUp className="text-blue-600" size={20} /> : 
                <ChevronDown className="text-blue-600" size={20} />
              }
            </div>

            {/* Categories and Questions */}
            {expandedDesignation === idx && (
              <div className="p-4 transition-all duration-500 ease-in-out">
                {Object.entries(designation.categories).map(([cat, questions]) => (
                  categoryFilter === 'All' || categoryFilter === cat ? (
                    <div key={cat} className="mb-6">
                      <h3 className="font-medium text-lg text-blue-600 border-b border-blue-100 pb-2 mb-3">
                        {cat} Questions <span className="text-sm text-gray-500">({questions.length})</span>
                      </h3>
                      <ul className="space-y-3">
                        {questions.map((q, qIdx) => (
                          <li key={qIdx} className="border border-gray-100 rounded-lg shadow-sm overflow-hidden">
                            <div 
                              className="p-3 bg-gray-50 cursor-pointer flex justify-between items-center hover:bg-gray-100 transition-colors"
                              onClick={() => toggleQuestion(idx, cat, qIdx)}
                            >
                              <div className="font-medium text-gray-800">{q.question}</div>
                              {isQuestionExpanded(idx, cat, qIdx) ? 
                                <ChevronUp className="text-gray-500" size={18} /> : 
                                <ChevronDown className="text-gray-500" size={18} />
                              }
                            </div>
                            {isQuestionExpanded(idx, cat, qIdx) && (
                              <div className="p-3 bg-white border-t border-gray-100 animate-fadeIn">
                                <p className="text-gray-700">{q.answer}</p>
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null
                ))}
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="text-center py-8 bg-white rounded-lg shadow-md">
          <p className="text-gray-500">No results found. Try a different search term.</p>
        </div>
      )}
    </div>
  );
}