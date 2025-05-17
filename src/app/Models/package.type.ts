export interface Package {
  PackageId?: number;
  PackageCode?: string;
  PackageName: string;
  PackageType: PackageTye;
  Gender: number;
  AvailableDays: AvailableDays[];
  TimeRange: boolean;
  TimeFrom?: Date;
  TimeTo?: Date;
  PackageDuration: number;
  isRecurring: boolean;
  MinMembers: number;
  MaxMembers: number;
  Price: number;
}

export enum AvailableDays {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6
}

export enum PackageTye {
  Individual = 0,
  Group = 1
}
