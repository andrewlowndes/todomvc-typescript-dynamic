export enum Status {
  All = 'all',
  Active = 'active',
  Completed = 'completed'
}

export const statusUrlMap = new Map<string, Status>([
  ['/', Status.All],
  ['/active', Status.Active],
  ['/completed', Status.Completed]
]);

export const inverseStatusUrlMap = new Map<Status, string>();

statusUrlMap.forEach((value, key) => inverseStatusUrlMap.set(value, key));
