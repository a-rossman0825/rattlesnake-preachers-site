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
          pinSpacing: true,
          markers: true
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
        scrub: 1,
        markers: true,
      }
    })
    mediaFadeInTl.fromTo('.media-section', { opacity: 0 }, { opacity: 1, ease: 'power2.inOut' }, 0)
    mediaFadeInTl.fromTo('.media-section h1', { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: 'power2.out' }, 0)

    // Pin + fade out 
    const mediaPinTl = gsap.timeline()
    mediaPinTl.to('.media-section', { duration: 1.5 }) // hold — no opacity change, avoids replaying fade-in
    mediaPinTl.to('.media-section', { opacity: 0, ease: 'power2.inOut', duration: 0.5 })

    ScrollTrigger.create({
      trigger: '.media-section',
      start: 'center center',
      end: '+=2000',
      pin: true,
      pinSpacing: true,
      scrub: 3,
      animation: mediaPinTl,
      markers: true,
      onEnter: () => { canStamp.value = true },
      onLeave: () => { canStamp.value = false },
      onEnterBack: () => { canStamp.value = true },
      onLeaveBack: () => { canStamp.value = false },
    })
    // !SECTION

    // SECTION - MUSIC

    gsap.set('.music-section-wrapper', { opacity: 0 })


    const musicPinTl = gsap.timeline()
    musicPinTl.fromTo(
      '.music-section-wrapper',
      { opacity: 0 },
      { opacity: 1, ease: 'power2.inOut', duration: 0.5 }
    )
    musicPinTl.to('.music-section-wrapper', { opacity: 1, duration: 1 }) 

    ScrollTrigger.create({
      trigger: '.music-section-wrapper',
      start: 'top top+=40',
      end: '+=800',
      pin: true,
      pinSpacing: true,
      scrub: 3,
      animation: musicPinTl,
      markers: true
    })

    // Fade out 
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
          scrub: 1,
          markers: true
        }
      }
    )
    // !SECTION
  })

  onBeforeUnmount(() => {
    ScrollTrigger.getAll().forEach((tl) => tl.kill())
    lenis?.destroy()
  })
}
