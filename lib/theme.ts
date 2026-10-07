export type Theme = "light" | "dark";
export const THEME_KEY = "alishba-theme";
export const themeColors: Record<Theme, string> = { light: "#fbf8f1", dark: "#071a22" };

/** Inlined in <head> so the saved theme is applied before first paint. Default: light. */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");if(t!=="dark"&&t!=="light")t="light";document.documentElement.dataset.theme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",t==="dark"?"${themeColors.dark}":"${themeColors.light}");}catch(e){document.documentElement.dataset.theme="light";}})();`;
