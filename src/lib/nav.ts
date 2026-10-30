import { experience, nav, site } from "@/data/portfolio";

// The nav links that have something to jump to. A link to a hidden section would lead nowhere,
// so "About" waits for site.bio and "Experience" waits for the first experience entry.
export function getVisibleNav() {
  return nav.filter((item) => {
    if (item.href === "#about") return Boolean(site.bio);
    if (item.href === "#experience") return experience.length > 0;
    return true;
  });
}
