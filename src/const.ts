import availableIcon from './img/icons/available.svg';
import partlyIcon from './img/icons/clock.svg';
import unavailableIcon from './img/icons/unavailable.svg';
import lockedIcon from './img/icons/lock.svg';
// import '../src/style';

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

export const STATUSES = [
  { isIncluded: false, icon: 'unset', color: '#d9d9d9', value: ''},
  { isIncluded: true, icon: availableIcon, color: '#559b2d', value: 'available' },
  { isIncluded: true, icon: partlyIcon, color: '#ffa500', value: 'partly available' },
  { isIncluded: true, icon: unavailableIcon, color: '#ff0000', value: 'not available' },
  { isIncluded: true, icon: lockedIcon, color: 'linear-gradient(to bottom, #498427 0%, #2B4E17 100%)', value: 'locked' },
]