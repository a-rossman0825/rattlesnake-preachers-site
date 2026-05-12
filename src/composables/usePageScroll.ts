import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { onMounted, onBeforeUnmount } from 'vue'
import { canStamp } from './useMediaState'

// Register ScrollTrigger plugin (client-only)
if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger)
}

let lenis: Lenis | undefined

export const usePageScroll = () => {
  onMounted(() => {
    if (!import.meta.client) return

    // SECTION - LENIS SMOOTH SCROLL
    lenis = new Lenis({
      duration: 3, // higher = heavier/slower feeling scroll
      smoothWheel: true
    })

    // Keep ScrollTrigger in sync with Lenis scroll position
    lenis.on('scroll', ScrollTrigger.update)

    // Hook Lenis into GSAP's ticker
    gsap.ticker.add((time) => {
      lenis?.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)
    // !SECTION

    //SECTION - HERO
    const heroTl = gsap.timeline()
    // fade in on load
    heroTl.fromTo(
      '.hero-section',
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: 'power2.inOut' }
    )
    // Fade out on scroll
    gsap.fromTo(
      '.hero-section',
      { opacity: 1, y: 0 },
      {
        opacity: 0,
        y: -80,
        ease: 'power2.inOut',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom+=500 top',
          scrub: 3,
          pin: true,
          pinSpacing: true
        }
      }
    )
    //!SECTION

    // SECTION - MEDIA
    // Fade in
    const mediaFadeInTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.media-section',
        start: 'top center',
        end: 'top top+=40',
        scrub: 1
      }
    })
    mediaFadeInTl.fromTo('.media-section', { opacity: 0 }, { opacity: 1, ease: 'power2.inOut' }, 0)
    mediaFadeInTl.fromTo(
      '.media-section h1',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, ease: 'power2.out' },
      0
    )

    // Pin + fade out (timeline-bound ScrollTrigger to avoid trigger overlap)
    const mediaPinTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.media-section',
        start: 'center center',
        end: '+=2000',
        pin: true,
        pinSpacing: true,
        scrub: 3,
        onEnter: () => {
          canStamp.value = true
        },
        onLeave: () => {
          canStamp.value = false
        },
        onEnterBack: () => {
          canStamp.value = true
        },
        onLeaveBack: () => {
          canStamp.value = false
        }
      }
    })

    // hold (no opacity change) then fade out
    mediaPinTl.to('.media-section', { duration: 1.5 })
    mediaPinTl.to('.media-section', { opacity: 0, ease: 'power2.inOut', duration: 0.5 })
    // !SECTION

    // SECTION - MUSIC
    gsap.set('.music-section-wrapper', { opacity: 0 })
    // Lock all album cards + details to invisible before timeline runs
    gsap.set('.album-card', { opacity: 0, x: '60vw' })
    gsap.set('.album-card__details', { opacity: 0 })

    const musicPinTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.music-section-wrapper',
        start: 'top top+=40',
        end: '+=4000',
        pin: true,
        pinSpacing: true,
        scrub: 3,
        markers: true
      }
    })

    // Fade section wrapper in
    musicPinTl.fromTo(
      '.music-section-wrapper',
      { opacity: 0 },
      { opacity: 1, ease: 'power2.inOut', duration: 0.2 }
    )

    // Helper: one album's full cycle
    const albumCycle = (n: number, isLast: boolean) => {
      const card = `.album-card:nth-child(${n})`
      const details = `${card} .album-card__details`

      // Cover slides in from right + fades in
      musicPinTl.fromTo(
        card,
        { x: '60vw', opacity: 0 },
        { x: '0vw', opacity: 1, ease: 'power2.out', duration: 0.4 }
      )
      // Details fade in once cover is in position
      musicPinTl.fromTo(
        details,
        { opacity: 0 },
        { opacity: 1, ease: 'power2.inOut', duration: 0.2 }
      )
      // Hold
      musicPinTl.to(card, { duration: 0.4 })
      // Details fade out
      musicPinTl.to(details, { opacity: 0, ease: 'power2.inOut', duration: 0.2 })

      if (!isLast) {
        // Cover slides left + fades out before hitting edge
        musicPinTl.to(card, { x: '-40vw', opacity: 0, ease: 'power2.in', duration: 0.4 })
      }
    }

    albumCycle(1, false)
    albumCycle(2, false)
    albumCycle(3, true)

    // Brief hold after last album before releasing pin
    musicPinTl.to('.music-section-wrapper', { duration: 0.3 })

    // Fade out (after pin releases)
    gsap.fromTo(
      '.music-section-wrapper',
      { opacity: 1 },
      {
        opacity: 0,
        ease: 'power2.inOut',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.music-section-wrapper',
          start: 'center center',
          end: 'bottom top',
          scrub: 1
        }
      }
    )
    // !SECTION

    // SECTION - MERCH
    // Set initial states — GSAP owns opacity/position, not SCSS
    gsap.set('.merch__grid .merch-item:nth-child(1)', { opacity: 0, y: -100 })
    gsap.set('.merch__grid .merch-item:nth-child(2)', { opacity: 0, x: 100 })
    gsap.set('.merch__grid .merch-item:nth-child(3)', { opacity: 0, x: -100 })
    gsap.set('.merch__grid .merch-item:nth-child(4)', { opacity: 0, y: 100 })
    gsap.set('.store-link', { opacity: 0 })

    // Pre-pin: rotate exactly 360° as section enters viewport — completes right when pin engages
    gsap.fromTo(
      '.kaleidoscope img',
      { rotation: 0 },
      {
        rotation: 360,
        ease: 'none',
        scrollTrigger: {
          trigger: '.merch-section',
          start: 'top bottom',
          end: 'top top',
          scrub: 2
        }
      }
    )

    const merchTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.merch-section',
        start: 'top top',
        end: '+=2000',
        pin: true,
        pinSpacing: true,
        scrub: 2,
        markers: true
      }
    })

    // Phase 1: hold while ouroboros has finished rotating
    merchTl.to('.merch-section', { duration: 2 })

    // Phase 2: merch items slide in from 4 directions simultaneously
    merchTl.to(
      '.merch__grid .merch-item:nth-child(1)',
      { opacity: 1, y: 0, ease: 'power2.out', duration: 0.4 },
      '<'
    )
    merchTl.to(
      '.merch__grid .merch-item:nth-child(2)',
      { opacity: 1, x: 0, ease: 'power2.out', duration: 0.4 },
      '<'
    )
    merchTl.to(
      '.merch__grid .merch-item:nth-child(3)',
      { opacity: 1, x: 0, ease: 'power2.out', duration: 0.4 },
      '<'
    )
    merchTl.to(
      '.merch__grid .merch-item:nth-child(4)',
      { opacity: 1, y: 0, ease: 'power2.out', duration: 0.4 },
      '<'
    )
    merchTl.to('.store-link', { opacity: 1, ease: 'power2.out', duration: 0.3 }, '<')

    // Phase 3: hold
    merchTl.to('.merch-section', { duration: 1 })

    // Phase 4: items exit back in the same direction they came from, section fades + ouroboros resumes rotation simultaneously
    merchTl.to('.merch__grid .merch-item:nth-child(1)', {
      opacity: 0,
      y: -100,
      ease: 'power2.in',
      duration: 1.5
    })
    merchTl.to(
      '.merch__grid .merch-item:nth-child(2)',
      { opacity: 0, x: 100, ease: 'power2.in', duration: 1.5 },
      '<'
    )
    merchTl.to(
      '.merch__grid .merch-item:nth-child(3)',
      { opacity: 0, x: -100, ease: 'power2.in', duration: 1.5 },
      '<'
    )
    merchTl.to(
      '.merch__grid .merch-item:nth-child(4)',
      { opacity: 0, y: 100, ease: 'power2.in', duration: 1.5 },
      '<'
    )
    merchTl.to('.store-link', { opacity: 0, ease: 'power2.in', duration: 1.2 }, '<')
    merchTl.to('.kaleidoscope img', { rotation: 720, ease: 'none', duration: 2 }, '<')
    merchTl.to('.merch-section', { opacity: 0, ease: 'power2.inOut', duration: 1.5 }, '<')
    // !SECTION

    // SECTION - SHOWS
    const showsTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.shows-section',
        start: 'top top',
        end: '+=1000',
        pin: true,
        pinSpacing: true,
        scrub: 2,
        markers: true
      }
    })
    showsTl.fromTo(
      '.shows__inner',
      { opacity: 0 },
      { opacity: 1, ease: 'power2.out', duration: 0.5 }
    )
    showsTl.to('.shows__inner', { duration: 1 }) // hold
    // !SECTION
  })

  onBeforeUnmount(() => {
    ScrollTrigger.getAll().forEach((tl) => tl.kill())
    lenis?.destroy()
  })
}
