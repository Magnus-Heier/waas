'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useUser } from '@/hooks/useUser';
import { sendMail } from '@/lib/api';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const { isAuthenticated, logout } = useAuth();
  const { user, loading: userLoading } = useUser();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (selectedPackage === 'liten') {
      setSelectedServices(['Liten']);
    } else if (selectedPackage === 'medium') {
      setSelectedServices(['Medium']);
    } else if (selectedPackage === 'stor') {
      setSelectedServices(['Stor']);
    }
  }, [selectedPackage]);

  // Only check authentication after component has mounted to avoid hydration mismatch
  const authenticated = mounted && isAuthenticated();

  const scrollToSection = (e: React.MouseEvent<HTMLElement>, sectionId: string, packageType?: string) => {
    e.preventDefault();
    if (packageType) {
      setSelectedPackage(packageType);
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 125;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToContactWithService = (serviceName: string) => {
    // Add the service to selected services if not already selected
    if (!selectedServices.includes(serviceName)) {
      setSelectedServices([...selectedServices, serviceName]);
    }
    // Scroll to contact section
    const element = document.getElementById('kontakt');
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset + 125;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Convert selectedServices to product string
      // If multiple services selected, join them with comma
      // If none selected, use "Annet" or empty string
      const product = selectedServices.length > 0 
        ? selectedServices.join(', ') 
        : 'Annet';

      await sendMail({
        name,
        email,
        product,
        message,
      });

      setSubmitStatus('success');
      // Reset form
      setName('');
      setEmail('');
      setMessage('');
      setSelectedServices([]);
      setSelectedPackage(null);
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'En feil oppstod. Vennligst prøv igjen.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeSuccessModal = () => {
    setSubmitStatus('idle');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Success Modal */}
      {submitStatus === 'success' && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm"
          onClick={closeSuccessModal}
        >
          <div 
            className="bg-white rounded-lg shadow-xl max-w-md w-full p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeSuccessModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Lukk"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Melding sendt!
              </h3>
              <p className="text-lg text-gray-700 mb-6">
                Meldingen er sendt, vi svarer innen 24 timer.
              </p>
              <button
                onClick={closeSuccessModal}
                className="px-8 py-3 text-base font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center h-20">
            {/* Left: Logo */}
            <div className="flex items-center flex-shrink-0">
              <Link href="/" className="text-2xl font-bold text-gray-900 hover:opacity-80 transition-opacity">
                <span className="text-gray-900">Web</span>
                <span className="text-gray-500">&</span>
                <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">KI</span>
              </Link>
            </div>
            {/* Center: Navigation Links */}
            <div className="flex items-center gap-6 flex-1 justify-center">
              <a
                href="#pakker"
                onClick={(e) => scrollToSection(e, 'pakker')}
                className="px-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Nettsidepakker
              </a>
              <a
                href="#tjenester"
                onClick={(e) => scrollToSection(e, 'tjenester')}
                className="px-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                KI pakker
              </a>
            </div>
            {/* Right: Contact Button */}
            <div className="flex items-center flex-shrink-0">
              <a
                href="#kontakt"
                onClick={(e) => scrollToSection(e, 'kontakt')}
                className="px-6 py-2.5 text-base font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Kontakt
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-6 lg:px-8 min-h-[900px] flex items-center">
        <div className="max-w-4xl mx-auto w-full">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl font-semibold text-gray-900 mb-8 leading-tight">
            Digitalisér bedriften din
            </h1>
            <p className="text-2xl text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
            Ta steget inn i den digitale verden med en profesjonell nettside og smarte KI-løsninger som jobber for deg døgnet rundt
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              {mounted && authenticated ? (
                <Link
                  href="/dashboard"
                  className="px-10 py-5 text-lg font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Dashboard
                </Link>
              ) : (
                <a
                  href="#kontakt"
                  onClick={(e) => scrollToSection(e, 'kontakt')}
                  className="px-10 py-5 text-lg font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Kontakt
                </a>
              )}
              <a
                href="#pakker"
                onClick={(e) => scrollToSection(e, 'pakker')}
                className="px-10 py-5 text-lg font-medium text-gray-900 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Se pakker
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Laptop Display Section - Commented out */}
      {/*
      <section className="py-24 px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-center">
            <div className="relative w-full max-w-4xl">
              <div className="relative bg-gray-300 rounded-t-lg pt-2 pb-8 px-4 shadow-2xl">
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-inner">
                  <div className="bg-gray-900 pt-3 pb-2 px-3">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  <div className="aspect-video bg-white flex items-center justify-center">
                    <div className="text-gray-400 text-lg">
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-2 bg-gray-400 rounded-b-lg"></div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>
      */}

      {/* Om Weboki Section */}
      <section className="py-32 px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 sm:p-16">
            <div className="text-center">
              <h2 className="text-4xl sm:text-5xl font-semibold text-gray-900 mb-4">
                Om Weboki
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-10">
                Basert i Asker - jobber med kunder i hele Norge
              </p>
              <div className="space-y-6 max-w-2xl mx-auto">
                <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                  Weboki er et lite norsk web- og KI-studio som hjelper små bedrifter med enkle, effektive digitale løsninger.
                </p>
                <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                  Vi fokuserer på klare avtaler, fast pris og rask levering — uten komplisert teknisk språk.
                </p>
                <p className="text-lg sm:text-xl text-gray-700 leading-relaxed pt-2">
                  Ta kontakt hvis du vil ta en uforpliktende prat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Website Packages Section */}
      <section id="pakker" className="py-24 px-6 lg:px-8 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-semibold text-gray-900 mb-6">
              Nettsidepakker
            </h2>
            <p className="text-2xl text-gray-700">
              Velg pakken som passer best for deg
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Liten Pakke */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-8 hover:border-gray-900 transition-colors flex flex-col">
              <h3 className="text-2xl font-semibold text-gray-900 mb-8">Liten</h3>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-gray-900 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">1 side</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-gray-900 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Kontaktskjema</span>
                </li>
              </ul>
              <button 
                onClick={(e) => scrollToSection(e, 'kontakt', 'liten')}
                className="w-full px-6 py-3 text-base font-medium text-gray-900 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors mt-auto"
              >
                Velg Liten
              </button>
            </div>

            {/* Medium Pakke */}
            <div className="bg-gray-900 border-2 border-gray-900 rounded-lg p-8 hover:border-gray-700 transition-colors relative flex flex-col">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-1 rounded-full text-sm font-medium">
                Mest populær
              </div>
              <h3 className="text-2xl font-semibold text-white mb-8">Medium</h3>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-white mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-200">Opptil 5 sider</span>
                </li>
                <li className="flex items-start">
                <svg className="w-6 h-6 text-white mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-200">Trafikkanalyse</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-white mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-200">Meny og prisliste</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-white mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-200">Kontaktskjema</span>
                </li>
              </ul>
              <button 
                onClick={(e) => scrollToSection(e, 'kontakt', 'medium')}
                className="w-full px-6 py-3 text-base font-medium text-gray-900 bg-white rounded-lg hover:bg-gray-100 transition-colors mt-auto"
              >
                Velg Medium
              </button>
            </div>

            {/* Stor Pakke */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-8 hover:border-gray-900 transition-colors flex flex-col">
              <h3 className="text-2xl font-semibold text-gray-900 mb-8">Stor</h3>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-gray-900 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Opptil 10 sider</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-gray-900 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Trafikkanalyse</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-gray-900 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Meny og prisliste</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-gray-900 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Kontaktskjema</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-gray-900 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Plus mer</span>
                </li>
              </ul>
              <button 
                onClick={(e) => scrollToSection(e, 'kontakt', 'stor')}
                className="w-full px-6 py-3 text-base font-medium text-gray-900 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors mt-auto"
              >
                Velg Stor
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* KI Pakker Section */}
      <section id="tjenester" className="py-24 px-6 lg:px-8 bg-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-semibold text-gray-900 mb-6">
              KI pakker
            </h2>
            <p className="text-2xl text-gray-700">
              Løsninger for kundeservice, operasjoner og salg
            </p>
          </div>
          
          {/* Customer-facing solutions */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-gray-900 mb-8">Kundeløsninger</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div 
                onClick={() => scrollToContactWithService('Chatbots og virtuelle assistenter')}
                className="bg-white rounded-lg p-8 border border-gray-200 hover:shadow-lg hover:border-gray-900 transition-all cursor-pointer"
              >
                <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Chatbots og virtuelle assistenter</h4>
                <p className="text-gray-700 leading-relaxed">
                  Håndter ofte stilte spørsmål, bestill avtaler, kvalifiser leads og gi 24/7 support uten å ansette flere medarbeidere.
                </p>
              </div>

              <div 
                onClick={() => scrollToContactWithService('AI-drevne e-post systemer')}
                className="bg-white rounded-lg p-8 border border-gray-200 hover:shadow-lg hover:border-gray-900 transition-all cursor-pointer"
              >
                <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">AI-drevne e-post systemer</h4>
                <p className="text-gray-700 leading-relaxed">
                  Utkast til svar, kategorisering av innkommende meldinger og flagging av urgente elementer.
                </p>
              </div>

              <div 
                onClick={() => scrollToContactWithService('Voice AI for telefonsvar')}
                className="bg-white rounded-lg p-8 border border-gray-200 hover:shadow-lg hover:border-gray-900 transition-all cursor-pointer"
              >
                <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Voice AI for telefonsvar</h4>
                <p className="text-gray-700 leading-relaxed">
                  AI-resepsjonister som kan håndtere samtaler, ta imot meldinger og rute henvendelser.
                </p>
              </div>
            </div>
          </div>

          {/* Operations and productivity */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-gray-900 mb-8">Operasjoner og produktivitet</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div 
                onClick={() => scrollToContactWithService('Dokumentbehandling og dataoppføring')}
                className="bg-white rounded-lg p-8 border border-gray-200 hover:shadow-lg hover:border-gray-900 transition-all cursor-pointer"
              >
                <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Dokumentbehandling og dataoppføring</h4>
                <p className="text-gray-700 leading-relaxed">
                  Automatisk ekstraksjon av informasjon fra fakturaer, kvitteringer, kontrakter og skjemaer.
                </p>
              </div>

              <div 
                onClick={() => scrollToContactWithService('Møtetranskripsjon og sammenfatning')}
                className="bg-white rounded-lg p-8 border border-gray-200 hover:shadow-lg hover:border-gray-900 transition-all cursor-pointer"
              >
                <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Møtetranskripsjon og sammenfatning</h4>
                <p className="text-gray-700 leading-relaxed">
                  Verktøy som oppretter handlingspunkter automatisk fra møter.
                </p>
              </div>

              <div 
                onClick={() => scrollToContactWithService('Lagerprognoser')}
                className="bg-white rounded-lg p-8 border border-gray-200 hover:shadow-lg hover:border-gray-900 transition-all cursor-pointer"
              >
                <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Lagerprognoser</h4>
                <p className="text-gray-700 leading-relaxed">
                  For detaljhandel eller grossistvirksomhet.
                </p>
              </div>

              <div 
                onClick={() => scrollToContactWithService('Planleggingsoptimalisering')}
                className="bg-white rounded-lg p-8 border border-gray-200 hover:shadow-lg hover:border-gray-900 transition-all cursor-pointer"
              >
                <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Planleggingsoptimalisering</h4>
                <p className="text-gray-700 leading-relaxed">
                  For tjenestebedrifter (feltteknikere, rengjøring, konsulenter).
                </p>
              </div>
            </div>
          </div>

          {/* Sales and marketing */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-gray-900 mb-8">Salg og markedsføring</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div 
                onClick={() => scrollToContactWithService('CRM-berikelse')}
                className="bg-white rounded-lg p-8 border border-gray-200 hover:shadow-lg hover:border-gray-900 transition-all cursor-pointer"
              >
                <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">CRM-berikelse</h4>
                <p className="text-gray-700 leading-relaxed">
                  Automatisk oppdatering av kontaktposter, lead-scoring og forslag til oppfølging.
                </p>
              </div>

              <div 
                onClick={() => scrollToContactWithService('Innholdsgenerering')}
                className="bg-white rounded-lg p-8 border border-gray-200 hover:shadow-lg hover:border-gray-900 transition-all cursor-pointer"
              >
                <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Innholdsgenerering</h4>
                <p className="text-gray-700 leading-relaxed">
                  For sosiale medier, blogger, produktbeskrivelser og e-postkampanjer.
                </p>
              </div>

              <div 
                onClick={() => scrollToContactWithService('Personalisert outreach i stor skala')}
                className="bg-white rounded-lg p-8 border border-gray-200 hover:shadow-lg hover:border-gray-900 transition-all cursor-pointer"
              >
                <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Personalisert outreach i stor skala</h4>
                <p className="text-gray-700 leading-relaxed">
                  Utkast til tilpassede salgs-e-poster basert på prospektdata.
                </p>
              </div>
            </div>
          </div>

          {/* Custom AI Agent */}
          <div className="bg-gray-900 rounded-lg p-10 border border-gray-800">
            <div className="text-center">
              <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center mb-6 mx-auto">
                <svg className="w-10 h-10 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-3xl font-semibold text-white mb-4">Tilpasset KI agent</h3>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                Trenger du noe spesifikt? Vi lager en skreddersydd KI-agent som passer perfekt til ditt behov.
              </p>
              <a
                href="#kontakt"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToContactWithService('Tilpasset KI agent');
                }}
                className="inline-block px-10 py-5 text-lg font-medium text-gray-900 bg-white rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Ta kontakt for tilpasset KI agent
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontakt" className="py-24 px-6 lg:px-8 scroll-mt-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-semibold text-gray-900 mb-6">
              Ta kontakt
            </h2>
            <p className="text-2xl text-gray-700">
              Har du spørsmål? Vi hører gjerne fra deg.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-10 sm:p-14 border border-gray-200">
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-base">
                  {errorMessage || 'En feil oppstod. Vennligst prøv igjen.'}
                </p>
              </div>
            )}
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="name" className="block text-base font-medium text-gray-900 mb-3">
                    Navn
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-5 py-4 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 bg-white text-gray-900"
                    placeholder="Ditt navn"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-base font-medium text-gray-900 mb-3">
                    E-post
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-5 py-4 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 bg-white text-gray-900"
                    placeholder="din@epost.no"
                  />
                </div>
              </div>
              <div>
                <label className="block text-base font-medium text-gray-900 mb-4">
                  Pakke/tjeneste
                </label>
                <div className="border-2 border-gray-300 rounded-lg p-6 bg-white">
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Nettsidepakker</h4>
                    <div className="space-y-3">
                      {['Liten', 'Medium', 'Stor'].map((pkg) => (
                        <label key={pkg} className="flex items-center cursor-pointer group">
                          <input
                            type="checkbox"
                            value={pkg}
                            checked={selectedServices.includes(pkg)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedServices([...selectedServices, pkg]);
                              } else {
                                setSelectedServices(selectedServices.filter(s => s !== pkg));
                              }
                            }}
                            className="w-5 h-5 text-gray-900 border-2 border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:ring-offset-0 cursor-pointer"
                          />
                          <span className="ml-3 text-base text-gray-700 group-hover:text-gray-900">{pkg}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="mb-6 pt-6 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">KI pakker</h4>
                    <div className="space-y-4">
                      <div>
                        <h5 className="text-xs font-semibold text-gray-600 mb-2 uppercase">Kundeløsninger</h5>
                        <div className="space-y-3 ml-2">
                          {['Chatbots og virtuelle assistenter', 'AI-drevne e-post systemer', 'Voice AI for telefonsvar'].map((service) => (
                            <label key={service} className="flex items-center cursor-pointer group">
                              <input
                                type="checkbox"
                                value={service}
                                checked={selectedServices.includes(service)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedServices([...selectedServices, service]);
                                  } else {
                                    setSelectedServices(selectedServices.filter(s => s !== service));
                                  }
                                }}
                                className="w-5 h-5 text-gray-900 border-2 border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:ring-offset-0 cursor-pointer"
                              />
                              <span className="ml-3 text-base text-gray-700 group-hover:text-gray-900">{service}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="pt-3 border-t border-gray-100">
                        <h5 className="text-xs font-semibold text-gray-600 mb-2 uppercase">Operasjoner og produktivitet</h5>
                        <div className="space-y-3 ml-2">
                          {['Dokumentbehandling og dataoppføring', 'Møtetranskripsjon og sammenfatning', 'Lagerprognoser', 'Planleggingsoptimalisering'].map((service) => (
                            <label key={service} className="flex items-center cursor-pointer group">
                              <input
                                type="checkbox"
                                value={service}
                                checked={selectedServices.includes(service)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedServices([...selectedServices, service]);
                                  } else {
                                    setSelectedServices(selectedServices.filter(s => s !== service));
                                  }
                                }}
                                className="w-5 h-5 text-gray-900 border-2 border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:ring-offset-0 cursor-pointer"
                              />
                              <span className="ml-3 text-base text-gray-700 group-hover:text-gray-900">{service}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="pt-3 border-t border-gray-100">
                        <h5 className="text-xs font-semibold text-gray-600 mb-2 uppercase">Salg og markedsføring</h5>
                        <div className="space-y-3 ml-2">
                          {['CRM-berikelse', 'Innholdsgenerering', 'Personalisert outreach i stor skala'].map((service) => (
                            <label key={service} className="flex items-center cursor-pointer group">
                              <input
                                type="checkbox"
                                value={service}
                                checked={selectedServices.includes(service)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedServices([...selectedServices, service]);
                                  } else {
                                    setSelectedServices(selectedServices.filter(s => s !== service));
                                  }
                                }}
                                className="w-5 h-5 text-gray-900 border-2 border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:ring-offset-0 cursor-pointer"
                              />
                              <span className="ml-3 text-base text-gray-700 group-hover:text-gray-900">{service}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-gray-200">
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        value="Tilpasset KI agent"
                        checked={selectedServices.includes('Tilpasset KI agent')}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedServices([...selectedServices, 'Tilpasset KI agent']);
                          } else {
                            setSelectedServices(selectedServices.filter(s => s !== 'Tilpasset KI agent'));
                          }
                        }}
                        className="w-5 h-5 text-gray-900 border-2 border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:ring-offset-0 cursor-pointer"
                      />
                      <span className="ml-3 text-base text-gray-700 group-hover:text-gray-900">Tilpasset KI agent</span>
                    </label>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        value="Annet"
                        checked={selectedServices.includes('Annet')}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedServices([...selectedServices, 'Annet']);
                          } else {
                            setSelectedServices(selectedServices.filter(s => s !== 'Annet'));
                          }
                        }}
                        className="w-5 h-5 text-gray-900 border-2 border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:ring-offset-0 cursor-pointer"
                      />
                      <span className="ml-3 text-base text-gray-700 group-hover:text-gray-900">Annet</span>
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-base font-medium text-gray-900 mb-3">
                  Melding
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-5 py-4 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 bg-white text-gray-900 resize-none"
                  placeholder="Fortell oss mer..."
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-10 py-5 text-lg font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sender...' : 'Send melding'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-8 border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center text-gray-600 text-base">
          <p>&copy; 2024 <span className="font-semibold">Web&KI</span>. Alle rettigheter reservert.</p>
        </div>
      </footer>
    </div>
  );
}
