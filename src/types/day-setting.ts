export type DaySetting = {
  id: number | null;
  setting: SetterPosition;
}

export type SetterPosition = {
  position: string;
  margin: string;
  hourFrom?: string,
  hourTo?: string
}
