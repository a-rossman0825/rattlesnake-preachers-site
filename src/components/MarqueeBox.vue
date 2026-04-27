<script lang="ts" setup>
import { ref, onMounted, nextTick, onBeforeUnmount } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { gsap } from 'gsap';
import { useRouter } from '#vue-router';

// const DEBUG = false; //for debugging: uncomment "console.logs()" and switch DEBUG to true.

const props = defineProps<{
  phrase?: string,
  speed?: number
}>();

// SECTION - CONFIG
const router = useRouter();
const phrase = props.phrase || 'FEAST YOUR EARS';
const phraseLength = phrase.length;
const LETTER_SPACING = 4;
const MIN_PHRASE_GAP = 12;
const MAX_PHRASE_GAP = 28;
const TARGET_PHRASE_GAP = 300;
const padding = 15;
let speed = props.speed || 80; //NOTE - Adjust speed for animation speed (duh lol)
//!SECTION

// SECTION - REACTIVE STATE
const chars = ref<string[]>(phrase.split(''));
const stage = ref<HTMLElement | null>(null);
const charRefs = ref<HTMLElement[]>([]);
//!SECTION

// SECTION - LAYOUT STATE 
let width = 0;
let height = 0;
let innerWidth = 0;
let innerHeight = 0;
let perimeter = 0;
//!SECTION

// SECTION - ANIMATION STATE
let position = 0;
let lastTotalLength = 1;
let ticker: (() => void) | null = null;
//!SECTION

//SECTION - INTERNALS
let currentGap = 0;
let resizeTimeout: ReturnType<typeof setTimeout> | null = null; // NOTE - Timeout so resize doesn't fire fullBuild 100000000 times at once
//!SECTION 

  //SECTION - ACCESSIBILITY HANDLERS
const prefersReducedMotion = ref(false);
//!SECTION

/**
 * @returns a ref setter function for each index
 */
function setCharRef(index: number) {
  return (el: Element | ComponentPublicInstance | null) => {
    if (el instanceof HTMLElement) {
      charRefs.value[index] = el;
    };
  };
};

// map char positions onto rect
function perimeterToXY(p: number) {
  let pos = ((p % perimeter) + perimeter) % perimeter;

  if (pos < innerWidth) {
    return { x: padding + pos, y: padding, angle: 0 };
  };

  pos -= innerWidth;

  if (pos < innerHeight) {
    return { x: width - padding, y: padding + pos, angle: 90 };
  };

  pos -= innerHeight;

  if (pos < innerWidth) {
    return { x: width - padding - pos, y: height - padding, angle: 180 };
  };

  pos -= innerWidth;

  return { x: padding, y: height - padding - pos, angle: 270 };

};

/**
 * measures/calculates stage (rect)
 * @returns false if layout is invalid (clean early)
 * @returns bool if width > 0 && height > 0
 */
function measureStage() {
  if (!stage.value) return false;

  // Measure rectangle dimensions
  const rect = stage.value.getBoundingClientRect();

  width = rect.width;
  height = rect.height;
  innerWidth = width - padding * 2;
  innerHeight = height - padding * 2;
  perimeter = innerWidth * 2 + innerHeight * 2;

  return width > 0 && height > 0;
};

/**
 * measures width of phrase and returns
 * @returns phraseWidth
 */
function measurePhraseWidth(): number {
  const rawWidth = charRefs.value.reduce((sum, el) => {
    return sum + el.offsetWidth;
  }, 0);
  return rawWidth + LETTER_SPACING * (phraseLength - 1);
};

/**
 * calculates how many phraseCopies & Gap size on Rect
 * @returns //{ copies, gap }
 */
function computeCopiesAndGap(phraseWidth: number) {
  let copies = Math.max(1, Math.floor(perimeter / (phraseWidth + TARGET_PHRASE_GAP)));
  let gap = (perimeter - copies * phraseWidth) / copies;

  //   // Clamp to stop gap from every getting too large
  // if (gap < MIN_PHRASE_GAP) {
  //   copies = Math.max(1, copies - 1);
  //   gap = Math.min(gap, MAX_PHRASE_GAP);
  // }

  // gap = Math.min(gap, MAX_PHRASE_GAP);

  gap = Math.max(MIN_PHRASE_GAP, Math.min(gap, MAX_PHRASE_GAP));

  return { copies, gap };
};

/**
 * builds the stream of phrases
 * @param copies 
 * @returns string[] - array of chars
 */
