import React, { useState, useEffect } from "react";

export default function ResponsiveItem(props) {
  const [screen, setScreen] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    const handleSetScreen = () => {
      setScreen({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleSetScreen);

    return () => {
      window.removeEventListener("resize", handleSetScreen);
    };
  }, [screen.width]);
  let Component = props.component;
  if (screen.width < 768 && props.mobileComponent) {
    Component = props.mobileComponent;
  }
  return <Component />;
}
