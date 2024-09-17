import { useState, useEffect } from "react";

type DeviceType = "Desktop" | "Tablet" | "Mobile" | null;

const useDevice = (): DeviceType => {
  const [device, setDevice] = useState<DeviceType>(null);

  useEffect(() => {
    const desktopMediaQuery = window.matchMedia("(min-width: 1024px)");
    const tabletMediaQuery = window.matchMedia("(min-width: 768px)");
    const mobileMediaQuery = window.matchMedia("(min-width: 320px)");

    const handleMediaQueryChange = () => {
      if (desktopMediaQuery.matches) {
        setDevice("Desktop");
      } else if (tabletMediaQuery.matches) {
        setDevice("Tablet");
      } else if (mobileMediaQuery.matches) {
        setDevice("Mobile");
      }
    };

    // Inicializar el estado basado en la consulta de medios actual
    handleMediaQueryChange();

    desktopMediaQuery.addEventListener("change", handleMediaQueryChange);
    tabletMediaQuery.addEventListener("change", handleMediaQueryChange);
    mobileMediaQuery.addEventListener("change", handleMediaQueryChange);

    // Limpiar event listeners al desmontar el componente
    return () => {
      desktopMediaQuery.removeEventListener("change", handleMediaQueryChange);
      tabletMediaQuery.removeEventListener("change", handleMediaQueryChange);
      mobileMediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return device;
};

export default useDevice;
