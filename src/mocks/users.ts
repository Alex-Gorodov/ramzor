import { User } from "../types/user";

// добавить юзеру двумерный массив индивидуальных часов занятости [ [date][hour], [date][hour], [date][hour], ... , [date][hour] ]
// * изменено -- массив объектов по датам присутствует / отсутствует -- 0 / 1 -- true / false

export function createRandomBooleanArray(length: number, minProbability: number, maxProbability: number) {
  if (minProbability < 0 || maxProbability > 1 || minProbability > maxProbability) {
    throw new Error("Invalid probability range");
  }

  const booleanArray = [];
  for (let i = 0; i < length; i++) {
    const randomProbability = Math.random(); // Generates a random number between 0 and 1
    const randomBoolean = randomProbability >= minProbability && randomProbability <= maxProbability;
    booleanArray.push(randomBoolean);
  }
  return booleanArray;
}

export let users: User[] = [
  {
    firstName: 'אלכס',
    secondName: 'גורודוב',
    id: 8153728,
    token: 'אלכס',
    isAdmin: false,
    isOnMission: false,
    employment: createRandomBooleanArray(24, 0.23, 0.9)
  },
  {
    firstName: 'עידן',
    secondName: 'ניסים',
    id: 5873860,
    token: 'עידן',
    isOnMission: false,
    employment: createRandomBooleanArray(24, 0.23, 0.9),
    isCommander: true,
  },
  {
    firstName: 'חיים',
    secondName: 'כהן',
    id: 7676691,
    token: 'חיים',
    isOnMission: false,
    employment: createRandomBooleanArray(24, 0.23, 0.9)
  },
  {
    firstName: 'בר',
    secondName: 'קיבן',
    id: 5419991,
    token: 'בר',
    isOnMission: false,
    employment: createRandomBooleanArray(24, 0.23, 0.9),
    isCommander: true,
  },
  {
    firstName: 'יעקב',
    secondName: 'ליפסקי',
    id: 1111111,
    token: 'יעקב',
    isOnMission: false,
    employment: createRandomBooleanArray(24, 0.23, 0.9)
  },
  {
    firstName: 'דניאל',
    secondName: 'דהן',
    id: 8376326,
    token: 'דניאל',
    isOnMission: false,
    employment: createRandomBooleanArray(24, 0.23, 0.9),
    isCommander: true,
  },
  {
    firstName: 'שוקי',
    secondName: 'שפיגל',
    id: 7701368,
    token: 'שוקי',
    isOnMission: false,
    employment: createRandomBooleanArray(24, 0.23, 0.9),
    isAdmin: true,
  }
]

export const userIds = users.map(user => {
  return user.id
});
