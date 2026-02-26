import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile(): boolean {
  const getIsMobile = () =>
    typeof window !== "undefined"
      ? window.innerWidth < MOBILE_BREAKPOINT
      : false;

  const [isMobile, setIsMobile] = React.useState<boolean>(getIsMobile);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile;
}