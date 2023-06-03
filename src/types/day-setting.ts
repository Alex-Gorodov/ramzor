export type DaySetting = {
  id: number | null;
  setting: {
    position: string,
    margin: string,
    hourFrom?: string,
    hourTo?: string
  }
}

export type SetterPosition = {
  position: string;
  margin: string;
}