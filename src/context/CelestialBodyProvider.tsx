import { ReactNode, createContext, useCallback, useState } from 'react';

type AtmosphericElement = {
  element: string;
  percentage: number;
};

export interface CelestialBody {
  atmosphere?: AtmosphericElement[];
  diameter: number | string; // km
  galaxy?: string;
  gravity: number; // m/s²
  mass: number | string; // kg
  moons?: number;
  name: string;
  orbitalPeriod?: number | string; // time it takes to go around the Sun (days)
  relativeSize?: string;
  rotationalPeriod: number; // time it takes to complete one rotation on its axis (days)
  starType?: string;
  sunDistance?: number | string; // km
  surfaceTemp: number | string; // celsius
}

export interface CelestialBodyContextType {
  selectedBody: CelestialBody | null;
  handleSelectCelestialBody: (bodyData: CelestialBody) => void;
}

export const CelestialBodyContext = createContext<CelestialBodyContextType>({
  selectedBody: null,
  handleSelectCelestialBody: () => {},
});

type CelestialBodyProviderProps = {
  children: ReactNode;
};

export const CelestialBodyProvider = ({ children }: CelestialBodyProviderProps) => {
  const [selectedBody, setSelectedBody] = useState<CelestialBody | null>(null);

  const handleSelectCelestialBody = useCallback((bodyData: CelestialBody) => {
    setSelectedBody(bodyData);
  }, []);

  return (
    <CelestialBodyContext.Provider value={{ handleSelectCelestialBody, selectedBody }}>
      {children}
    </CelestialBodyContext.Provider>
  );
};
