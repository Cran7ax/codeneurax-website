export const loadFeedPage = () =>
  import('../pages/FeedPage').then((m) => ({ default: m.FeedPage }));
export const loadEventsPage = () =>
  import('../pages/EventsPage').then((m) => ({ default: m.EventsPage }));
export const loadAiSparksPage = () =>
  import('../pages/AiSparksPage').then((m) => ({ default: m.AiSparksPage }));
export const loadWorkWithUsPage = () =>
  import('../pages/WorkWithUsPage').then((m) => ({ default: m.WorkWithUsPage }));
export const loadCampusAmbassadorsPage = () =>
  import('../pages/CampusAmbassadorsPage').then((m) => ({ default: m.CampusAmbassadorsPage }));
export const loadBuddyKidPage = () =>
  import('../pages/BuddyKidPage').then((m) => ({ default: m.BuddyKidPage }));
export const loadServicesPage = () =>
  import('../pages/ServicesPage').then((m) => ({ default: m.ServicesPage }));
export const loadLibraryPage = () =>
  import('../pages/LibraryPage').then((m) => ({ default: m.LibraryPage }));

const ROUTE_LOADERS: Record<string, () => Promise<unknown>> = {
  '/feed': loadFeedPage,
  '/events': loadEventsPage,
  '/aispark': loadAiSparksPage,
  '/work-with-us': loadWorkWithUsPage,
  '/campus-ambassadors': loadCampusAmbassadorsPage,
  '/buddykid': loadBuddyKidPage,
  '/services': loadServicesPage,
  '/library': loadLibraryPage,
};

const prefetched = new Set<string>();

export function preloadRoute(to: string): void {
  const pathname = to.split('#')[0];
  if (!pathname || prefetched.has(pathname)) return;
  const loader = ROUTE_LOADERS[pathname];
  if (!loader) return;
  prefetched.add(pathname);
  loader().catch(() => {
    prefetched.delete(pathname);
  });
}
