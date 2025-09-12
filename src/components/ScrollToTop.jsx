import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Scrolls window to the top whenever the route (pathname) changes
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Jump to top on every route change
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;