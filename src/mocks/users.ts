import { UserAuthData } from "../types/user";

export const users: UserAuthData[] = [
  {
    firstName: 'אלכס',
    secondName: 'גורודוב',
    id: 8153728,
  },
  {
    firstName: 'עידן',
    secondName: 'נסים',
    id: 5873860,
  },
  {
    firstName: 'חיים',
    secondName: 'כהן',
    id: 7676691,
  },
  {
    firstName: 'בר',
    secondName: 'קיבן',
    id: 5419991,
  },
  {
    firstName: 'יעקב',
    secondName: 'ליפסקי',
    id: 1111111,
  },
  {
    firstName: 'דניאל',
    secondName: 'דהן',
    id: 8376326,
  },
]

export const userIds = users.map(user => {
  return user.id
});
