export {};

export interface SerialPortAPI {
  getSerialPorts: () => Promise<PortInfo[]>;
  onHelloFromBackend: (callback: (event, message: string) => void) => void;
}

export interface PortInfo {
  path: string;
  manufacturer: string | undefined;
  serialNumber: string | undefined;
  pnpId: string | undefined;
  locationId: string | undefined;
  productId: string | undefined;
  vendorId: string | undefined;
}

declare global {
  interface Window {
    // Expose API through preload script
    removeLoading: () => void;
    // SerialPort: import("serialport").SerialPort;
    // portInfo: import("@serialport/bindings-cpp").PortInfo;
    SerialPortAPI: SerialPortAPI;
  }
}
