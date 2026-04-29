<script lang="ts" setup>
import { computed } from 'vue'
import { formatDate } from '~/utils/formatDate'
import { filterShows } from '../../utils/filterShows';
import { shows } from '~/data/shows';
import type { Show } from '~/types/Show';


const showArray = computed((): Show[] => filterShows(shows)); // Filters out past shows from Shows[]


const title = 'FEAST YOUR SOUL'

</script>

<template>
  <section class="shows h-screen w-full bg-dark text-light">
    <div class="shows__inner">
      <!-- Left: vertical stacked title -->
      <div class="shows__title" aria-hidden>
        <div v-for="(char, i) in title.split('')" :key="i" class="shows__title-char cursor-pointer">
          <a href="/shows">{{ char }}</a>
        </div>
      </div>

      <!-- Right: shows list -->
      <div class="shows__list">
        <div class="shows__row shows__row--head">
          <div class="col col--date">DATE</div>
          <div class="col col--venue">VENUE</div>
          <div class="col col--location">LOCATION</div>
        </div>

        <div v-for="(show, idx) in showArray" :key="idx" class="shows__row">
          <div class="col col--date">{{ formatDate(show.date, 'snakeCase') }}</div>
          <div class="col col--venue">{{ show.name }}</div>
          <div class="col col--location">{{ show.location }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.shows {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 3rem;
}

.shows__inner {
  display: flex;
  width: 100%;
  max-width: 1200px;
  align-items: flex-start;
}

.shows__title {
  width: 6rem; 
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 15rem;
}

.shows__title-char {
  font-family: var(--font-body, inherit);
  font-weight: 700;
  font-size: 1.8rem;
  line-height: 1.3;
  letter-spacing: 0.06em;
}

.shows__list {
  flex: 1;
}

.shows__row {
  display: grid;
  grid-template-columns: 160px 1fr 180px;
  gap: 1rem;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}

.shows__row--head {
  opacity: 0.7;
  text-transform: uppercase;
  font-weight: 700;
}

.col {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.col--date {
  font-family: var(--font-body, inherit);
}
.col--location {
  text-align: right;
}

@media (max-width: 900px) {
  .shows__inner {
    padding: 0 1rem;
  }
  .shows__title {
    width: 3.5rem;
    margin-right: 1rem;
  }
  .shows__title-char {
    font-size: 1.2rem;
  }
  .shows__row {
    grid-template-columns: 120px 1fr 120px;
  }
}
</style>
