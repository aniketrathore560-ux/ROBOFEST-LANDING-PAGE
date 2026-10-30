import React, { useState } from 'react';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { EventsSection } from './components/EventsSection';
import { Registration } from './components/Registration';
import { RegistrationPage } from './components/RegistrationPage';
import { Footer } from './components/Footer';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'register'>('landing');
  const [selectedEventId, setSelectedEventId] = useState<string>('robo-wars');

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRegisterClick = () => {
    setCurrentView('register');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreEventsClick = () => {
    if (currentView !== 'landing') {
      setCurrentView('landing');
      setTimeout(() => scrollToSection('events'), 50);
    } else {
      scrollToSection('events');
    }
  };

  const handleSelectEventForRegistration = (eventId: string) => {
    setSelectedEventId(eventId);
    setCurrentView('register');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    setCurrentView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col relative selection:bg-[#00E5FF]/25 selection:text-white">
      {/* Subtle cybernetic particle backdrop */}
      <BackgroundCanvas />

      {/* Navbar with view-aware navigation */}
      <Navbar
        currentView={currentView}
        onNavigateHome={handleNavigateHome}
        onRegisterClick={handleRegisterClick}
      />

      {/* Main Content Area */}
      <main className="flex-grow pt-0">
        {currentView === 'landing' ? (
          <>
            {/* Hero Section with live 30-day countdown & real photo */}
            <Hero
              onRegisterClick={handleRegisterClick}
              onExploreEventsClick={handleExploreEventsClick}
            />

            {/* About Robofest Section */}
            <About />

            {/* Events Section with authentic competition photos & category filters */}
            <EventsSection onSelectEventForRegistration={handleSelectEventForRegistration} />

            {/* In-page Registration Section (Leader First -> Remaining Members) */}
            <Registration
              selectedEventId={selectedEventId}
              onEventChange={setSelectedEventId}
              onOpenDedicatedPage={() => setCurrentView('register')}
            />
          </>
        ) : (
          /* Dedicated Registration Page (Leader First -> Remaining Members -> Live Laptop Pass) */
          <div className="pt-20">
            <RegistrationPage
              initialEventId={selectedEventId}
              onBackToHome={handleNavigateHome}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
