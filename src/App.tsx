/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UserState, Manuscript } from './types';
import {
  MOCK_MANUSCRIPT_STATE_B,
  MOCK_MANUSCRIPT_STATE_C,
} from './data/mockData';

import { Sidebar } from './components/Sidebar';
import { TopSearchBar } from './components/TopSearchBar';
import { DashboardStatsBar } from './components/DashboardStatsBar';
import { HeroIntakeCard } from './components/HeroIntakeCard';
import { RecommendationResult } from './components/RecommendationResult';
import { ManuscriptsWidget } from './components/ManuscriptsWidget';
import { OrdersWidget } from './components/OrdersWidget';
import { ExploreEditageBanner } from './components/ExploreEditageBanner';
import { Footer } from './components/Footer';

import { InstantQuoteModal } from './components/InstantQuoteModal';
import { WhyRecommendedModal } from './components/WhyRecommendedModal';
import { CurrentVsNewModal } from './components/CurrentVsNewModal';
import { 
  ShieldCheck, 
  MessageSquare, 
  Award, 
  Check, 
  Sparkles
} from 'lucide-react';

export default function App() {
  const [currentState, setCurrentState] = useState<UserState>('STATE_B');
  const [activeTab, setActiveTab] = useState('dashboard');

  // Intake banner state
  const [activeManuscript, setActiveManuscript] = useState<Manuscript | null>(
    MOCK_MANUSCRIPT_STATE_B
  );
  const [selectedStage, setSelectedStage] = useState<string>('complete');
  const [selectedHelp, setSelectedHelp] = useState<string>('Improve scientific clarity');
  const [wordCount, setWordCount] = useState<number>(11840);
  const [speed, setSpeed] = useState<'standard' | 'express' | 'urgent'>('standard');

  // Add-ons state
  const [addons, setAddons] = useState({
    formatting: true,
    journalSelection: false,
    graphicalAbstract: false,
    similarityCheck: true,
  });

  // Modals state
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteServiceId, setQuoteServiceId] = useState('premium_editing');
  const [isWhyRecommendedOpen, setIsWhyRecommendedOpen] = useState(false);
  const [whyServiceId, setWhyServiceId] = useState('premium_editing');
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [reEditingAlert, setReEditingAlert] = useState<string | null>(null);

  // Switch persona state
  const handleSelectState = (state: UserState) => {
    setCurrentState(state);
    if (state === 'STATE_A') {
      setActiveManuscript(null);
      setSelectedStage('writing');
      setSelectedHelp('Improve English and readability');
      setWordCount(8500);
    } else if (state === 'STATE_B') {
      setActiveManuscript(MOCK_MANUSCRIPT_STATE_B);
      setSelectedStage('complete');
      setSelectedHelp('Improve scientific clarity');
      setWordCount(11840);
    } else if (state === 'STATE_C') {
      setActiveManuscript(MOCK_MANUSCRIPT_STATE_C);
      setSelectedStage('presubmission');
      setSelectedHelp('Choose the right journal');
      setWordCount(12482);
    }
  };

  const handleUploadFile = (fileInfo: { name: string; size: string; words: number }) => {
    const newMs: Manuscript = {
      id: 'ms-' + Math.floor(1000 + Math.random() * 9000),
      fileName: fileInfo.name,
      fileSize: fileInfo.size,
      wordCount: fileInfo.words,
      uploadedAt: 'Today',
      lastUpdated: 'Just now',
      subjectArea: 'Medicine & Life Sciences',
      stage: 'preparation',
      statusText: 'Manuscript uploaded · Ready for matching',
    };
    setActiveManuscript(newMs);
    setWordCount(fileInfo.words);
    if (currentState === 'STATE_A') {
      setCurrentState('STATE_B');
    }
  };

  const handleToggleAddon = (key: 'formatting' | 'journalSelection' | 'graphicalAbstract' | 'similarityCheck') => {
    setAddons((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleOpenQuote = (serviceId: string) => {
    setQuoteServiceId(serviceId);
    setIsQuoteOpen(true);
  };

  const handleOpenWhyRecommended = (serviceId: string) => {
    setWhyServiceId(serviceId);
    setIsWhyRecommendedOpen(true);
  };

  const handleRequestReEditing = () => {
    setReEditingAlert('Order #EDT-89421');
    setTimeout(() => setReEditingAlert(null), 4000);
  };

  const isReturningUser = currentState === 'STATE_C';

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex font-sans selection:bg-[#0052CC] selection:text-white">
      
      {/* 1. LEFT SIDEBAR MENU (Authentic Blue & White SaaS Navigation) */}
      <Sidebar
        currentState={currentState}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenReEditingModal={handleRequestReEditing}
        onOpenQuote={() => handleOpenQuote('premium_editing')}
      />

      {/* 2. MAIN CONTENT VIEWPORT */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Header Bar */}
        <TopSearchBar
          currentState={currentState}
          onSelectState={handleSelectState}
          onSelectService={(serviceName) => {
            const mapped = serviceName.toLowerCase().includes('journal')
              ? 'journal_selection'
              : 'premium_editing';
            handleOpenQuote(mapped);
          }}
          onOpenQuickQuote={() => handleOpenQuote('premium_editing')}
          onOpenComparison={() => setIsComparisonOpen(true)}
        />

        {/* Dashboard Main Workspace */}
        <main className="px-4 sm:px-6 py-3.5 max-w-7xl w-full mx-auto space-y-3.5">

          {/* Re-Editing Trigger Banner if activated */}
          {reEditingAlert && (
            <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center justify-between shadow-2xs">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  365-Day Free Re-Editing portal unlocked for <strong>{reEditingAlert}</strong>. Ready to accept revised manuscript drafts or reviewer response files at zero extra charge.
                </span>
              </span>
              <button onClick={() => setReEditingAlert(null)} className="font-bold hover:underline">
                Dismiss
              </button>
            </div>
          )}

          {/* 1. UPLOAD & SEARCH SECTION ON FIRST SCROLL (Matching user reference image exactly) */}
          <HeroIntakeCard
            currentState={currentState}
            activeManuscript={activeManuscript}
            onUploadFile={handleUploadFile}
            selectedStage={selectedStage}
            onSelectStage={setSelectedStage}
            selectedHelp={selectedHelp}
            onSelectHelp={setSelectedHelp}
            wordCount={wordCount}
            onChangeWordCount={setWordCount}
            speed={speed}
            onChangeSpeed={setSpeed}
            onSelectServiceFromSearch={(serviceName) => {
              const mapped = serviceName.toLowerCase().includes('journal')
                ? 'journal_selection'
                : 'premium_editing';
              handleOpenQuote(mapped);
            }}
          />

          {/* 2. DYNAMIC PERSONALIZED RECOMMENDATION & COMPLETE SUBMISSION PACKAGE */}
          <div id="recommendation-section">
            <RecommendationResult
              currentState={currentState}
              activeManuscript={activeManuscript}
              selectedStage={selectedStage}
              selectedHelp={selectedHelp}
              wordCount={wordCount}
              speed={speed}
              addons={addons}
              onToggleAddon={handleToggleAddon}
              onOpenQuote={handleOpenQuote}
              onOpenWhyRecommended={handleOpenWhyRecommended}
            />
          </div>

          {/* 3. QUICK STATS SUMMARY (Positioned under recommendation) */}
          <DashboardStatsBar
            currentState={currentState}
            activeManuscript={activeManuscript}
            onOpenReEditingModal={handleRequestReEditing}
            onJumpToOrders={() => {
              document.getElementById('orders-widget')?.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* DASHBOARD WIDGETS GRID (Manuscripts, Orders & Academic Advisor) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
            
            {/* Left 8 cols: Manuscripts & Orders side-by-side */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-3.5">
              
              {/* My Manuscripts Widget */}
              <ManuscriptsWidget
                currentState={currentState}
                activeManuscript={activeManuscript}
                onSelectManuscript={(ms) => {
                  setActiveManuscript(ms);
                  setWordCount(ms.wordCount);
                }}
                onNewUpload={() => {
                  handleUploadFile({
                    name: 'new_study_draft_2026.docx',
                    size: '3.4 MB',
                    words: 9420,
                  });
                }}
              />

              {/* Recent Orders & Deliverables */}
              <OrdersWidget
                currentState={currentState}
                onRequestReEditing={handleRequestReEditing}
                onOpenEnquiry={() => handleOpenQuote('premium_editing')}
              />

            </div>

            {/* Right 4 cols: Academic Advisor Support & Security */}
            <div className="lg:col-span-4 space-y-3">
              
              <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-2xs">
                <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-xs ring-2 ring-emerald-500/50">
                    AT
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-900">Dr. Alan Thornton, PhD</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500" title="Online" />
                    </div>
                    <p className="text-[10px] text-slate-500">Managing Editor · Molecular Oncology</p>
                  </div>
                </div>

                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Have questions about your target journal's instructions for authors? Ask an assigned academic advisor.
                </p>

                <button
                  type="button"
                  onClick={() => alert('Starting live discussion with Dr. Thornton & academic advisory team...')}
                  className="mt-2.5 w-full py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#0052CC]" />
                  <span>Chat with Academic Advisor</span>
                </button>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 space-y-1.5">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>ISO/IEC 27001 Certified Security & 100% NDA</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>PhD Native Editors in 1,200+ Disciplines</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#0052CC] shrink-0" />
                  <span>365-Day Unlimited Free Re-Editing Guarantee</span>
                </div>
              </div>

            </div>

          </div>

          {/* EXACT EXPLORE BANNER MATCHING USER'S SCREENSHOT:
              EXPLORE EDITAGE
              Looking for something else?
              Editing · Publication Support · Research Tools · Graphics & Illustrations · Translation
              [ View all solutions → ]
          */}
          <ExploreEditageBanner
            onSelectService={(serviceName) => {
              const mapped = serviceName.toLowerCase().includes('journal')
                ? 'journal_selection'
                : 'premium_editing';
              handleOpenQuote(mapped);
            }}
          />

        </main>

        {/* Footer */}
        <Footer />

      </div>

      {/* MODALS */}
      <InstantQuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        serviceId={quoteServiceId}
        initialWordCount={activeManuscript?.wordCount || wordCount}
        activeManuscript={activeManuscript}
        onUploadManuscript={handleUploadFile}
      />

      <WhyRecommendedModal
        isOpen={isWhyRecommendedOpen}
        onClose={() => setIsWhyRecommendedOpen(false)}
        serviceId={whyServiceId}
        onProceedToQuote={() => {
          setIsQuoteOpen(true);
        }}
      />

      <CurrentVsNewModal
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        onSwitchState={handleSelectState}
      />

    </div>
  );
}
