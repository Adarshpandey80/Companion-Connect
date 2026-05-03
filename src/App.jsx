// App.js
import React, { useState, useRef, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Nav from './components/Nav';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import CompanionSection from './components/CompanionSection';
import FilterSection from './components/FilterSection';
import Reviews from './components/Reviews';
import Safety from './components/Safety';
import CTA from './components/CTA';
import Footer from './components/Footer';
import ProfileModal from './components/ProfileModal';
import ChatModal from './components/ChatModal';
import BookingModal from './components/BookingModal';
import BookingConfirmation from './components/BookingConfirmation';
import BecomeCompanionForm from './components/BecomeCompanionForm';
import SuccessModal from './components/SuccessModal';
import Toast from './components/Toast';
import About from './pages/About';
import HowItWorksPage from './pages/HowItWorksPage';
import ReviewsPage from './pages/ReviewsPage';
import SafetyGuidelines from './pages/SafetyGuidelines';
import ContactUs from './pages/ContactUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CompanionProfile from './pages/FindCompanion';
import FindCompanions from './pages/FindCompanions';
import { COMPANIONS } from './data/companions';
import './styles/global.css';

function AppContent() {
  const [selectedCompanion, setSelectedCompanion] = useState(null);
  const [chatCompanion, setChatCompanion] = useState(null);
  const [bookingCompanion, setBookingCompanion] = useState(null);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [successName, setSuccessName] = useState(null);
  const [toast, setToast] = useState({ show: false, msg: "" });
  const toastTimer = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const showToast = useCallback((msg) => {
    setToast({ show: true, msg });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast({ show: false, msg }), 3500);
  }, []);

  const openProfile = (c) => {
    setSelectedCompanion(c);
    navigate(`/companion/${c.id}`);
  };
  
  const closeProfile = () => {
    setSelectedCompanion(null);
    navigate('/');
  };
  
  const openForm = () => setShowForm(true);
  const closeForm = () => setShowForm(false);

  const scrollToCompanions = () => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById("companions")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById("companions")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBook = (name) => showToast(`🎉 Booking request sent to ${name.split(" ")[0]}!`);
  const handleChat = () => { setChatCompanion(selectedCompanion); setSelectedCompanion(null); };
  const handleFormSuccess = (name) => { setShowForm(false); setSuccessName(name); };
  
  const handleHire = (companion) => {
    setBookingCompanion(companion);
    setSelectedCompanion(null);
  };
  
  const handleCloseBooking = () => {
    setBookingCompanion(null);
  };
  
  const handleConfirmBooking = (booking) => {
    setConfirmedBooking(booking);
    setBookingCompanion(null);
  };
  
  const handleCloseConfirmation = () => {
    setConfirmedBooking(null);
  };

  return (
    <>
      <Nav onBecome={openForm} scrollToSection={scrollToSection} />
      <Routes>
        <Route path="/" element={
          <>
            <Hero onFind={scrollToCompanions} onBecome={openForm} />
            <div className="h-16" />
            <HowItWorks />
            <div className="h-16" />
            <CompanionSection onOpen={openProfile} />
            <div className="h-16" />
            <FilterSection onShowToast={showToast} />
            <div className="h-16" />
            <Reviews />
            <div className="h-16" />
            <Safety />
            <div className="h-16" />
            <CTA onFind={scrollToCompanions} onBecome={openForm} />
          </>
        } />
        <Route path="/about" element={<About />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/safety-guidelines" element={<SafetyGuidelines />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/find-companions" element={<FindCompanions companions={COMPANIONS} onOpen={openProfile} />} />
        <Route path="/companion/:id" element={<CompanionProfile companions={COMPANIONS} onBook={handleBook} onChat={handleChat} />} />
      </Routes>
      <Footer onBecome={openForm} />

      {selectedCompanion && (
        <ProfileModal companion={selectedCompanion} onClose={closeProfile} onBook={handleBook} onChat={handleChat} onHire={handleHire} />
      )}
      {bookingCompanion && (
        <BookingModal companion={bookingCompanion} onClose={handleCloseBooking} onConfirm={handleConfirmBooking} />
      )}
      {confirmedBooking && (
        <BookingConfirmation booking={confirmedBooking} onClose={handleCloseConfirmation} />
      )}
      {chatCompanion && (
        <ChatModal companion={chatCompanion} onClose={() => setChatCompanion(null)} />
      )}
      {showForm && (
        <BecomeCompanionForm onClose={closeForm} onSuccess={handleFormSuccess} />
      )}
      {successName && (
        <SuccessModal name={successName} onClose={() => setSuccessName(null)} />
      )}
      {toast.show && <Toast message={toast.msg} visible={toast.show} />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;