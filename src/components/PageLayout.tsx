import React, { useEffect, useState } from "react";

interface PageLayoutProps {
  headerSlot?: React.ReactNode;
  children: React.ReactNode;
  footerSlot?: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  headerSlot,
  children,
  footerSlot,
}) => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 600);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
        boxSizing: "border-box",
      }}
    >
      {headerSlot && <div>{headerSlot}</div>}

      <div
        style={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          gap: "1rem",
        }}
      >
        {children}
      </div>

      {footerSlot && <div>{footerSlot}</div>}
    </div>
  );
};

export default PageLayout;