function buildStream(copies: number): string[] {
  const stream: string[] = [];

  for (let copy = 0; copy < copies; copy++) {
    for (let i = 0; i < phraseLength; i++) {
      stream.push(phrase[i]!);
    };
  };
  return stream;
};

/**
 * Measures Rect & phrase, sets chars on layout, builds the stream, then triggers re-render
 * @returns void (sets State)
 */
function rebuild() {

  const valid = measureStage();
  if (!valid) {
    console.warn('Invalid dimensions, aborting layout');
    return;
  };

  const phraseWidth = measurePhraseWidth();
  if (phraseWidth <= 0) return;

  const { copies, gap } = computeCopiesAndGap(phraseWidth);
  currentGap = gap;

  const stream = buildStream(copies);

  charRefs.value = [];
  chars.value = stream;

  //NOTE - refactored - saved for safety because my code never works
  // // Define rectangle path
  // if (!stage.value) return;

  // // Measure rectangle dimensions
  // const rect = stage.value.getBoundingClientRect();

  // width = rect.width;
  // height = rect.height;
  // innerWidth = width - padding * 2;
  // innerHeight = height - padding * 2;

  // perimeter = innerWidth * 2 + innerHeight * 2;
  // //if (DEBUG) console.log('RECT', { width, height, perimeter });

  // if (height === 0 || width === 0){
  //   console.warn('Invalid dimensions, aborting layout');
  //   return;
  // };

  // //if (DEBUG) console.log('chars:', chars.value);
  // //if (DEBUG) console.log('charRefs:', charRefs.value);

  // // Get measurement of phrase ("FEAST YOUR EARS") to space along Rect
  // const rawPhraseWidth = charRefs.value.reduce((sum, el) => {
  //   return sum + el.offsetWidth;
  // }, 0);

  // const phraseWidth = rawPhraseWidth + LETTER_SPACING * (phraseLength -1);

  // //if (DEBUG) console.log('phraseWidth:', phraseWidth);

  // if (!phraseWidth) return;

  // let phraseCopies = Math.max(1, Math.floor(perimeter / phraseWidth));

  // let gapPerPhrase = (perimeter - phraseCopies * phraseWidth) / phraseCopies;

  // // Clamp to stop gap from every getting too large
  // if (gapPerPhrase < MIN_PHRASE_GAP) {
  //   phraseCopies = Math.max(1, phraseCopies - 1);
  //   gapPerPhrase = Math.min(gapPerPhrase, MAX_PHRASE_GAP);
  // }

  // currentGap = gapPerPhrase; // Set global gap to stop overlap

  // //if (DEBUG) console.log({ phraseCopies, gapPerPhrase });

  // // Build stream of phraseCopies
  // const stream: string[] = [];

  // for (let copy = 0; copy < phraseCopies; copy++) {
  //   for (let i = 0; i < phrase.length; i++) {
  //     stream.push(phrase[i]!);
  //   };
  // };

  // // Re-render stream
  // charRefs.value = []; // clear old refs
  // chars.value = stream; // trigger new render

  // //if (DEBUG) console.log('charRefs length:', charRefs.value.length);
  // //if (DEBUG) console.log('stream length:', stream.length);

};

/**
 * measures full length of phraseStream and adds Gap
 * @param gapPerPhrase 
 * @returns totalLength
 */
function computeTotalLength(gapPerPhrase: number): number {
  let cursor = 0;
  // FIRST PASS: measure total length
  charRefs.value.forEach((el, i) => {
    cursor += el.offsetWidth + LETTER_SPACING;
    
    // Add gap to full phrase
    if ((i + 1) % phraseLength === 0) {
      cursor += gapPerPhrase;
    }
  });
  return cursor || 1;
};

/**
 * calculates position of each char
 * @param base 
 * @param offset 
 * @param total 
 * @returns number (position)
 */
function computeWrappedPosition(base: number, offset: number, total: number): number {
  let p = base + offset;
  if (p >= total) p -= total;
  return p;
}


