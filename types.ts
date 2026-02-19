
export enum UserRole {
  ROOT_ADMIN = 'ROOT_ADMIN',
  ADMIN = 'ADMIN',
  TC = 'TC',
  PASSENGER = 'PASSENGER'
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  DEACTIVATED = 'DEACTIVATED'
}

export enum LogStatus {
  ENTRY = 'ENTRY',
  EXIT = 'EXIT',
  COMPLETED = 'COMPLETED'
}

export interface User {
  id: string; // Unique Hex Code
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  status: UserStatus;
  mobile?: string;
  homeStation?: string;
  presentAddress?: string;
  govIdNumber?: string;
  assignedStationId?: string; // For TCs
  qrCode: string; // Format: PROFILE:HEX
  createdAt: string;
  lastLogin?: string;
  lastLogout?: string;
}

export interface Station {
  id: string; // Unique Hex Code
  name: string;
  division: string;
  location: string;
  entryQR: string; // Format: STATION_ENTRY:HEX
  exitQR: string;  // Format: STATION_EXIT:HEX
  createdAt: string;
}

export interface EntryExitLog {
  id: string;
  passengerId: string;
  passengerName: string;
  stationId: string;
  stationName: string;
  stationHex: string;
  type: 'ENTRY' | 'EXIT';
  timestamp: string;
  qrSource: string;
  status: 'Active' | 'Completed';
}
