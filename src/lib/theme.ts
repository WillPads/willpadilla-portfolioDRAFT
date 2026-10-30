// Theme helpers shared by the inline head script and the toggle button.

export const THEME_STORAGE_KEY = "theme";

// Runs in <head> before the first paint (see layout.tsx), so the page never flashes
// the wrong theme. Saved choice wins; otherwise follow the system preference.
// Every storage access is wrapped in try/catch because localStorage can be blocked.
export const themeInitScript = `(function(){try{var t=null;try{t=localStorage.getItem("${THEME_STORAGE_KEY}")}catch(e){}if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;
