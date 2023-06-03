import availableIcon from './img/icons/available.svg';
import partlyIcon from './img/icons/clock.svg';
import unavailableIcon from './img/icons/unavailable.svg';
import lockedIcon from './img/icons/lock.svg';


export enum AppRoute {
  Root = 'ramzor/',
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

enum StatusesColors {
  Disabled = '#d9d9d9',
  Available = '#559b2d',
  Partly = '#ffa500',
  Unavailable = '#ff0000',
  Locked = 'linear-gradient(to bottom, #498427 0%, #2B4E17 100%)',
}

export const STATUSES = [
  { isIncluded: false, icon: 'unset', color: StatusesColors.Disabled, value: ''},
  { isIncluded: true, icon: availableIcon, color: StatusesColors.Available, value: 'available' },
  { isIncluded: true, icon: partlyIcon, color: StatusesColors.Partly, value: 'partly available' },
  { isIncluded: true, icon: unavailableIcon, color: StatusesColors.Unavailable, value: 'not available' },
  { isIncluded: true, icon: lockedIcon, color: StatusesColors.Locked, value: 'locked' },
]

export const SETTER_STATE = [
  { position: 'hidden', margin: '40px' },
  { position: 'step-one', margin: '80px' },
  { position: 'step-two', margin: '120px' },
]

export const MINUTES = Array.from({ length: 60 }, (_, index) => index);
export const HOURS = Array.from({ length: 24 }, (_, index) => index);