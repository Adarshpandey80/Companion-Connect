// pages/FindCompanions.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CompanionCard from '../components/CompanionCard';
import FilterSection from '../components/FilterSection';

function FindCompanions({ companions, onOpen }) {
  const [filteredCompanions, setFilteredCompanions] = useState(companions);

  const handleFilter = (filters) => {
    const filtered = companions.filter(c => {
      if (filters.gender !== "All" && c.gender !== filters.gender) return false;
      if (filters.city !== "Any" && c.location !== filters.city) return false;
      if (filters.interest && !c.tags.some(t => t.toLowerCase().includes(filters.interest.toLowerCase()))) return false;
      if (c.rating < filters.rating) return false;
      if (c.price > filters.price) return false;
      return true;
    });
    setFilteredCompanions(filtered);
  };

  return (
    <div className="min-h-screen pt-32 px-[6%] pb-20 bg-gradient-to-br from-[#fff9f5] to-[#f7f0ff]">
      <div className="max-w-7xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-[#5e3d8c] mb-8 hover:text-[#e879a0] transition-colors">
          ← Back to Home
        </Link>
        <h1 className="text-4xl md:text-5xl font-['Playfair_Display',serif] text-[#2d1b4e] mb-4">Find Your Companion</h1>
        <p className="text-[#6b5b7a] text-lg mb-12">
          Browse through our verified companions and find your perfect match for any occasion.
        </p>
        
        {/* Filter Section */}
        <FilterSection onFilter={handleFilter} />
        
        {/* Results */}
        <div className="mt-12">
          <h2 className="text-2xl font-['Playfair_Display',serif] text-[#2d1b4e] mb-6">
            {filteredCompanions.length} Companions Available
          </h2>
          {filteredCompanions.length === 0 ? (
            <div className="text-center py-16 text-[#9478ab] text-lg">
              No companions match your filters. Try adjusting your search criteria!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCompanions.map(companion => (
                <CompanionCard key={companion.id} c={companion} onOpen={onOpen} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FindCompanions;