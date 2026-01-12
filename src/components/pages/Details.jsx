import React, { useEffect, useRef, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, Clock, ArrowLeft, ArrowRight, ChevronDown, X, Copy, Check, UtensilsCrossed, Palette, Users, Mail, Baby, Car, Camera, Gift, Heart } from 'lucide-react'
import { themeConfig } from '../../config/themeConfig'
import { venues as venuesData, images, dresscode, faq as faqData, paymentMethods as paymentMethodsData } from '../../data'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Details = () => {
  const navigate = useNavigate()
  const [openFaqIndex, setOpenFaqIndex] = useState(null)
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false)
  const [isPhotoUploadModalOpen, setIsPhotoUploadModalOpen] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState(null)
  const sectionRef = useRef(null)
  const backButtonRef = useRef(null)
  const headerRef = useRef(null)
  const headerContentRef = useRef(null)
  const venueRef = useRef(null)
  const scheduleTitleRef = useRef(null)
  const timelineRef = useRef(null)
  const lineRef = useRef(null)
  const eventsRef = useRef(null)
  const dressCodeTitleRef = useRef(null)
  const dressCodeContentRef = useRef(null)
  const entourageRef = useRef(null)
  const giftRegistryRef = useRef(null)
  const photoUploadRef = useRef(null)
  const faqRef = useRef(null)

  const ceremony = venuesData.ceremony
  const faqItems = faqData
  const { paymentMethods } = paymentMethodsData

  // Helper function to get icon and clean text for FAQ questions
  const getFaqIconAndText = (question) => {
    // Map question text patterns to icons
    const questionIconMap = {
      'Wedding Ceremony Location': MapPin,
      'Wedding Reception Location': UtensilsCrossed,
      'What time is the wedding?': Clock,
      'What is the wedding theme and dress code?': Palette,
      'Can I bring a plus one?': Users,
      'Is RSVP required?': Mail,
      'Are children allowed?': Baby,
      'Is parking available?': Car,
      'Can guests take photos or videos during the ceremony?': Camera,
      'Is there a gift registry?': Gift,
      'Final Reminder': Heart
    }
    
    // Check for exact match first
    if (questionIconMap[question]) {
      return { Icon: questionIconMap[question], text: question }
    }
    
    // Check for partial matches (in case of emoji prefixes or slight variations)
    for (const [key, Icon] of Object.entries(questionIconMap)) {
      if (question.includes(key) || key.includes(question.trim())) {
        return { Icon, text: question.replace(/^[📍🥂⏰🎨👥✉️👶🚗📸🎁❤️]\s*/, '').trim() }
      }
    }
    
    // Remove any emoji at the start if present
    const emojiPattern = /^[📍🥂⏰🎨👥✉️👶🚗📸🎁❤️]\s*/
    const cleanText = question.replace(emojiPattern, '').trim()
    
    return { Icon: null, text: cleanText }
  }

  // Random background position, rotation, and flip - Base layer (old-book-2)
  const bgStyleBase = useMemo(() => {
    const posX = Math.random() * 100 // 0% to 100%
    const posY = Math.random() * 100 // 0% to 100%
    const rotation = (Math.random() * 360) - 180 // -180 to 180 degrees
    const flipX = Math.random() > 0.5 ? -1 : 1 // Random horizontal flip
    const flipY = Math.random() > 0.5 ? -1 : 1 // Random vertical flip
    return {
      backgroundImage: 'url(/assets/images/graphics/old-book-2.png)',
      backgroundSize: 'cover',
      backgroundPosition: `${posX}% ${posY}%`,
      transform: `rotate(${rotation}deg) scaleX(${flipX}) scaleY(${flipY})`,
      opacity: 0.75
    }
  }, [])

  // Random background position, rotation, and flip - Top layer (old-book-bg)
  const bgStyle = useMemo(() => {
    const posX = Math.random() * 100 // 0% to 100%
    const posY = Math.random() * 100 // 0% to 100%
    const rotation = (Math.random() * 360) - 180 // -180 to 180 degrees
    const flipX = Math.random() > 0.5 ? -1 : 1 // Random horizontal flip
    const flipY = Math.random() > 0.5 ? -1 : 1 // Random vertical flip
    return {
      backgroundImage: 'url(/assets/images/graphics/old-book-bg.png)',
      backgroundSize: 'cover',
      backgroundPosition: `${posX}% ${posY}%`,
      transform: `rotate(${rotation}deg) scaleX(${flipX}) scaleY(${flipY})`,
      opacity: 0.5
    }
  }, [])

  useEffect(() => {
    // Set initial hidden states to prevent glimpse
    if (sectionRef.current) {
      gsap.set(sectionRef.current, { x: '100%', opacity: 0 })
    }
    if (backButtonRef.current) {
      gsap.set(backButtonRef.current, { opacity: 0, scale: 0 })
    }
    
    // Page slide-in animation on mount
    if (sectionRef.current) {
      gsap.fromTo(sectionRef.current,
        { x: '100%', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      )
    }

    // Back button fade-in animation after page slides in
    if (backButtonRef.current) {
      gsap.fromTo(backButtonRef.current,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)", delay: 0.6 }
      )
    }

    // Scroll-triggered animations for individual elements
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 50%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    })

    // Header (heading) animation first
    tl.fromTo(headerRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )

    // Header content (description and graphics) animation
    tl.fromTo(headerContentRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    )

    // Venue section animation
    tl.fromTo(venueRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    )

    // Schedule title animation
    if (scheduleTitleRef.current) {
      ScrollTrigger.create({
        trigger: scheduleTitleRef.current,
        start: "top 80%",
        animation: gsap.fromTo(scheduleTitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        ),
        toggleActions: "play none none reverse"
      })
    }

    // Timeline line expansion from top to bottom
    if (lineRef.current) {
      ScrollTrigger.create({
        trigger: timelineRef.current,
        start: "top 70%",
        animation: gsap.fromTo(lineRef.current,
          { scaleY: 0, transformOrigin: "top" },
          { scaleY: 1, duration: 1.5, ease: "power2.out" }
        ),
        toggleActions: "play none none reverse"
      })
    }

    // Events animate in
    if (eventsRef.current) {
      ScrollTrigger.create({
        trigger: eventsRef.current,
        start: "top 70%",
        animation: gsap.fromTo(eventsRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        ),
        toggleActions: "play none none reverse"
      })
    }


    // Dress Code Title animation
    if (dressCodeTitleRef.current) {
      ScrollTrigger.create({
        trigger: dressCodeTitleRef.current,
        start: "top 80%",
        animation: gsap.fromTo(dressCodeTitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        ),
        toggleActions: "play none none reverse"
      })
    }

    // Dress Code Content animation
    if (dressCodeContentRef.current) {
      ScrollTrigger.create({
        trigger: dressCodeContentRef.current,
        start: "top 70%",
        animation: gsap.fromTo(dressCodeContentRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        ),
        toggleActions: "play none none reverse"
      })
    }

    // Gift Registry animation
    if (giftRegistryRef.current) {
      ScrollTrigger.create({
        trigger: giftRegistryRef.current,
        start: "top 80%",
        animation: gsap.fromTo(giftRegistryRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        ),
        toggleActions: "play none none reverse"
      })
    }

    // Photo Upload animation
    if (photoUploadRef.current) {
      ScrollTrigger.create({
        trigger: photoUploadRef.current,
        start: "top 80%",
        animation: gsap.fromTo(photoUploadRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        ),
        toggleActions: "play none none reverse"
      })
    }

    // Entourage animation
    if (entourageRef.current) {
      ScrollTrigger.create({
        trigger: entourageRef.current,
        start: "top 80%",
        animation: gsap.fromTo(entourageRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        ),
        toggleActions: "play none none reverse"
      })
    }

    // FAQ section animation - animate items one after the other
    if (faqRef.current) {
      const faqItems = faqRef.current.querySelectorAll('.faq-item')
      if (faqItems.length > 0) {
        gsap.set(faqItems, { opacity: 0, y: 30 })
        
        ScrollTrigger.create({
          trigger: faqRef.current,
          start: "top 80%",
          onEnter: () => {
            gsap.to(faqItems, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.15
            })
          }
        })
      }
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <>
    <section
      ref={sectionRef}
      id="details"
      data-section="details"
      className="relative py-20 w-full overflow-hidden"
      style={{ opacity: 0, transform: 'translateX(100%)' }}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/assets/images/graphics/beige-1.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.35
        }}
      />
      
      {/* Title - Full Width at Top */}
      <div className="relative z-20 w-full">
        <h2 ref={headerRef} className="w-full text-center px-4" style={{
          backgroundImage: 'url(/assets/images/graphics/teal-2.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          color: '#f5f5f0',
          paddingTop: '4rem',
          paddingBottom: '4rem',
          overflow: 'visible'
        }}>
          <span 
            className="stylish-calligraphy text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block" 
            style={{ 
              lineHeight: '1.2',
              background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 25%, #FFD700 50%, #B8860B 75%, #DAA520 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 2px 4px rgba(218, 165, 32, 0.3))',
              display: 'inline-block',
              paddingTop: '0.5rem',
              paddingBottom: '0.5rem'
            }}
          >
            Details
          </span>
        </h2>
      </div>
      
      {/* Content */}
      <div className="relative z-20 flex items-center justify-center pt-12">
        <div className="max-w-xs sm:max-w-md lg:max-w-3xl w-full mx-auto px-8 sm:px-12 md:px-8 lg:px-16">
          {/* Header Section */}
          <div className="text-center">
            <div ref={headerContentRef}>
              <p className="text-base sm:text-lg font-albert font-thin text-[#333333] max-w-3xl mx-auto leading-relaxed">
                Join us as we exchange our vows
              </p>
              <div className="flex justify-center items-center">
                {/* Left horizontal line */}
                <div className="w-16 h-px bg-[#333333] opacity-40"></div>
                
                <img 
                  src="/assets/images/graphics/gold-4.png" 
                  alt="Decorative graphic" 
                  className="w-24 sm:w-32 md:w-40 h-auto mx-4"
                  style={{ paddingTop: '1rem', paddingBottom: '1rem' }}
                />
                
                {/* Right horizontal line */}
                <div className="w-16 h-px bg-[#333333] opacity-40"></div>
              </div>
            </div>
          </div>

          {/* Ceremony Information */}
          <div className="relative overflow-visible">
            <div className="relative overflow-hidden min-h-[400px]">
              <div 
                ref={venueRef} 
                className="text-center transition-opacity duration-500 ease-in-out"
              >
                {/* Venue Title */}
                <div>
                  <h3 className="relative inline-block px-6" style={{ paddingTop: '4rem', paddingBottom: '0.75rem' }}>
                    <span 
                      className="stylish-calligraphy text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block leading-none" 
                      style={{ 
                        lineHeight: '0.8',
                        color: '#006666'
                      }}
                    >
                      Venue
                    </span>
                  </h3>
                </div>

                {/* Venue Image */}
                <div className="flex justify-center mb-4">
                  <div className="w-full max-w-[400px] relative" style={{ aspectRatio: '1 / 1', maxHeight: '400px' }}>
                    <img 
                      src="/assets/images/venues/reception.webp" 
                      alt={ceremony.name} 
                      className="w-full h-full object-cover rounded"
                      style={{ aspectRatio: '1 / 1' }}
                    />
                  </div>
                </div>
                
                {/* Venue Name */}
                <div className="text-lg sm:text-xl md:text-2xl alice-regular text-[#333333] mb-2 text-center">
                  {ceremony.name}
                </div>
                
                 {/* Address */}
                 <p className="text-base sm:text-lg font-albert font-thin text-[#333333] mb-4 max-w-md mx-auto text-center">
                   {ceremony.address && `${ceremony.address}, `}
                   {ceremony.city}
                   {ceremony.state && `, ${ceremony.state}`}
                   {ceremony.zip && `, ${ceremony.zip}`}
                 </p>

                {/* Google Maps Link Button */}
                <div className="flex justify-center items-center">
                  <a
                    href={ceremony.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center hover:opacity-80 transition-all duration-300 group"
                    style={{ 
                      backgroundColor: themeConfig.cssVariables['--accent-bg'],
                      borderRadius: '30px',
                      padding: '4px',
                      border: '1px solid #f5f5f0'
                    }}
                  >
                    <div 
                      className="flex items-center justify-center px-8 py-2 gap-2"
                      style={{ 
                        border: '1px solid #f5f5f0',
                        borderRadius: '30px'
                      }}
                    >
                      <span className="text-white font-medium text-sm sm:text-base">Get Direction</span>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </a>
                </div>

              </div>
            </div>
          </div>

          {/* Wedding Program Schedule Section */}
          <div className="mt-20 relative" style={{
            backgroundImage: 'url(/assets/images/prenup/APA_0642.JPG)',
            backgroundSize: 'cover',
            backgroundPosition: '75% center',
            backgroundRepeat: 'no-repeat',
            padding: '2rem 0',
            width: '100vw',
            marginLeft: 'calc(-50vw + 50%)',
            marginRight: 'calc(-50vw + 50%)'
          }}>
            {/* Program Title */}
            <div ref={scheduleTitleRef} className="text-center mb-12 sm:mb-16">
              <div>
                <h3 className="relative inline-block px-6 py-3">
                  <span 
                    className="stylish-calligraphy text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block leading-none" 
                    style={{ 
                      lineHeight: '0.8',
                      color: '#f5f5f0'
                    }}
                  >
                    Program
                  </span>
                </h3>
              </div>
            </div>

            {/* Vertical Timeline */}
            <div ref={timelineRef} className="relative max-w-md sm:max-w-xl lg:max-w-2xl w-full mx-auto" style={{ padding: '1rem' }}>
              {/* Central Vertical Line - Dark Grey */}
              <div ref={lineRef} className="absolute left-1/2 top-0 bottom-0 w-px bg-[#666666] transform -translate-x-1/2"></div>

              {/* Timeline Events */}
              <div ref={eventsRef} className="space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24">
                {/* Event 1 - 3:30 PM – Arrival of Guest */}
                <div className="flex items-center relative min-h-[60px]">
                  <div className="w-1/2 pr-6 text-right flex flex-col justify-center">
                    <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl alice-regular mb-1" style={{ color: '#f5f5f0' }}>
                      3:30 PM
                    </div>
                    <div className="border-b border-dashed border-[#666666] opacity-50 mb-1"></div>
                    <div className="text-sm sm:text-base md:text-lg font-albert" style={{ color: '#f5f5f0' }}>
                      Arrival of Guest
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#666666] rounded-full z-10"></div>
                  <div className="w-1/2 pl-6 text-left"></div>
                </div>

                {/* Event 2 - 4:00 PM – Wedding Ceremony */}
                <div className="flex items-center relative min-h-[60px]">
                  <div className="w-1/2 pr-6 text-right"></div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#666666] rounded-full z-10"></div>
                  <div className="w-1/2 pl-6 text-left flex flex-col justify-center">
                    <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl alice-regular mb-1" style={{ color: '#f5f5f0' }}>
                      4:00 PM
                    </div>
                    <div className="border-b border-dashed border-[#666666] opacity-50 mb-1"></div>
                    <div className="text-sm sm:text-base md:text-lg font-albert" style={{ color: '#f5f5f0' }}>
                      Wedding Ceremony
                    </div>
                  </div>
                </div>

                {/* Event 3 - 5:00 PM – Snacks and Wedding Favors for Guests */}
                <div className="flex items-center relative min-h-[60px]">
                  <div className="w-1/2 pr-6 text-right flex flex-col justify-center">
                    <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl alice-regular mb-1" style={{ color: '#f5f5f0' }}>
                      5:00 PM
                    </div>
                    <div className="border-b border-dashed border-[#666666] opacity-50 mb-1"></div>
                    <div className="text-sm sm:text-base md:text-lg font-albert" style={{ color: '#f5f5f0' }}>
                      Snacks and Wedding Favors for Guests
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#666666] rounded-full z-10"></div>
                  <div className="w-1/2 pl-6 text-left"></div>
                </div>

                {/* Event 4 - 5:30 PM – Event and Reception */}
                <div className="flex items-center relative min-h-[60px]">
                  <div className="w-1/2 pr-6 text-right"></div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#666666] rounded-full z-10"></div>
                  <div className="w-1/2 pl-6 text-left flex flex-col justify-center">
                    <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl alice-regular mb-1" style={{ color: '#f5f5f0' }}>
                      5:30 PM
                    </div>
                    <div className="border-b border-dashed border-[#666666] opacity-50 mb-1"></div>
                    <div className="text-sm sm:text-base md:text-lg font-albert" style={{ color: '#f5f5f0' }}>
                      Event and Reception
                    </div>
                  </div>
                </div>

                {/* Event 5 - 7:00 PM – Lighting of Sky Lanterns */}
                <div className="flex items-center relative min-h-[60px]">
                  <div className="w-1/2 pr-6 text-right flex flex-col justify-center">
                    <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl alice-regular mb-1" style={{ color: '#f5f5f0' }}>
                      7:00 PM
                    </div>
                    <div className="border-b border-dashed border-[#666666] opacity-50 mb-1"></div>
                    <div className="text-sm sm:text-base md:text-lg font-albert" style={{ color: '#f5f5f0' }}>
                      Lighting of Sky Lanterns
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#666666] rounded-full z-10"></div>
                  <div className="w-1/2 pl-6 text-left"></div>
                </div>

                {/* Event 6 - 7:30 PM – End of Event */}
                <div className="flex items-center relative min-h-[60px]">
                  <div className="w-1/2 pr-6 text-right"></div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#666666] rounded-full z-10"></div>
                  <div className="w-1/2 pl-6 text-left flex flex-col justify-center">
                    <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl alice-regular mb-1" style={{ color: '#f5f5f0' }}>
                      7:30 PM
                    </div>
                    <div className="border-b border-dashed border-[#666666] opacity-50 mb-1"></div>
                    <div className="text-sm sm:text-base md:text-lg font-albert" style={{ color: '#f5f5f0' }}>
                      End of Event
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dress Code Section */}
          <div className="mt-20 relative">
            {/* Dress Code Title */}
            <div ref={dressCodeTitleRef} className="text-center mb-12 sm:mb-16">
              <div>
                <h3 className="relative inline-block px-6 py-3">
                  <span 
                    className="stylish-calligraphy text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block leading-none" 
                    style={{ 
                      lineHeight: '0.8',
                      color: '#006666',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Dress Code
                  </span>
                </h3>
                {/* General Dress Code Description */}
                <p className="text-base sm:text-lg font-albert font-thin mt-4 mb-4" style={{ color: '#171717' }}>
                  Strictly formal. No slippers, shorts, jeans, tshirt, or white color.
                </p>
                {/* Mini Title */}
                <h4 className="text-xl sm:text-2xl md:text-3xl font-albert font-medium mt-2 uppercase" style={{ color: '#006666' }}>
                  Sponsor
                </h4>
              </div>
            </div>

            {/* Dress Code Content */}
            <div ref={dressCodeContentRef} className="max-w-xs sm:max-w-md lg:max-w-3xl w-full mx-auto">
              {/* Sponsor Content */}
              <div className="mb-12">
                {/* Paragraph Description */}
                <div className="text-center mb-8">
                  <p className="text-base sm:text-lg font-albert font-thin mb-8" style={{ color: '#171717' }}>
                    Beige barong for Ninong and elegant beige gown for Ninang.
                  </p>
                </div>

                {/* Image and Swatches Side by Side */}
                {dresscode.sections && dresscode.sections.length > 0 && (
                  <div className="flex flex-row items-center justify-center gap-6 sm:gap-8 w-full">
                    {/* Section Image */}
                    <div className="flex-shrink-0" style={{ maxWidth: '200px', width: '100%' }}>
                      <img 
                        src="/assets/images/dresscode/sponsor.png" 
                        alt="Sponsor Dress Code" 
                        className="w-full h-auto object-contain"
                        style={{ maxHeight: '300px' }}
                      />
                    </div>
                    
                    {/* Color Palette - Beige and Black */}
                    {(() => {
                      const sponsorColors = [
                        { name: "Beige", hex: "#D2B48C" },
                        { name: "Black", hex: "#000000" }
                      ];
                      return (
                        <div className="flex flex-col items-center justify-center flex-shrink-0">
                          {sponsorColors.map((color, colorIndex) => (
                            <div 
                              key={colorIndex} 
                              className="relative group cursor-pointer"
                              title={color.name}
                              style={{ marginTop: colorIndex > 0 ? '-20px' : '0' }}
                            >
                              <div 
                                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white/30 shadow-md transition-transform duration-200 hover:scale-110"
                                style={{ backgroundColor: color.hex }}
                              />
                              {/* Tooltip on hover */}
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-[#171717] text-white text-xs font-albert rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                                {color.name}
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>

              {/* Best Man & Maid of Honor Title */}
              <div className="text-center mb-4">
                <h4 className="text-xl sm:text-2xl md:text-3xl font-albert font-medium uppercase" style={{ color: '#006666' }}>
                  Best Man & Maid of Honor
                </h4>
              </div>
              {/* Best Man & Maid of Honor Content */}
              <div className="mb-12">
                {/* Paragraph Description */}
                <div className="text-center mb-8">
                  <p className="text-base sm:text-lg font-albert font-thin mb-8" style={{ color: '#171717' }}>
                    Cyan-blue formal attire and gown.
                  </p>
                </div>

                {/* Image and Swatches Side by Side */}
                {dresscode.sections && dresscode.sections.length > 0 && (
                  <div className="flex flex-row items-center justify-center gap-6 sm:gap-8 w-full">
                    {/* Section Image */}
                    <div className="flex-shrink-0" style={{ maxWidth: '200px', width: '100%' }}>
                      <img 
                        src="/assets/images/dresscode/bestman_maidhonor.png" 
                        alt="Best Man & Maid of Honor Dress Code" 
                        className="w-full h-auto object-contain"
                        style={{ maxHeight: '300px' }}
                      />
                    </div>
                    
                    {/* Color Palette - Single Color */}
                    {(() => {
                      const bestManColors = [
                        { name: "Cyan-blue", hex: "#2B547E" }
                      ];
                      return (
                        <div className="flex flex-col items-center justify-center flex-shrink-0">
                          {bestManColors.map((color, colorIndex) => (
                            <div 
                              key={colorIndex} 
                              className="relative group cursor-pointer"
                              title={color.name}
                              style={{ marginTop: colorIndex > 0 ? '-20px' : '0' }}
                            >
                              <div 
                                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white/30 shadow-md transition-transform duration-200 hover:scale-110"
                                style={{ backgroundColor: color.hex }}
                              />
                              {/* Tooltip on hover */}
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-[#171717] text-white text-xs font-albert rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                                {color.name}
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>

              {/* Entourage Title */}
              <div ref={entourageRef} className="text-center mb-4">
                <h4 className="text-xl sm:text-2xl md:text-3xl font-albert font-medium uppercase" style={{ color: '#006666' }}>
                  Entourage
                </h4>
              </div>
              {/* Entourage Content */}
              <div className="mb-12">
                {/* Paragraph Description */}
                <div className="text-center mb-8">
                  <p className="text-base sm:text-lg font-albert font-thin mb-8" style={{ color: '#171717' }}>
                    Grooms men wear teal blue suspenders and tie with formal slacks, while brides maid wear teal green gown.
                  </p>
                </div>

                {/* Image and Swatches Side by Side */}
                {dresscode.sections && dresscode.sections.length > 0 && (
                  <div className="flex flex-row items-center justify-center gap-6 sm:gap-8 w-full">
                    {/* Section Image */}
                    <div className="flex-shrink-0" style={{ maxWidth: '200px', width: '100%' }}>
                      <img 
                        src="/assets/images/dresscode/entourage.png" 
                        alt="Entourage Dress Code" 
                        className="w-full h-auto object-contain"
                        style={{ maxHeight: '300px' }}
                      />
                    </div>
                    
                    {/* Color Palette - Men: Teal Blue, Black | Women: Teal Green */}
                    {(() => {
                      const entourageColors = [
                        { name: "Teal Blue (Men)", hex: "#367588" },
                        { name: "Black (Men)", hex: "#000000" },
                        { name: "Teal Green (Women)", hex: "#008080" }
                      ];
                      return (
                        <div className="flex flex-col items-center justify-center flex-shrink-0">
                          {entourageColors.map((color, colorIndex) => (
                            <div 
                              key={colorIndex} 
                              className="relative group cursor-pointer"
                              title={color.name}
                              style={{ marginTop: colorIndex > 0 ? '-20px' : '0' }}
                            >
                              <div 
                                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white/30 shadow-md transition-transform duration-200 hover:scale-110"
                                style={{ backgroundColor: color.hex }}
                              />
                              {/* Tooltip on hover */}
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-[#171717] text-white text-xs font-albert rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                                {color.name}
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>

              {/* Guest Title */}
              <div className="text-center mb-4">
                <h4 className="text-xl sm:text-2xl md:text-3xl font-albert font-medium uppercase" style={{ color: '#006666' }}>
                  Guest
                </h4>
              </div>
              
              {/* Paragraph Description */}
              <div className="text-center mb-8">
                <p className="text-base sm:text-lg font-albert font-thin mb-8" style={{ color: '#171717' }}>
                  Guests are encouraged to dress elegantly while complementing the wedding's color theme. Any teal, black, or gray long-sleeve polo or formal top.
                </p>
              </div>

              {/* Image and Swatches Side by Side */}
              {dresscode.sections && dresscode.sections.length > 0 && (
                <div className="flex flex-row items-center justify-center gap-6 sm:gap-8 w-full">
                  {/* Section Image */}
                  <div className="flex-shrink-0" style={{ maxWidth: '200px', width: '100%' }}>
                    <img 
                      src="/assets/images/dresscode/guest.png" 
                      alt="Guest Dress Code" 
                      className="w-full h-auto object-contain"
                      style={{ maxHeight: '300px' }}
                    />
                  </div>
                  
                  {/* Color Palette - Only 3 colors: Teal, Black, Gray */}
                  {(() => {
                    const guestColors = [
                      { name: "Black", hex: "#000000" },
                      { name: "Teal Green", hex: "#008080" },
                      { name: "Gray", hex: "#808080" }
                    ];
                    return (
                      <div className="flex flex-col items-center justify-center flex-shrink-0">
                        {guestColors.map((color, colorIndex) => (
                          <div 
                            key={colorIndex} 
                            className="relative group cursor-pointer"
                            title={color.name}
                            style={{ marginTop: colorIndex > 0 ? '-20px' : '0' }}
                          >
                            <div 
                              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white/30 shadow-md transition-transform duration-200 hover:scale-110"
                              style={{ backgroundColor: color.hex }}
                            />
                            {/* Tooltip on hover */}
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-[#171717] text-white text-xs font-albert rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                              {color.name}
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          </div>

          {/* Gift Registry Section */}
          <div className="mt-20 relative">
            <div ref={giftRegistryRef} className="text-center">
              <h3 className="relative inline-block px-6 py-3 mb-8">
                <span 
                  className="stylish-calligraphy text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block leading-none" 
                  style={{ 
                    lineHeight: '0.8',
                    color: '#006666'
                  }}
                >
                  Gift Registry
                </span>
              </h3>
              <p className="text-base sm:text-lg font-albert font-thin text-[#333333] max-w-3xl mx-auto leading-relaxed mb-6">
                With all that we have, we've been truly blessed. Your presence and prayers are all that we request. But if you desire to give, nonetheless, a monetary gift would be very much appreciated.
              </p>
              
              {/* Send Gift Button */}
              <div className="flex justify-center items-center mb-6">
                <button
                  onClick={() => setIsGiftModalOpen(true)}
                  className="flex items-center justify-center hover:opacity-80 transition-all duration-300 group"
                  style={{ 
                    backgroundColor: themeConfig.cssVariables['--accent-bg'],
                    borderRadius: '30px',
                    padding: '4px',
                    border: '1px solid #f5f5f0'
                  }}
                >
                  <div 
                    className="flex items-center justify-center px-8 py-2 gap-2"
                    style={{ 
                      border: '1px solid #f5f5f0',
                      borderRadius: '30px'
                    }}
                  >
                    <span className="text-white font-medium text-sm sm:text-base">Send Gift</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Photo Upload Section */}
          <div className="mt-20 relative">
            <div ref={photoUploadRef} className="text-center">
              <h3 className="relative inline-block px-6 py-3 mb-8">
                <span 
                  className="stylish-calligraphy text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block leading-none" 
                  style={{ 
                    lineHeight: '0.8',
                    color: '#006666'
                  }}
                >
                  Upload
                </span>
              </h3>
              <p className="text-base sm:text-lg font-albert font-thin text-[#333333] max-w-3xl mx-auto leading-relaxed mb-6">
                We'd love to see your photos and videos from our special day! Please use the QR code below to upload your memories.
              </p>
              
              {/* Upload Photos Button */}
              <div className="flex justify-center items-center mb-6">
                <button
                  onClick={() => setIsPhotoUploadModalOpen(true)}
                  className="flex items-center justify-center hover:opacity-80 transition-all duration-300 group"
                  style={{ 
                    backgroundColor: themeConfig.cssVariables['--accent-bg'],
                    borderRadius: '30px',
                    padding: '4px',
                    border: '1px solid #f5f5f0'
                  }}
                >
                  <div 
                    className="flex items-center justify-center px-8 py-2 gap-2"
                    style={{ 
                      border: '1px solid #f5f5f0',
                      borderRadius: '30px'
                    }}
                  >
                    <span className="text-white font-medium text-sm sm:text-base">Upload</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section - Outside container */}
      <div className="relative z-20 mt-20" style={{
        backgroundImage: 'url(/assets/images/prenup/APA_0704.JPG)',
        backgroundSize: 'cover',
        backgroundPosition: '68% center',
        backgroundRepeat: 'no-repeat',
        padding: '2rem 0',
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)'
      }}>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
        
        <div ref={faqRef} className="relative z-10 w-full px-8 sm:px-12 md:px-8 lg:px-16">
          <h3 className="relative inline-block px-6 py-3 mb-12 text-center w-full">
            <span 
              className="stylish-calligraphy text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block leading-none" 
              style={{ 
                lineHeight: '0.8',
                color: '#ffffff'
              }}
            >
              Reminders
            </span>
          </h3>
          {faqItems && faqItems.faqData && (
            <div className="space-y-0 max-w-[600px] mx-auto">
              {faqItems.faqData.map((item, index) => {
                const isOpen = openFaqIndex === index
                return (
                  <div key={index} className="faq-item">
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full flex items-center justify-between p-4 text-left transition-colors duration-200"
                      style={{
                        backgroundColor: isOpen ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.15)',
                        color: isOpen ? '#333333' : '#ffffff'
                      }}
                      onMouseEnter={(e) => {
                        if (!isOpen) {
                          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isOpen) {
                          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)'
                        }
                      }}
                    >
                      <h4 className="text-sm font-albert font-bold pr-4 flex-1 flex items-center gap-2" style={{ fontSize: '14px' }}>
                        {(() => {
                          const { Icon, text } = getFaqIconAndText(item.question)
                          return (
                            <>
                              {Icon && <Icon className={`w-4 h-4 flex-shrink-0 ${isOpen ? 'text-[#333333]' : 'text-white'}`} />}
                              <span>{text}</span>
                            </>
                          )
                        })()}
                      </h4>
                      <ChevronDown 
                        className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                          isOpen ? 'transform rotate-180 text-[#333333]' : 'text-white'
                        }`}
                      />
                    </button>
                    <div
                      className="overflow-hidden transition-all duration-300 ease-in-out"
                      style={{
                        maxHeight: isOpen ? '1000px' : '0px',
                        opacity: isOpen ? 1 : 0,
                        backgroundColor: isOpen ? 'rgba(255, 255, 255, 0.3)' : 'transparent'
                      }}
                    >
                      <div className="px-4 pt-4 pb-4">
                        <p className="font-albert font-thin text-white whitespace-pre-line" style={{ fontSize: '14px' }}>
                          {item.answer}
                        </p>
                      </div>
                    </div>
                    {index < faqItems.faqData.length - 1 && (
                      <div className="h-px bg-white/30"></div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Graphics with horizontal lines */}
      <div className="flex justify-center items-center mt-12 relative z-20">
        {/* Left horizontal line */}
        <div className="w-16 h-px bg-[#333333] opacity-40"></div>
        
        <img 
          src="/assets/images/graphics/gold-4.png" 
          alt="Decorative graphic" 
          className="w-24 sm:w-32 md:w-40 h-auto mx-4"
          style={{ paddingTop: '1rem', paddingBottom: '1rem', display: 'block' }}
          onError={(e) => {
            console.error('Failed to load gold-4.png:', e)
          }}
        />
        
        {/* Right horizontal line */}
        <div className="w-16 h-px bg-[#333333] opacity-40"></div>
      </div>

    </section>

    {/* Gift Registry Modal */}
    {isGiftModalOpen && createPortal(
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsGiftModalOpen(false)}
        />
        
        {/* Modal Content */}
        <div className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-6 border-b border-gray-200 rounded-t-2xl">
            <h3 className="text-2xl sm:text-3xl alice-regular font-black text-gray-800" style={{ fontWeight: 900 }}>Methods</h3>
            <button
              onClick={() => setIsGiftModalOpen(false)}
              className="text-gray-500 hover:text-gray-800 transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {paymentMethods && paymentMethods.length > 0 && (
              <div className="flex items-center justify-center">
                {paymentMethods.map((method, index) => (
                  <div key={index} className="flex items-center justify-center">
                    {/* BPI QR Code Image */}
                    {method.image && (
                      <div className="flex items-center justify-center">
                        <img 
                          src={method.image} 
                          alt="BPI QR Code" 
                          className="w-full max-w-md h-auto object-contain"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>,
      document.body
    )}

    {/* Photo Upload Modal */}
    {isPhotoUploadModalOpen && createPortal(
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsPhotoUploadModalOpen(false)}
        />
        
        {/* Modal Content */}
        <div className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-6 border-b border-gray-200 rounded-t-2xl">
            <h3 className="text-2xl sm:text-3xl alice-regular font-black text-gray-800" style={{ fontWeight: 900 }}>Upload</h3>
            <button
              onClick={() => setIsPhotoUploadModalOpen(false)}
              className="text-gray-500 hover:text-gray-800 transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex flex-col items-center justify-center">
              <p className="text-base sm:text-lg font-albert text-gray-700 mb-6 text-center max-w-2xl">
                Scan the QR code below to upload your photos and videos from our wedding day. We'd love to see your memories!
              </p>
              {/* QR Code Placeholder - Replace with actual QR code image */}
              <div className="flex items-center justify-center bg-gray-100 rounded-lg p-8">
                <div className="text-center">
                  <p className="text-gray-500 mb-4">QR Code for Photo Upload</p>
                  <div className="w-64 h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Camera className="w-16 h-16 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500 mt-4">Replace this with your actual QR code image</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>,
      document.body
    )}
    
    {/* Back Button - Circular, Bottom Right - Outside section to avoid transform issues */}
    <button
      ref={backButtonRef}
      onClick={() => {
        // Slide out page to the left before navigating
        if (sectionRef.current) {
          gsap.to(sectionRef.current, {
            x: '-100%',
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
            onComplete: () => {
              navigate('/')
            }
          })
        } else {
          navigate('/')
        }
      }}
      className="fixed bottom-12 right-6 z-[100] w-14 h-14 bg-[#333333] text-white rounded-full shadow-lg hover:bg-[#333333]/80 hover:scale-110 transition-all duration-300 flex items-center justify-center group"
      aria-label="Back to home"
      style={{ pointerEvents: 'auto' }}
    >
      <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300" />
    </button>
    </>
  )
}

export default Details



