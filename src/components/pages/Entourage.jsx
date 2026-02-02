import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft } from 'lucide-react'
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
  const bibleBearerRef = useRef(null)
  const ringBearerRef = useRef(null)
  const coinBearerRef = useRef(null)
  const flowerGirlsRef = useRef(null)

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
      const groomName = groomRef.current.querySelector('p.font-poppins')
      const brideName = groomRef.current.parentElement?.querySelector('[class*="flex-1"]:last-child')?.querySelector('p.font-poppins')
      
      if (groomName && brideName) {
        const row = [groomName, brideName]
        gsap.set(row, { opacity: 0, y: 20 })
        
        ScrollTrigger.create({
          trigger: groomRef.current,
          start: "top 80%",
          onEnter: () => {
            gsap.to(row, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out"
            })
          },
          toggleActions: "play none none reverse"
        })
      }
    }

    // Parents section animation - animate row by row (one row after the other)
    if (parentsRef.current) {
      const groomParentsDiv = parentsRef.current.querySelector('[class*="flex-1"]:first-child')
      const brideParentsDiv = parentsRef.current.querySelector('[class*="flex-1"]:last-child')
      
      if (groomParentsDiv && brideParentsDiv) {
        const groomParentsNames = groomParentsDiv.querySelectorAll('p.font-poppins')
        const brideParentsNames = brideParentsDiv.querySelectorAll('p.font-poppins')
        
        if (groomParentsNames && brideParentsNames) {
          const groomArray = Array.from(groomParentsNames)
          const brideArray = Array.from(brideParentsNames)
          const maxLength = Math.max(groomArray.length, brideArray.length)
          
          // Create row pairs
          const rows = []
          for (let i = 0; i < maxLength; i++) {
            const row = []
            if (groomArray[i]) row.push(groomArray[i])
            if (brideArray[i]) row.push(brideArray[i])
            if (row.length > 0) rows.push(row)
          }
          
          if (rows.length > 0) {
            rows.forEach(row => {
              gsap.set(row, { opacity: 0, y: 20 })
            })
            
            ScrollTrigger.create({
              trigger: parentsRef.current,
              start: "top 80%",
              onEnter: () => {
                rows.forEach((row, index) => {
                  gsap.to(row, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power2.out",
                    delay: index * 0.15
                  })
                })
              },
              toggleActions: "play none none reverse"
            })
          }
        }
      }
    }

    // Principal Sponsors animation - animate row by row (one row after the other)
    if (principalSponsorsRef.current) {
      const ninongElements = principalSponsorsRef.current?.querySelectorAll('.ninong-item')
      const ninangElements = principalSponsorsRef.current?.querySelectorAll('.ninang-item')
      
      if (ninongElements && ninangElements) {
        const ninongArray = Array.from(ninongElements)
        const ninangArray = Array.from(ninangElements)
        const maxLength = Math.max(ninongArray.length, ninangArray.length)
        
        // Create row pairs
        const rows = []
        for (let i = 0; i < maxLength; i++) {
          const row = []
          if (ninongArray[i]) row.push(ninongArray[i])
          if (ninangArray[i]) row.push(ninangArray[i])
          if (row.length > 0) rows.push(row)
        }
        
        if (rows.length > 0) {
          // Set initial state for all items
          rows.forEach(row => {
            gsap.set(row, { opacity: 0, y: 20 })
          })
          
          ScrollTrigger.create({
            trigger: principalSponsorsRef.current,
            start: "top 80%",
            onEnter: () => {
              // Animate each row one after the other
              rows.forEach((row, index) => {
                gsap.to(row, {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  ease: "power2.out",
                  delay: index * 0.15
                })
              })
            },
            toggleActions: "play none none reverse"
          })
        }
      }
    }

    // Secondary Sponsors animation - animate row by row (one row after the other)
    if (secondarySponsorsRef.current) {
      const groomsmenElements = secondarySponsorsRef.current?.querySelectorAll('.groomsmen-item')
      const bridesmaidsElements = secondarySponsorsRef.current?.querySelectorAll('.bridesmaids-item')
      
      if (groomsmenElements && bridesmaidsElements) {
        const groomsmenArray = Array.from(groomsmenElements)
        const bridesmaidsArray = Array.from(bridesmaidsElements)
        const maxLength = Math.max(groomsmenArray.length, bridesmaidsArray.length)
        
        // Create row pairs
        const rows = []
        for (let i = 0; i < maxLength; i++) {
          const row = []
          if (groomsmenArray[i]) row.push(groomsmenArray[i])
          if (bridesmaidsArray[i]) row.push(bridesmaidsArray[i])
          if (row.length > 0) rows.push(row)
        }
        
        if (rows.length > 0) {
          // Set initial state for all items
          rows.forEach(row => {
            gsap.set(row, { opacity: 0, y: 20 })
          })
          
          ScrollTrigger.create({
            trigger: secondarySponsorsRef.current,
            start: "top 80%",
            onEnter: () => {
              // Animate each row one after the other
              rows.forEach((row, index) => {
                gsap.to(row, {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  ease: "power2.out",
                  delay: index * 0.15
                })
              })
            },
            toggleActions: "play none none reverse"
          })
        }
      }
    }

    // Bestman and Maid of Honor - animate row by row (one row after the other)
    if (bestmanRef.current && maidOfHonorRef.current) {
      const bestmanNames = bestmanRef.current.querySelectorAll('p.font-poppins')
      const maidOfHonorNames = maidOfHonorRef.current.querySelectorAll('p.font-poppins')
      
      if (bestmanNames && maidOfHonorNames) {
        const bestmanArray = Array.from(bestmanNames)
        const maidOfHonorArray = Array.from(maidOfHonorNames)
        const maxLength = Math.max(bestmanArray.length, maidOfHonorArray.length)
        
        // Create row pairs
        const rows = []
        for (let i = 0; i < maxLength; i++) {
          const row = []
          if (bestmanArray[i]) row.push(bestmanArray[i])
          if (maidOfHonorArray[i]) row.push(maidOfHonorArray[i])
          if (row.length > 0) rows.push(row)
        }
        
        if (rows.length > 0) {
          const pairContainer = bestmanRef.current.parentElement
          if (pairContainer) {
            // Set initial state for all items
            rows.forEach(row => {
              gsap.set(row, { opacity: 0, y: 20 })
            })
            
            ScrollTrigger.create({
              trigger: pairContainer,
              start: "top 80%",
              onEnter: () => {
                // Animate each row one after the other
                rows.forEach((row, index) => {
                  gsap.to(row, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power2.out",
                    delay: index * 0.15
                  })
                })
              },
              toggleActions: "play none none reverse"
            })
          }
        }
      }
    }

    // Bible Bearer, Ring Bearer, Coin Bearer, and Flower Girls - animate each section one after the other
    const bearerRefs = [bibleBearerRef, ringBearerRef, coinBearerRef, flowerGirlsRef].filter(ref => ref.current)
    if (bearerRefs.length > 0) {
      const container = bearerRefs[0].current.parentElement
      if (container) {
        // Set initial state for all items
        bearerRefs.forEach(ref => {
          const names = ref.current.querySelectorAll('p.font-poppins')
          if (names) {
            gsap.set(Array.from(names), { opacity: 0, y: 20 })
          }
        })
        
        ScrollTrigger.create({
          trigger: container,
          start: "top 80%",
          onEnter: () => {
            // Animate each section (bearer category) one after the other
            bearerRefs.forEach((ref, sectionIndex) => {
              const names = ref.current.querySelectorAll('p.font-poppins')
              if (names) {
                const namesArray = Array.from(names)
                // Animate all names in this section together, but each section after the previous
                gsap.to(namesArray, {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  ease: "power2.out",
                  delay: sectionIndex * 0.3,
                  stagger: 0.1
                })
              }
            })
          },
          toggleActions: "play none none reverse"
        })
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
  const bibleBearer = entourage.entourageList.find(item => item.category === "Bible Bearer")
  const ringBearer = entourage.entourageList.find(item => item.category === "Ring Bearer")
  const coinBearer = entourage.entourageList.find(item => item.category === "Coin Bearer")
  const flowerGirls = entourage.entourageList.find(item => item.category === "Flower Girls")

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
          paddingLeft: '1rem',
          paddingRight: '1rem',
          paddingTop: '4rem',
          paddingBottom: '4rem'
        }}
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/assets/images/graphics/bg-3.png)',
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
                <span className="imperial-script-regular text-4xl sm:text-5xl md:text-6xl lg:text-7xl inline-block leading-none capitalize" style={{ lineHeight: '0.8', color: '#800000' }}>Entourage</span>
              </h2>
            </div>

            {/* Groom and Bride Names - Side by Side */}
            <div ref={groomRef} className="mb-6 flex flex-row gap-4 sm:gap-6 justify-center items-center">
              {/* Groom Name */}
              <div className="flex-1">
                <p className="text-[10px] sm:text-sm md:text-base lg:text-lg alice-regular mb-2 text-right uppercase" style={{ color: '#800000' }}>Name Of Groom</p>
                <p className="text-[10px] sm:text-sm md:text-base lg:text-lg font-poppins uppercase whitespace-nowrap overflow-hidden text-ellipsis text-right text-[#333333]">{removeMiddleInitial(entourage.couple.groom.name)}</p>
              </div>

              {/* Bride Name */}
              <div className="flex-1">
                <p className="text-[10px] sm:text-sm md:text-base lg:text-lg alice-regular mb-2 text-left uppercase" style={{ color: '#800000' }}>Name Of Bride</p>
                <p className="text-[10px] sm:text-sm md:text-base lg:text-lg font-poppins uppercase whitespace-nowrap overflow-hidden text-ellipsis text-left text-[#333333]">{removeMiddleInitial(entourage.couple.bride.name)}</p>
              </div>
            </div>

            {/* Parents Section */}
            <div ref={parentsRef} className="mb-6 flex flex-row gap-4 sm:gap-6 justify-center items-center">
              {/* Groom's Parents */}
              <div className="flex-1">
                <p className="text-[10px] sm:text-sm md:text-base lg:text-lg alice-regular mb-2 text-right uppercase" style={{ color: '#800000' }}>Groom's Parents</p>
                <p className="text-[10px] sm:text-sm md:text-base lg:text-lg font-poppins uppercase whitespace-nowrap overflow-hidden text-ellipsis text-right text-[#333333]">{entourage.parents.groom.father}</p>
                <p className="text-[10px] sm:text-sm md:text-base lg:text-lg font-poppins uppercase whitespace-nowrap overflow-hidden text-ellipsis text-right text-[#333333]">{entourage.parents.groom.mother}</p>
              </div>

              {/* Bride's Parents */}
              <div className="flex-1">
                <p className="text-[10px] sm:text-sm md:text-base lg:text-lg alice-regular mb-2 text-left uppercase" style={{ color: '#800000' }}>Bride's Parents</p>
                <p className="text-[10px] sm:text-sm md:text-base lg:text-lg font-poppins uppercase whitespace-nowrap overflow-hidden text-ellipsis text-left text-[#333333]">{entourage.parents.bride.father}</p>
                <p className="text-[10px] sm:text-sm md:text-base lg:text-lg font-poppins uppercase whitespace-nowrap overflow-hidden text-ellipsis text-left text-[#333333]">{entourage.parents.bride.mother}</p>
              </div>
            </div>

            {/* Principal Sponsors */}
            {principalSponsors && (
              <div ref={principalSponsorsRef} className="mb-6">
                <h3 className="text-lg imperial-script-regular mb-6 text-center capitalize" style={{ color: '#800000' }}>Principal Sponsors</h3>
                <div className="flex flex-row gap-4 sm:gap-6 justify-center items-center">
                  {/* NINONG Column */}
                  <div className="flex-1">
                    <p className="text-[10px] sm:text-sm md:text-base lg:text-lg alice-regular mb-2 text-right uppercase" style={{ color: '#800000' }}>NINONG</p>
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
                    <p className="text-[10px] sm:text-sm md:text-base lg:text-lg alice-regular mb-2 text-left uppercase" style={{ color: '#800000' }}>NINANG</p>
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
                <h3 className="text-lg imperial-script-regular mb-6 text-center capitalize" style={{ color: '#800000' }}>Secondary Sponsors</h3>

                {/* Bestman and Maid of Honor */}
                <div className="flex flex-row gap-4 sm:gap-6 justify-center items-center mb-6">
                  {/* Bestman */}
                  {bestman && (
                    <div ref={bestmanRef} className="flex-1">
                      <p className="text-[10px] sm:text-sm md:text-base lg:text-lg alice-regular mb-2 text-right uppercase" style={{ color: '#800000' }}>Bestman</p>
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
                      <p className="text-[10px] sm:text-sm md:text-base lg:text-lg alice-regular mb-2 text-left uppercase" style={{ color: '#800000' }}>Maid Of Honor</p>
                      {maidOfHonor.names && maidOfHonor.names.map((name, index) => (
                        <p key={index} className="text-[10px] sm:text-sm md:text-base lg:text-lg font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis text-left">
                          {name}
                        </p>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-row gap-4 sm:gap-6 justify-center items-start">
                  {/* GROOMSMEN Column */}
                  <div className="flex-1">
                    <p className="text-[10px] sm:text-sm md:text-base lg:text-lg alice-regular mb-2 text-right uppercase" style={{ color: '#800000' }}>Groomsmen</p>
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
                    <p className="text-[10px] sm:text-sm md:text-base lg:text-lg alice-regular mb-2 text-left uppercase" style={{ color: '#800000' }}>Bridesmaids</p>
                    <div className="space-y-2">
                      {secondarySponsors.bridesmaid && secondarySponsors.bridesmaid.map((name, index) => (
                        <p key={index} className="bridesmaids-item text-[10px] sm:text-sm md:text-base lg:text-lg font-poppins uppercase text-[#333333] text-left whitespace-nowrap overflow-hidden text-ellipsis">
                          {name}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bible Bearer, Ring Bearer, Coin Bearer, and Flower Girls */}
            {(bibleBearer || ringBearer || coinBearer || flowerGirls) && (
              <div className="mb-6">
                <div className="flex flex-col gap-6 justify-center items-center mt-6">
                    {/* Bible Bearer */}
                    {bibleBearer && (
                      <div ref={bibleBearerRef}>
                      <p className="text-[10px] sm:text-sm md:text-base lg:text-lg alice-regular mb-2 text-center uppercase" style={{ color: '#800000' }}>Bible Bearer</p>
                        {bibleBearer.names && bibleBearer.names.map((name, index) => (
                        <p key={index} className="text-[10px] sm:text-sm md:text-base lg:text-lg font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis text-center">
                            {name}
                          </p>
                        ))}
                      </div>
                    )}

                    {/* Ring Bearer */}
                    {ringBearer && (
                      <div ref={ringBearerRef}>
                      <p className="text-[10px] sm:text-sm md:text-base lg:text-lg alice-regular mb-2 text-center uppercase" style={{ color: '#800000' }}>Ring Bearer</p>
                        {ringBearer.names && ringBearer.names.map((name, index) => (
                        <p key={index} className="text-[10px] sm:text-sm md:text-base lg:text-lg font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis text-center">
                            {name}
                          </p>
                        ))}
                      </div>
                    )}

                    {/* Coin Bearer */}
                    {coinBearer && (
                      <div ref={coinBearerRef}>
                      <p className="text-[10px] sm:text-sm md:text-base lg:text-lg alice-regular mb-2 text-center uppercase" style={{ color: '#800000' }}>Coin Bearer</p>
                        {coinBearer.names && coinBearer.names.map((name, index) => (
                        <p key={index} className="text-[10px] sm:text-sm md:text-base lg:text-lg font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis text-center">
                            {name}
                          </p>
                        ))}
                      </div>
                    )}

                    {/* Flower Girls */}
                    {flowerGirls && (
                      <div ref={flowerGirlsRef}>
                      <p className="text-[10px] sm:text-sm md:text-base lg:text-lg alice-regular mb-2 text-center uppercase" style={{ color: '#800000' }}>Flower Girls</p>
                        {flowerGirls.names && flowerGirls.names.map((name, index) => (
                        <p key={index} className="text-[10px] sm:text-sm md:text-base lg:text-lg font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis text-center">
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
