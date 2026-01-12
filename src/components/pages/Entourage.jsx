import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft } from 'lucide-react'
import { themeConfig } from '../../config/themeConfig'
import { entourage } from '../../data'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

// Helper function to remove middle initial from name
const removeMiddleInitial = (name) => {
  // Remove single letter followed by period (middle initial)
  // Pattern: space + single letter + period + space
  return name.replace(/\s+[A-Z]\.\s+/g, ' ').replace(/\s+/g, ' ').trim()
}

const Entourage = () => {
  const navigate = useNavigate()
  const sectionRef = useRef(null)
  const backButtonRef = useRef(null)
  const headerRef = useRef(null)
  const groomRef = useRef(null)
  const brideRef = useRef(null)
  const parentsRef = useRef(null)
  const principalSponsorsRef = useRef(null)
  const secondarySponsorsRef = useRef(null)
  const bestmanRef = useRef(null)
  const maidOfHonorRef = useRef(null)
  const ringBearerRef = useRef(null)
  const flowerGirlRef = useRef(null)

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

    // Scroll-triggered animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 50%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    })

    // Header animation
    tl.fromTo(headerRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )

    // Groom and Bride names - animate together as a pair
    if (groomRef.current) {
      ScrollTrigger.create({
        trigger: groomRef.current,
        start: "top 80%",
        animation: gsap.fromTo(groomRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        ),
        toggleActions: "play none none reverse"
      })
    }

    // Parents section animation - animate each name one after the other
    if (parentsRef.current) {
      const parentNames = parentsRef.current.querySelectorAll('p.font-poppins')
      if (parentNames.length > 0) {
        gsap.set(parentNames, { opacity: 0, y: 20 })
      ScrollTrigger.create({
          trigger: parentsRef.current,
        start: "top 80%",
          onEnter: () => {
            gsap.to(parentNames, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.1
            })
          },
        toggleActions: "play none none reverse"
      })
      }
    }

    // Principal Sponsors animation - animate each name one after the other
    if (principalSponsorsRef.current) {
      const ninongElements = principalSponsorsRef.current?.querySelectorAll('.ninong-item')
      const ninangElements = principalSponsorsRef.current?.querySelectorAll('.ninang-item')
      
      // Combine all items and animate sequentially
      const allItems = []
      if (ninongElements) allItems.push(...Array.from(ninongElements))
      if (ninangElements) allItems.push(...Array.from(ninangElements))
      
      if (allItems.length > 0) {
        gsap.set(allItems, { opacity: 0, y: 20 })
      ScrollTrigger.create({
        trigger: principalSponsorsRef.current,
        start: "top 80%",
          onEnter: () => {
            gsap.to(allItems, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.1
            })
          },
        toggleActions: "play none none reverse"
      })
      }
    }

    // Secondary Sponsors animation - animate each name one after the other
    if (secondarySponsorsRef.current) {
      const groomsmenElements = secondarySponsorsRef.current?.querySelectorAll('.groomsmen-item')
      const bridesmaidsElements = secondarySponsorsRef.current?.querySelectorAll('.bridesmaids-item')
      
      // Combine all items and animate sequentially
      const allItems = []
      if (groomsmenElements) allItems.push(...Array.from(groomsmenElements))
      if (bridesmaidsElements) allItems.push(...Array.from(bridesmaidsElements))
      
      if (allItems.length > 0) {
        gsap.set(allItems, { opacity: 0, y: 20 })
      ScrollTrigger.create({
        trigger: secondarySponsorsRef.current,
        start: "top 80%",
          onEnter: () => {
            gsap.to(allItems, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.1
            })
          },
        toggleActions: "play none none reverse"
      })
    }
    }

    // Bestman and Maid of Honor - animate each name one after the other
    if (bestmanRef.current && maidOfHonorRef.current) {
      const bestmanNames = bestmanRef.current.querySelectorAll('p.font-poppins')
      const maidOfHonorNames = maidOfHonorRef.current.querySelectorAll('p.font-poppins')
      
      // Combine all names and animate sequentially
      const allNames = []
      if (bestmanNames) allNames.push(...Array.from(bestmanNames))
      if (maidOfHonorNames) allNames.push(...Array.from(maidOfHonorNames))
      
      if (allNames.length > 0) {
        const pairContainer = bestmanRef.current.parentElement
        if (pairContainer) {
          gsap.set(allNames, { opacity: 0, y: 20 })
      ScrollTrigger.create({
            trigger: pairContainer,
        start: "top 80%",
            onEnter: () => {
              gsap.to(allNames, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                stagger: 0.1
              })
            },
        toggleActions: "play none none reverse"
      })
    }
      }
    }

    // Ring Bearer and Flower Girl - animate each name one after the other
    if (ringBearerRef.current && flowerGirlRef.current) {
      const ringBearerNames = ringBearerRef.current.querySelectorAll('p.font-poppins')
      const flowerGirlNames = flowerGirlRef.current.querySelectorAll('p.font-poppins')
      
      // Combine all names and animate sequentially
      const allNames = []
      if (ringBearerNames) allNames.push(...Array.from(ringBearerNames))
      if (flowerGirlNames) allNames.push(...Array.from(flowerGirlNames))
      
      if (allNames.length > 0) {
        const pairContainer = ringBearerRef.current.parentElement
        if (pairContainer) {
          gsap.set(allNames, { opacity: 0, y: 20 })
      ScrollTrigger.create({
            trigger: pairContainer,
        start: "top 80%",
            onEnter: () => {
              gsap.to(allNames, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                stagger: 0.1
              })
            },
        toggleActions: "play none none reverse"
      })
        }
      }
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const principalSponsors = entourage.entourageList.find(item => item.category === "Principal Sponsors")
  const secondarySponsors = entourage.entourageList.find(item => item.category === "Secondary Sponsors")
  const bestman = entourage.entourageList.find(item => item.category === "Bestman")
  const maidOfHonor = entourage.entourageList.find(item => item.category === "Maid of Honor")
  const ringBearer = entourage.entourageList.find(item => item.category === "Ring Bearer")
  const flowerGirl = entourage.entourageList.find(item => item.category === "Flower Girl")

  return (
    <>
      <section
        ref={sectionRef}
        id="entourage"
        data-section="entourage"
        className="relative py-20 w-full overflow-hidden"
        style={{ 
          opacity: 0, 
          transform: 'translateX(100%)',
          paddingLeft: '2rem',
          paddingRight: '2rem',
          paddingTop: '4rem',
          paddingBottom: '4rem'
        }}
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/assets/images/graphics/teal-2.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        {/* Line-1 Image - Top */}
        <img 
          src="/assets/images/graphics/line-1.png" 
          alt="Line decoration" 
          className="absolute left-1/2 transform -translate-x-1/2 z-30"
          style={{ 
            width: '50%',
            height: 'auto',
            maxWidth: '50%',
            objectFit: 'cover',
            top: '1rem'
          }}
        />
        {/* Line-1 Image - Bottom */}
        <img 
          src="/assets/images/graphics/line-1.png" 
          alt="Line decoration" 
          className="absolute left-1/2 transform -translate-x-1/2 z-30"
          style={{ 
            width: '50%',
            height: 'auto',
            maxWidth: '50%',
            objectFit: 'cover',
            bottom: '1rem'
          }}
        />
        {/* Content */}
        <div className="relative z-20 flex items-center justify-center py-12" style={{ backgroundColor: '#F5F5DC' }}>
          {/* Beige-1 Image Overlay */}
          <div 
            className="absolute inset-0 z-10"
            style={{
              backgroundImage: 'url(/assets/images/graphics/beige-1.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: 0.25
            }}
          />
          <div className="max-w-xs sm:max-w-md lg:max-w-4xl w-full mx-auto px-4 sm:px-6 md:px-6 lg:px-8">
            {/* Header Section */}
            <div className="text-center mb-12">
              <h2 ref={headerRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-8">
                <span className="imperial-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl inline-block leading-none" style={{ lineHeight: '0.8', color: '#006666' }}>Entourage</span>
              </h2>
            </div>

            {/* Groom and Bride Names - Side by Side */}
            <div ref={groomRef} className="mb-6 flex flex-row gap-4 sm:gap-6 justify-center items-center">
              {/* Groom Name */}
              <div className="flex-1">
                <p className="text-[20px] sm:text-lg imperial-script-regular mb-2 text-right" style={{ color: '#006666' }}>Name Of Groom</p>
                <p className="text-[10px] sm:text-sm md:text-base lg:text-lg font-poppins uppercase whitespace-nowrap overflow-hidden text-ellipsis text-right text-[#333333]">{removeMiddleInitial(entourage.couple.groom.name)}</p>
              </div>

              {/* Bride Name */}
              <div className="flex-1">
                <p className="text-[20px] sm:text-lg imperial-script-regular mb-2 text-left" style={{ color: '#006666' }}>Name Of Bride</p>
                <p className="text-[10px] sm:text-sm md:text-base lg:text-lg font-poppins uppercase whitespace-nowrap overflow-hidden text-ellipsis text-left text-[#333333]">{removeMiddleInitial(entourage.couple.bride.name)}</p>
              </div>
            </div>

            {/* Parents Section */}
            <div ref={parentsRef} className="mb-6 flex flex-row gap-4 sm:gap-6 justify-center items-center">
              {/* Groom's Parents */}
              <div className="flex-1">
                <p className="text-[20px] sm:text-lg imperial-script-regular mb-2 text-right" style={{ color: '#006666' }}>Groom's Parents</p>
                <p className="text-[10px] sm:text-sm md:text-base lg:text-lg font-poppins uppercase whitespace-nowrap overflow-hidden text-ellipsis text-right text-[#333333]">{entourage.parents.groom.father}</p>
                <p className="text-[10px] sm:text-sm md:text-base lg:text-lg font-poppins uppercase whitespace-nowrap overflow-hidden text-ellipsis text-right text-[#333333]">{entourage.parents.groom.mother}</p>
              </div>

              {/* Bride's Parents */}
              <div className="flex-1">
                <p className="text-[20px] sm:text-lg imperial-script-regular mb-2 text-left" style={{ color: '#006666' }}>Bride's Parents</p>
                <p className="text-[10px] sm:text-sm md:text-base lg:text-lg font-poppins uppercase whitespace-nowrap overflow-hidden text-ellipsis text-left text-[#333333]">{entourage.parents.bride.father}</p>
                <p className="text-[10px] sm:text-sm md:text-base lg:text-lg font-poppins uppercase whitespace-nowrap overflow-hidden text-ellipsis text-left text-[#333333]">{entourage.parents.bride.mother}</p>
              </div>
            </div>

            {/* Principal Sponsors */}
            {principalSponsors && (
              <div ref={principalSponsorsRef} className="mb-6">
                <h3 className="text-[20px] sm:text-xl md:text-2xl imperial-script-regular mb-6 text-center" style={{ color: '#006666' }}>Principal Sponsors</h3>
                <div className="flex flex-row gap-4 sm:gap-6 justify-center items-center">
                  {/* NINONG Column */}
                  <div className="flex-1">
                    <div className="space-y-2">
                      {principalSponsors.ninong && principalSponsors.ninong.map((name, index) => (
                        <p key={index} className="ninong-item text-[10px] sm:text-sm md:text-base lg:text-lg font-poppins uppercase text-[#333333] text-right whitespace-nowrap overflow-hidden text-ellipsis">
                          {name}
                        </p>
                      ))}
                    </div>
                  </div>
                  {/* NINANG Column */}
                  <div className="flex-1">
                    <div className="space-y-2">
                      {principalSponsors.ninang && principalSponsors.ninang.map((name, index) => (
                        <p key={index} className="ninang-item text-[10px] sm:text-sm md:text-base lg:text-lg font-poppins uppercase text-[#333333] text-left whitespace-nowrap overflow-hidden text-ellipsis">
                          {name}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Secondary Sponsors */}
            {secondarySponsors && (
              <div ref={secondarySponsorsRef} className="mb-6">
                <h3 className="text-[20px] sm:text-xl md:text-2xl imperial-script-regular mb-6 text-center" style={{ color: '#006666' }}>Secondary Sponsors</h3>
                <div className="flex flex-row gap-4 sm:gap-6 justify-center items-start">
                  {/* GROOMSMEN Column */}
                  <div className="flex-1">
                    <p className="text-[20px] sm:text-lg imperial-script-regular mb-2 text-right" style={{ color: '#006666' }}>Groomsmen</p>
                    <div className="space-y-2">
                      {secondarySponsors.groomsmen && secondarySponsors.groomsmen.map((name, index) => (
                        <p key={index} className="groomsmen-item text-[10px] sm:text-sm md:text-base lg:text-lg font-poppins uppercase text-[#333333] text-right whitespace-nowrap overflow-hidden text-ellipsis">
                          {name}
                        </p>
                      ))}
                    </div>
                  </div>
                  {/* BRIDESMAID Column */}
                  <div className="flex-1">
                    <p className="text-[20px] sm:text-lg imperial-script-regular mb-2 text-left" style={{ color: '#006666' }}>Bridesmaids</p>
                    <div className="space-y-2">
                      {secondarySponsors.bridesmaid && secondarySponsors.bridesmaid.map((name, index) => (
                        <p key={index} className="bridesmaids-item text-[10px] sm:text-sm md:text-base lg:text-lg font-poppins uppercase text-[#333333] text-left whitespace-nowrap overflow-hidden text-ellipsis">
                          {name}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bestman and Maid of Honor */}
                <div className="flex flex-row gap-4 sm:gap-6 justify-center items-center mt-6">
                  {/* Bestman */}
                  {bestman && (
                    <div ref={bestmanRef} className="flex-1">
                      <p className="text-[20px] sm:text-lg imperial-script-regular mb-2 text-right" style={{ color: '#006666' }}>Bestman</p>
                      {bestman.names && bestman.names.map((name, index) => (
                        <p key={index} className="text-[10px] sm:text-sm md:text-base lg:text-lg font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis text-right">
                          {name}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* Maid of Honor */}
                  {maidOfHonor && (
                    <div ref={maidOfHonorRef} className="flex-1">
                      <p className="text-[20px] sm:text-lg imperial-script-regular mb-2 text-left" style={{ color: '#006666' }}>Maid Of Honor</p>
                      {maidOfHonor.names && maidOfHonor.names.map((name, index) => (
                        <p key={index} className="text-[10px] sm:text-sm md:text-base lg:text-lg font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis text-left">
                          {name}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Ring Bearer and Flower Girl */}
            {(ringBearer || flowerGirl) && (
              <div className="mb-6">
                <div className="flex flex-row gap-4 sm:gap-6 justify-center items-center mt-6">
                  {/* Ring Bearer */}
                  {ringBearer && (
                    <div ref={ringBearerRef} className="flex-1">
                      <p className="text-[20px] sm:text-lg imperial-script-regular mb-2 text-right" style={{ color: '#006666' }}>Ring Bearer</p>
                      {ringBearer.names && ringBearer.names.map((name, index) => (
                        <p key={index} className="text-[10px] sm:text-sm md:text-base lg:text-lg font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis text-right">
                          {name}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* Flower Girl */}
                  {flowerGirl && (
                    <div ref={flowerGirlRef} className="flex-1">
                      <p className="text-[20px] sm:text-lg imperial-script-regular mb-2 text-left" style={{ color: '#006666' }}>Flower Girl</p>
                      {flowerGirl.names && flowerGirl.names.map((name, index) => (
                        <p key={index} className="text-[10px] sm:text-sm md:text-base lg:text-lg font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis text-left">
                          {name}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      
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

export default Entourage
