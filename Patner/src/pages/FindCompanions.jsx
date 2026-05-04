import React from 'react';
import Nav from '../components/Nav';
import FilterSection from '../components/FilterSection';
import CompanionSection from '../components/CompanionSection';

function FindCompanions({ onOpen, onHire }) {
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <div className="pt-20 px-4">
        <FilterSection />
        <CompanionSection onOpen={onOpen} onHire={onHire} />
      </div>
    </div>
  );
}

export default FindCompanions;
