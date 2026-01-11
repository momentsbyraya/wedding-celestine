import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { themeConfig } from '../config/themeConfig'
import { couple } from '../data'
import Counter from './Counter'
import { getTimeUntilWedding } from '../utils/countdown'

const NavIndex = ({ onOpenRSVP }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const navRef = useRef(null)
  const coupleNameRef = useRef(null)
  const envelopeRef = useRef(null)
  const flower1Ref = useRef(null)
  const flower4Ref = useRef(null)
  const ovalContainerRef = useRef(null)
  const polaroidRef = useRef(null)
  const rsvpContainerRef = useRef(null)
  const detailsContainerRef = useRef(null)
  const momentsImagesRef = useRef(null)
  const momentsTextRef = useRef(null)

  // Countdown state
  const [countdown, setCountdown] = useState(getTimeUntilWedding())

  // Pages/Sections to navigate to - matching the pages folder
  const sections = []

  // Update countdown every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getTimeUntilWedding())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Animate elements one after another when on home page
    if (location.pathname === '/') {
      // Set all elements to start hidden
      if (coupleNameRef.current) gsap.set(coupleNameRef.current, { opacity: 0, y: 30 })
      if (envelopeRef.current) gsap.set(envelopeRef.current, { opacity: 0, y: 30 })
      if (flower1Ref.current) gsap.set(flower1Ref.current, { opacity: 0, scale: 0, rotation: 0 })
      if (flower4Ref.current) gsap.set(flower4Ref.current, { opacity: 0, scale: 0, rotation: 0 })
      if (ovalContainerRef.current) gsap.set(ovalContainerRef.current, { opacity: 0, y: 30 })
      if (polaroidRef.current) gsap.set(polaroidRef.current, { opacity: 0, y: 30 })
      if (rsvpContainerRef.current) gsap.set(rsvpContainerRef.current, { opacity: 0, y: 30 })
      if (detailsContainerRef.current) gsap.set(detailsContainerRef.current, { opacity: 0, y: 30 })
      if (momentsImagesRef.current) {
        gsap.set(momentsImagesRef.current.children, { opacity: 0, y: 30 })
      }
      if (momentsTextRef.current) gsap.set(momentsTextRef.current, { opacity: 0, y: 20 })
      
      // Small delay to ensure opening screen is fully gone
      setTimeout(() => {
        // Animate elements one after another
        const tl = gsap.timeline({ delay: 0.2 })
            
            // Envelope - show first
            if (envelopeRef.current) {
              tl.fromTo(envelopeRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
              )
            }
            
            // Flower 1 - animate after envelope
            if (flower1Ref.current) {
              tl.fromTo(flower1Ref.current,
                { opacity: 0, scale: 0, rotation: 0 },
                { opacity: 1, scale: 1, rotation: 15, duration: 0.6, ease: "back.out(1.7)" },
                "-=0.3"
              )
            }
            
            // Couple's name - simple slide in
            if (coupleNameRef.current) {
              tl.fromTo(coupleNameRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
                "-=0.4"
              )
            }
            
            // Oval container - simple slide in
            if (ovalContainerRef.current) {
              tl.fromTo(ovalContainerRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
                "-=0.4"
              )
            }
            
            // Polaroid image - simple slide in
            if (polaroidRef.current) {
              tl.fromTo(polaroidRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
                "-=0.4"
              )
            }
            
            // Flower 4 - top right of polaroid - keep animation
            if (flower4Ref.current) {
              tl.fromTo(flower4Ref.current,
                { opacity: 0, scale: 0, rotation: 0 },
                { opacity: 1, scale: 1, rotation: 0, duration: 0.6, ease: "back.out(1.7)" },
                "-=0.5"
              )
            }
            
            // RSVP container - simple slide in
            if (rsvpContainerRef.current) {
              tl.fromTo(rsvpContainerRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
                "-=0.4"
              )
            }
            
            // Details container - simple slide in
            if (detailsContainerRef.current) {
              tl.fromTo(detailsContainerRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
                "-=0.4"
              )
            }
            
            // Moments images - simple slide in with stagger
            if (momentsImagesRef.current) {
              tl.fromTo(momentsImagesRef.current.children,
                { opacity: 0, y: 30 },
                { 
                  opacity: 1, 
                  y: 0, 
                  duration: 0.5, 
                  ease: "power2.out",
                  stagger: 0.1
                },
                "-=0.4"
              )
            }
            
            // Moments text - simple slide in
            if (momentsTextRef.current) {
              tl.fromTo(momentsTextRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
                "-=0.4"
              )
            }
      }, 300) // Small delay to ensure smooth transition
    }
  }, [location.pathname])

  const handleNavigation = (section) => {
    // If it's RSVP, open modal instead of navigating
    if (section.isModal && section.id === 'rsvp' && onOpenRSVP) {
      onOpenRSVP()
      return
    }

    // Scroll to top immediately
    window.scrollTo(0, 0)

    // Slide out animation before navigation
    if (navRef.current) {
      gsap.to(navRef.current, {
        x: '-100%',
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          navigate(section.path)
          // Ensure scroll to top after navigation
          setTimeout(() => window.scrollTo(0, 0), 0)
        }
      })
    } else {
      navigate(section.path)
      // Ensure scroll to top after navigation
      setTimeout(() => window.scrollTo(0, 0), 0)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-white to-gray-50 overflow-hidden relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/assets/images/graphics/bg-1.png)',
          opacity: 0.3
        }}
      />
      
      {/* Blurry White Overlay */}
      <div 
        className="absolute inset-0 backdrop-blur-sm"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.6)'
        }}
      />
      
      <div 
        ref={navRef}
        className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10"
      >
        {/* Container 1: Couple's Name and Celebration Date */}
        <div ref={coupleNameRef} className="flex flex-col items-center justify-center mb-6" style={{ marginBottom: '3vw', opacity: 0, transform: 'translateY(30px)' }}>
          <p className="nanum-myeongjo-regular text-[#333333] text-center uppercase" style={{ fontSize: 'clamp(1.5rem, 4vw, 4rem)', fontWeight: 900 }}>
            {couple.nickname}
          </p>
          <p className="nanum-myeongjo-regular text-[#333333] text-center" style={{ fontSize: 'clamp(0.75rem, 1.5vw, 1.5rem)', marginTop: '0.2vw' }}>
            {couple.wedding.month} {couple.wedding.day}, {couple.wedding.year}
          </p>
        </div>

        {/* Container 2: Rest of the Content */}
        <div className="relative">
          {/* Midnight Blue Envelope Image */}
        <div ref={envelopeRef} className="flex justify-center relative" style={{ marginBottom: '2.5vw', opacity: 0, transform: 'translateY(30px)' }}>
          <img 
            src="/assets/images/graphics/midnight-blue-envelope.png" 
            alt="Wedding Invitation" 
            className="w-[60vw] h-auto object-contain"
          />
          {/* Flower 1 - Bottom Left */}
          <img 
            ref={flower1Ref}
            src="/assets/images/graphics/flower-1.png" 
            alt="Flower decoration" 
            className="absolute bottom-[0%] left-[3%] w-[45vw] h-auto object-contain"
            style={{ transform: 'translate(-5%, 10%) rotate(15deg)', opacity: 0, scale: 0 }}
          />
        </div>

        {/* Container with border radius 50% and Polaroid Image */}
        <div className="flex justify-start items-start gap-6 relative z-20" style={{ marginBottom: '2.5vw', marginTop: '-27vw' }}>
          {/* Oval Container */}
          <div 
            ref={ovalContainerRef}
            className="rounded-[50%] p-1 cursor-pointer transition-transform duration-300 hover:scale-105"
            onClick={() => {
              window.scrollTo(0, 0)
              // Slide out animation before navigation
              if (navRef.current) {
                gsap.to(navRef.current, {
                  x: '-100%',
                  opacity: 0,
                  duration: 0.5,
                  ease: "power2.in",
                  onComplete: () => {
                    navigate('/entourage')
                    setTimeout(() => window.scrollTo(0, 0), 0)
                  }
                })
              } else {
                navigate('/entourage')
                setTimeout(() => window.scrollTo(0, 0), 0)
              }
            }}
            style={{ 
              width: '42vw',
              height: '55vw',
              backgroundColor: '#f5f5f0',
              backgroundImage: 'url(/assets/images/graphics/textured-bg-2.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: 0
            }}
          >
            <div 
              className="rounded-[50%] w-full h-full p-1"
              style={{ 
                border: `1px solid ${themeConfig.cssVariables['--accent-hover']}`
              }}
            >
              <div 
                className="rounded-[50%] w-full h-full flex flex-col items-center justify-center relative"
                style={{ 
                  border: `1px solid ${themeConfig.cssVariables['--accent-hover']}`
                }}
              >
                {/* Text Content */}
                <div className="text-center px-4">
                  <p className="nanum-myeongjo-regular text-[#333333] mb-2" style={{ fontSize: 'clamp(0.625rem, 1vw, 1rem)' }}>
                    FOR THE
                  </p>
                  <p className="imperial-script-regular mb-4 underline" style={{ color: themeConfig.cssVariables['--accent-text'], fontSize: 'clamp(1.8rem, 4.5vw, 4.5rem)', textDecorationThickness: '1px', textUnderlineOffset: '0.15em' }}>
                    Entourage
                  </p>
                  <p className="nanum-myeongjo-regular text-[#333333]" style={{ fontSize: 'clamp(0.625rem, 0.9vw, 0.95rem)' }}>
                    CLICK HERE
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Polaroid Container Wrapper */}
          <div 
            className="relative cursor-pointer hover:scale-105 transition-transform duration-300" 
            style={{ zIndex: 2, marginBottom: '-3.33vw', marginTop: '2.5vw', marginLeft: '1.67vw' }}
            onClick={() => {
              window.scrollTo(0, 0)
              // Slide out animation before navigation
              if (navRef.current) {
                gsap.to(navRef.current, {
                  x: '-100%',
                  opacity: 0,
                  duration: 0.5,
                  ease: "power2.in",
                  onComplete: () => {
                    navigate('/moments')
                    setTimeout(() => window.scrollTo(0, 0), 0)
                  }
                })
              } else {
                navigate('/moments')
                setTimeout(() => window.scrollTo(0, 0), 0)
              }
            }}
          >
            {/* Flower 4 - Top Right (under the image and container) */}
            <img 
              ref={flower4Ref}
              src="/assets/images/graphics/flower-4.png" 
              alt="Flower decoration" 
              className="absolute h-auto object-contain"
              style={{ 
                width: '25vw',
                top: '-25%',
                right: '-25%',
                zIndex: 0,
                opacity: 0,
                scale: 0,
                pointerEvents: 'none'
              }}
            />
            
            {/* Polaroid-style Image Container */}
            <div 
              ref={polaroidRef}
              className="bg-white relative"
              style={{ 
                width: '30vw',
                borderTop: '1.2vw solid white',
                borderLeft: '1.2vw solid white',
                borderRight: '1.2vw solid white',
                borderBottom: '5vw solid white',
                padding: 0,
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                transform: 'rotate(5deg)',
                zIndex: 1,
                marginTop: '6vw',
                opacity: 0
              }}
            >
              <img 
                src="/assets/images/prenup/APA_0426.JPG" 
                alt="Prenup photo" 
                className="w-full object-cover"
                style={{ display: 'block', aspectRatio: '1 / 1', width: '100%', height: 'auto', pointerEvents: 'none' }}
              />
              
              {/* Flower 3 - Bottom Left (above the image) */}
              <img 
                src="/assets/images/graphics/flower-3.png" 
                alt="Flower decoration" 
                className="absolute bottom-0 left-0 h-auto object-contain"
                style={{ 
                  width: '25vw',
                  transform: 'translate(-50%, 50%)',
                  zIndex: 2,
                  pointerEvents: 'none'
                }}
              />
            </div>
          </div>
        </div>

        {/* Rectangle Container - Longer than wider */}
        <div className="flex justify-start items-start gap-6 relative" style={{ zIndex: 10, marginBottom: '2.5vw', marginTop: '-13vw', marginLeft: '0.83vw' }}>
          <div 
            ref={rsvpContainerRef}
            className="bg-white flex flex-col cursor-pointer transition-transform duration-300 relative"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'rotate(-10deg) scale(1.05)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'rotate(-10deg) scale(1)'
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'rotate(-10deg) scale(1.1)'
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'rotate(-10deg) scale(1.05)'
            }}
            onClick={() => {
              if (onOpenRSVP) {
                onOpenRSVP()
              }
            }}
            style={{ 
              width: '50vw',
              height: '50vw',
              backgroundColor: '#f5f5f0',
              backgroundImage: 'url(/assets/images/graphics/teal-2.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              transform: 'rotate(-10deg) translateY(30px)',
              opacity: 0
            }}
          >
            {/* Prenup Photo - 30% of container height */}
            <div 
              className="w-full overflow-hidden"
              style={{ 
                height: '30%',
                minHeight: '15vw'
              }}
            >
              <img 
                src="/assets/images/prenup/APA_0460.JPG" 
                alt="Prenup photo" 
                className="w-full h-full object-cover"
                style={{
                  transform: 'scale(1.8) translateX(-15%)',
                  objectPosition: 'left center'
                }}
              />
            </div>
            
            {/* Kindly RSVP Text */}
            <div className="flex-1 flex flex-col items-center justify-center px-4 py-4">
              <p className="nanum-myeongjo-regular text-center uppercase" style={{ fontSize: 'clamp(0.625rem, 1vw, 1rem)', marginBottom: '0', color: '#f5f5f0' }}>
                Kindly
              </p>
              <p className="text-center" style={{ color: '#f5f5f0', marginTop: '0', lineHeight: '0.8' }}>
                <span className="imperial-script-regular" style={{ fontSize: 'clamp(4rem, 9vw, 9rem)' }}>R</span>
                <span className="nanum-myeongjo-regular" style={{ fontSize: 'clamp(1.25rem, 2.5vw, 2.5rem)' }}>SVP</span>
              </p>
            </div>
          </div>
          
          {/* New Container - Wider than long */}
          <div 
            ref={detailsContainerRef}
            className="bg-white flex flex-col items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105 relative"
            onClick={() => {
              window.scrollTo(0, 0)
              // Slide out animation before navigation
              if (navRef.current) {
                gsap.to(navRef.current, {
                  x: '-100%',
                  opacity: 0,
                  duration: 0.5,
                  ease: "power2.in",
                  onComplete: () => {
                    navigate('/details')
                    setTimeout(() => window.scrollTo(0, 0), 0)
                  }
                })
              } else {
                navigate('/details')
                setTimeout(() => window.scrollTo(0, 0), 0)
              }
            }}
            style={{ 
              width: '50vw',
              height: '35vw',
              backgroundColor: '#f5f5f0',
              borderTop: `6px solid ${themeConfig.cssVariables['--accent-bg']}`,
              borderBottom: `6px solid ${themeConfig.cssVariables['--accent-bg']}`,
              opacity: 0,
              transform: 'translateY(30px)'
            }}
          >
            {/* Flower 5 - Bottom Left */}
            <img 
              src="/assets/images/graphics/flower-5.png" 
              alt="Flower decoration" 
              className="absolute h-auto object-contain"
              style={{ 
                width: '25vw',
                left: '-30%',
                bottom: '-50%',
                zIndex: 1
              }}
            />
            
            {/* Text Content */}
            <div className="text-center px-4 relative z-10">
              <p className="nanum-myeongjo-regular text-[#333333]" style={{ fontSize: 'clamp(0.625rem, 1vw, 1rem)', marginBottom: '0.2vw' }}>
                VIEW THE
              </p>
                <p className="imperial-script-regular underline" style={{ color: themeConfig.cssVariables['--accent-text'], fontSize: 'clamp(2.4rem, 5.8vw, 5.8rem)', textDecorationThickness: '1px', textUnderlineOffset: '0.15em', marginBottom: '0.2vw', marginTop: '0.5vw', lineHeight: '0.9' }}>
                  Details
                </p>
            </div>
          </div>
        </div>

        {/* Three Polaroid Images Below RSVP and Details */}
        <div ref={momentsImagesRef} className="flex justify-center items-start gap-0 relative" style={{ marginTop: '2vw', zIndex: 5 }}>
          {/* Flower 7 - Under the images */}
          <img 
            src="/assets/images/graphics/flower-7.png" 
            alt="Flower decoration" 
            className="absolute h-auto object-contain"
            style={{ 
              width: '60vw',
              bottom: '-20%',
              left: '-10%',
              transform: 'rotate(-25deg)',
              zIndex: 0
            }}
          />
          
          {/* VIEW OUR MOMENTS Text - Top Right */}
          <button
            ref={momentsTextRef}
            type="button"
            className="absolute cursor-pointer hover:opacity-80 transition-opacity duration-300 bg-transparent border-none outline-none"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              console.log('OUR MOMENTS clicked, navigating to /moments')
              // Slide out animation before navigation
              if (navRef.current) {
                gsap.to(navRef.current, {
                  x: '-100%',
                  opacity: 0,
                  duration: 0.5,
                  ease: "power2.in",
                  onComplete: () => {
                    console.log('Animation complete, navigating...')
                    try {
                      navigate('/moments')
                    } catch (error) {
                      console.error('Navigation error:', error)
                      window.location.href = '/moments'
                    }
                  }
                })
              } else {
                console.log('No navRef, navigating directly...')
                try {
                  navigate('/moments')
                } catch (error) {
                  console.error('Navigation error:', error)
                  window.location.href = '/moments'
                }
              }
            }}
            style={{ 
              top: '-6vw',
              right: '0',
              paddingRight: '6vw',
              paddingLeft: '1vw',
              paddingTop: '0.5vw',
              paddingBottom: '0.5vw',
              zIndex: 1000,
              pointerEvents: 'auto',
              userSelect: 'none',
              cursor: 'pointer'
            }}
          >
            <span className="nanum-myeongjo-regular text-[#333333] text-center underline" style={{ 
              fontSize: 'clamp(0.625rem, 1vw, 1rem)', 
              textDecorationThickness: '1px', 
              textUnderlineOffset: '0.15em',
              margin: 0,
              pointerEvents: 'none'
            }}>
              OUR MOMENTS
            </span>
          </button>
          
          {/* Polaroid Image 1 */}
          <div 
            className="relative cursor-pointer hover:scale-105 transition-transform duration-300" 
            style={{ zIndex: 2, opacity: 0 }}
            onClick={() => {
              window.scrollTo(0, 0)
              // Slide out animation before navigation
              if (navRef.current) {
                gsap.to(navRef.current, {
                  x: '-100%',
                  opacity: 0,
                  duration: 0.5,
                  ease: "power2.in",
                  onComplete: () => {
                    navigate('/moments')
                    setTimeout(() => window.scrollTo(0, 0), 0)
                  }
                })
              } else {
                navigate('/moments')
                setTimeout(() => window.scrollTo(0, 0), 0)
              }
            }}
          >
            <div 
              className="bg-white relative"
              style={{ 
                width: '30vw',
                borderTop: '1.2vw solid white',
                borderLeft: '1.2vw solid white',
                borderRight: '1.2vw solid white',
                borderBottom: '5vw solid white',
                padding: 0,
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                transform: 'rotate(-5deg)',
                zIndex: 1
              }}
            >
              <img 
                src="/assets/images/prenup/APA_0494.JPG" 
                alt="Prenup photo" 
                className="w-full object-cover"
                style={{ display: 'block', aspectRatio: '1 / 1', width: '100%', height: '100%', pointerEvents: 'none', objectPosition: 'center 80%' }}
              />
            </div>
          </div>

          {/* Polaroid Image 2 */}
          <div 
            className="relative cursor-pointer hover:scale-105 transition-transform duration-300" 
            style={{ zIndex: 2, marginTop: '1vw', marginLeft: '-2vw', opacity: 0 }}
            onClick={() => {
              window.scrollTo(0, 0)
              // Slide out animation before navigation
              if (navRef.current) {
                gsap.to(navRef.current, {
                  x: '-100%',
                  opacity: 0,
                  duration: 0.5,
                  ease: "power2.in",
                  onComplete: () => {
                    navigate('/moments')
                    setTimeout(() => window.scrollTo(0, 0), 0)
                  }
                })
              } else {
                navigate('/moments')
                setTimeout(() => window.scrollTo(0, 0), 0)
              }
            }}
          >
            <div 
              className="bg-white relative"
              style={{ 
                width: '30vw',
                borderTop: '1.2vw solid white',
                borderLeft: '1.2vw solid white',
                borderRight: '1.2vw solid white',
                borderBottom: '5vw solid white',
                padding: 0,
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                transform: 'rotate(5deg)',
                zIndex: 1
              }}
            >
              <img 
                src="/assets/images/prenup/APA_0577.JPG" 
                alt="Prenup photo" 
                className="w-full object-cover"
                style={{ display: 'block', aspectRatio: '1 / 1', width: '100%', height: '100%', pointerEvents: 'none', objectPosition: 'center 85%' }}
              />
              
              {/* Flower 8 - Bottom Right */}
              <img 
                src="/assets/images/graphics/flower-8.png" 
                alt="Flower decoration" 
                className="absolute h-auto object-contain"
                style={{ 
                  width: '20vw',
                  bottom: '0',
                  right: '-40%',
                  transform: 'rotate(-50deg)',
                  zIndex: 2,
                  pointerEvents: 'none'
                }}
              />
            </div>
          </div>
        </div>

          {/* Navigation Boxes Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {sections.map((section) => {
              const isActive = location.pathname === section.path
              const isCountdown = section.id === 'counter'
              
              // For countdown, render as non-clickable div
              if (isCountdown) {
                return (
                  <div
                    key={section.id}
                    className="group relative opacity-70 cursor-default"
                  >
                    {/* Box with Section Name */}
                    <div 
                      className="px-4 py-6 rounded-lg border-2 text-center min-h-[80px] flex items-center justify-center bg-white border-[#333333]/30 text-[#333333] shadow-sm"
                    >
                      <span className="text-sm sm:text-base font-albert font-medium">
                        {section.name}
                      </span>
                    </div>
                  </div>
                )
              }
              
              // For other sections, render as clickable button
              return (
                <button
                  key={section.id}
                  onClick={() => handleNavigation(section)}
                  className={`group relative transition-all duration-300 ${
                    isActive 
                      ? 'opacity-100 scale-105' 
                      : 'opacity-90 hover:opacity-100 hover:scale-105'
                  }`}
                  aria-label={section.isModal ? `Open ${section.name} modal` : `Navigate to ${section.name}`}
                >
                  {/* Box with Section Name */}
                  <div 
                    className={`px-4 py-6 rounded-lg border-2 transition-all duration-300 text-center min-h-[80px] flex items-center justify-center ${
                      isActive
                        ? 'bg-[#333333] border-[#333333] text-white shadow-lg'
                        : 'bg-white border-[#333333]/40 text-[#333333] hover:border-[#333333]/60 hover:bg-white shadow-md'
                    }`}
                  >
                    <span className="text-sm sm:text-base font-albert font-medium">
                      {section.name}
                    </span>
                  </div>
                  
                  {/* Active indicator dot */}
                  {isActive && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#333333] rounded-full border-2 border-white" />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Container 3: Counter */}
        <div className="relative">
          <Counter countdown={countdown} />
        </div>
      </div>
    </div>
  )
}

export default NavIndex

