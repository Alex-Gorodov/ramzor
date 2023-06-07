export const MINUTES = Array.from({ length: 60 }, (_, index) => index);
export const HOURS = Array.from({ length: 24 }, (_, index) => index);

export enum AppRoute {
  Root = '/desk',
  Login = 'ramzor/'
}

export const MONTHS = [
  'ינואר',
  'פברואר',
  'מרץ',
  'אפריל',
  'מאי',
  'יוני',
  'יולי',
  'אוגוסט',
  'ספטמבר',
  'אוקטובר',
  'נובמבר',
  'דצמבר'
  ];

export const DAYS_OF_WEEK = [
    'יום א’',
    'יום ב’',
    'יום ג’',
    'יום ד’',
    'יום ה’',
    'יום ו’',
    'יום ש’',
  ];

export enum StatusesColors {
  Disabled = '#d9d9d9',
  Available = '#559b2d',
  Partly = '#ffa500',
  Unavailable = '#ff0000',
  Locked = 'linear-gradient(to bottom, #498427 0%, #2B4E17 100%)',
}

export enum StatusesValues {
  Disabled = 'disabled',
  Available = 'available',
  Partly = 'partly',
  Unavailable = 'unavailable',
  Locked = 'locked',
}

export const SETTER_STATE = [
  { position: 'hidden', margin: '40px' },
  { position: 'step-one', margin: '80px' },
  { position: 'step-two', margin: '120px' },
]

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}