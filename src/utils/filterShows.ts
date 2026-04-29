import type { Show } from "~/types/Show";


export const filterShows = (shows: Show[]): Show[] => {
  const today = new Date();
  return shows.filter((show) => {
    const showDate = new Date(show.date);
    return showDate >= today;
  });
};