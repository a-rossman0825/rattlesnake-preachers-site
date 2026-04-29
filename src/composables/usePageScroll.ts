import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ref, onMounted, onBeforeUnmount } from 'vue'

//registers scrollTrigger
if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger)
};

export const usePageScroll = () => {
  const isScrolling = ref(false);
  const currentSection = ref('hero');
  const scrollProgress = ref(0);

  let scrollTimeout: ReturnType<typeof setTimeout> | null = null;

  const initScrollAnimations = () => {
    if (!import.meta.client) return;

    //smooth scroll config
    gsap.config({
      force3D: true,
    });

    // Track scroll state
    ScrollTrigger.addEventListener('scrollStart', () => {
      isScrolling.value = true;
      if (scrollTimeout) clearTimeout(scrollTimeout);
    });

    ScrollTrigger.addEventListener('scrollEnd', () => {
      scrollTimeout = setTimeout(() => {
        isScrolling.value = false;
      }, 150);
    });

    // SECTION - HERO SECTION ANIMATIONS
    const heroTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          if (self.progress < 0.5) currentSection.value = 'hero';
        },
      },
    });

    heroTimeline
      .fromTo('.hero-section', { opacity: 1, y: 0 }, { opacity: 0, y: -100, ease: 'power2.inOut' });

      //!SECTION
      //SECTION - MEDIA SECTION ANIMATIONS
      const mediaTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.media-section',
          start: 'top bottom',
          end: 'center center', 
          scrub: 1,
          onEnter: () => (currentSection.value = 'media'),
        },
      });

      mediaTimeline
        .fromTo('.media-section', { opacity: 0, y: 100 }, { opacity: 1, y: 0, ease: 'power2.inOut' });

      // Meida section Pin
      ScrollTrigger.create({
        trigger: '.media-section',
        start: 'center center',
        end: '+=800',
        pin: true,
        pinSpacing: true,
        scrub: 1,
      });

      //Media Section fade out
      const mediaFadeOut = gsap.timeline({
        scrollTrigger:{
        trigger: '.media-section',
        start: 'center+=800 center',
        end: 'bottom up',
        scrub: 1,
        },
      });

      mediaFadeOut.to('.media-section', { opacity: 0, y: -100, ease: 'power2.inOut' });

      // !SECTION
      // SECTION - Music Section Animations
      const musicTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.music-section',
          start: 'top bottom', 
          end: 'center center',
          scrub: 1,
          onEnter: () => (currentSection.value = 'music'),
        },
      });

      musicTimeline
        .fromTo('.music-section', { opacity: 0, y: 100 }, { opacity: 1, y: 0, ease: 'power2.inOut' });

      // Music section Horizontal Scroll-Jacking (for Carousel)
      const musicHorizontal = gsap.timeline({
        scrollTrigger: {
          trigger: '.music-section',
          start: 'center center',
          end: '+=3000',
          pin: true,
          scrub: 1, 
          anticipatePin: 1,
        },
      });

      musicHorizontal.to('.carousel__track', {
        x: '0vw',
        ease: 'none',
      });

      // Music section fade out (to left)
      const musicFadeOut = gsap.timeline({
        scrollTrigger: {
          trigger: '.music-section',
          start: 'center+=3000 center', 
          end: 'bottom top',
          scrub: 1,
        },
      });

      musicFadeOut.to('.music-section', { opacity: 0, x: -200, ease: 'power2.inOut' });

    //!SECTION
    // SECTION - MERCH SECTION ANIMATIONS (kaleidoscope rotation)
    const merchTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.merch-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onEnter: () => (currentSection.value = 'merch'),
      },
    });

    merchTimeline.fromTo(
      '.kaleidoscope img',
      { rotation: 0 }, 
      { rotation: 360, ease: 'none' }
    );

    // MERCH section pin and fade in content
    ScrollTrigger.create({
      trigger: '.merch-section',
      start: 'center center',
      end: '+=800',
      pin: true,
      pinSpacing: true,
    });

    const merchContentTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.merch-section',
        start: 'center center',
        end: '+=400',
        scrub: 1,
      },
    });

    merchContentTimeline
      .fromTo('.merch__grid', { opacity: 0 }, { opacity: 1, ease: 'power2.inOut' })
      .fromTo('.store-link', { opacity: 0 }, { opacity: 1, ease: 'power2.inOut' });

    //!SECTION
    //SECTION - SHOWS SECTION ANIMATIONS 
    const showsTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.shows-section',
        start: 'top bottom',
        end: 'center center', 
        scrub: 1,
        onEnter: () => (currentSection.value = 'shows'),
      },
    });

    showsTimeline
      .fromTo('.shows-section', { opacity: 0, x: 100 }, { opacity: 1, x: 0, ease: 'power2.inOut' });

    // Update scroll progress
    ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        scrollProgress.value = self.progress;
      },
    });
  };

  const cleanup = () => {
    if (import.meta.client) {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  };

  onMounted(() => {
    initScrollAnimations();
  });

  onBeforeUnmount(() => {
    cleanup();
  });

  return {
    isScrolling,
    currentSection,
    scrollProgress,
    initScrollAnimations,
    cleanup,
  }
}