// Sets char layout and animates ticker
function startTicker(gapPerPhrase: number) {
  // stop old ticker if it exists
  if (ticker) {
    gsap.ticker.remove(ticker);
  };
  // Skip animation if user prefers reduced motion
  if (prefersReducedMotion.value) return;

  //NOTE - refactored
  // //recompute totalLength
  // let cursor = 0;
  // // FIRST PASS: measure total length
  // charRefs.value.forEach((el, i) => {
  //   cursor += el.offsetWidth + LETTER_SPACING;
    
  //   // Add gap to full phrase
  //   if ((i + 1) % phraseLength === 0) {
  //     cursor += gapPerPhrase;
  //   }
  // });

  const totalLength = computeTotalLength(gapPerPhrase);
  lastTotalLength = totalLength;
  //if (DEBUG) console.log('totalLength:', totalLength);
  // SECOND PASS: set chars layout & animate ticker
  ticker = () => {

    const dt = gsap.ticker.deltaRatio() / 60;
    position += speed * dt;

    // loop position on stream end & wrap global position
    if (position >= totalLength) {
      position -= totalLength;
    };

    let cursor = 0;

    charRefs.value.forEach((el, i) => {
      const charWidth = el.offsetWidth;
      const charHeight = el.offsetHeight;

      // NOTE - refactored
      // let p = position + cursor;

      const p = computeWrappedPosition(position, cursor, totalLength);

      // NOTE - refactored
      //wrap each char individually
      // if (p >= totalLength) {
      //   p -= totalLength;
      // };

      const perimeterPos = (p / totalLength) * perimeter;
      const { x, y, angle } = perimeterToXY(perimeterPos);

      gsap.set(el, {
        x: x - charWidth / 2,
        y: y - charHeight / 2,
        rotation: angle,
      });
      // advnance cursor
      cursor += charWidth + LETTER_SPACING;
      // Add a gap after each phrase
      if ((i + 1) % phraseLength === 0) {
        cursor += gapPerPhrase;
      };
    });
  };

  gsap.ticker.add(ticker);
}

// Combine rebuild + animation on refresh/viewport resize
async function fullRebuild() {

  if (!stage.value) return;

  // Capture animation progress before rebuild
  const progress = lastTotalLength ? position / lastTotalLength : 0;

  // Force clean base phrase
  charRefs.value = [];
  chars.value = phrase.split('');

  await nextTick(); // wait for DOM to rehydrate

  //rebuild with clean refs
  rebuild();

  await nextTick(); // wait for stream to render

  startTicker(currentGap);

  position = progress * lastTotalLength;
};

// Sets timeout on resize so fullRebuild() doesn't fire every time the viewport changes by 1px
function handleResize() {
  if (resizeTimeout) {
    clearTimeout(resizeTimeout);
  };

  resizeTimeout = setTimeout(() => {
    fullRebuild();
  }, 2);
};

/**
 * checks if mouseclick is near stage border for page reroute
 * @returns bool - if mouseclick was in threshold
 */
function isNearborder(x: number, y: number, threshold = 20) {
  //distance from each edge
  const top = Math.abs(y - padding);
  const bottom = Math.abs(y - (height - padding));
  const left = Math.abs(x - padding);
  const right = Math.abs(x - (width - padding));

  return (
    top < threshold ||
    bottom < threshold ||
    left < threshold ||
    right < threshold
  );
};

/**
 * handles stage click for page reroute 
 * @param e - mouse event
 */
function handleStageClick(e: MouseEvent) {
  if (!stage.value) return;

  const rect = stage.value.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  if (isNearborder(x, y)) {
    router.push('/listen'); //STUB: update this
  }
}

/**
 * handles mouseMove to add cursor: pointer class near marquee
 * @param e: mouseEvent
 */
function handleMouseMove(e: MouseEvent) {
  if (!stage.value) return;
  const rect = stage.value.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const isNear = isNearborder(x, y);

  stage.value.style.cursor = isNear ? 'pointer' : 'default';
}

onMounted(async () => {
  
  //Accessibility guard for reduced motion
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  prefersReducedMotion.value = media.matches;

  media.addEventListener('change', (e) => {
    prefersReducedMotion.value = e.matches;
  });
  
  await nextTick();
  await fullRebuild();

  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('resize', handleResize);
});

// Cleanup for DOM refresh/resize
onBeforeUnmount(() => {
  if (ticker) {
    gsap.ticker.remove(ticker);
  };

  window.removeEventListener('mousemove', handleMouseMove);
  window.removeEventListener('resize', handleResize);
});

</script>

<template>
  <div 
    ref="stage" 
    class="stage" 
    aria-hidden="true"
    @click="handleStageClick"
    >
    <div>
      <div 
        v-for="(char, i) in chars"
        :key="i"
        class="char"
        :ref="setCharRef(i)"
      >
        {{ char }}
      </div>
    </div>
    <!-- slot for internal content -->
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>

.stage {
  position: relative;
  width: 100%;
  height: 100%;
  pointer-events: auto;
}

.char {
  position: absolute;
  font-weight: 700;
  font-size: 26px;
  white-space: pre;
}

.content {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>