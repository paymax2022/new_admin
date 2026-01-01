/// <reference types="vite/client" />

declare global {
  interface Window {
    google: typeof google;
  }
}

declare namespace google {
  namespace maps {
    class Map {
      constructor(element: HTMLElement, options?: MapOptions);
    }
    class Marker {
      constructor(options?: MarkerOptions);
      setMap(map: Map | null): void;
      addListener(event: string, handler: () => void): void;
    }
    class InfoWindow {
      constructor(options?: InfoWindowOptions);
      open(map: Map | null, marker?: Marker): void;
    }
    class Size {
      constructor(width: number, height: number);
    }
    enum MapTypeId {
      ROADMAP = 'roadmap',
      SATELLITE = 'satellite',
      HYBRID = 'hybrid',
      TERRAIN = 'terrain',
    }
    interface MapOptions {
      center?: { lat: number; lng: number };
      zoom?: number;
      mapTypeId?: MapTypeId;
      styles?: any[];
    }
    interface MarkerOptions {
      position?: { lat: number; lng: number };
      map?: Map | null;
      title?: string;
      icon?: string | { url: string; scaledSize?: Size };
    }
    interface InfoWindowOptions {
      content?: string;
    }
  }
}

declare module '*.vue' {
    import type { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
}
