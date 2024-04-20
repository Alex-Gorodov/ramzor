import { User } from "../types/user";
import ids from "../ids.json";
import ltm from "../ltm.json";

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

const jsonData = {
  ids, ltm
}

// export const users: User[] = Object.keys(jsonData.ids.id).map((key) => {
//   const id: number = jsonData.ids.id[key as keyof typeof jsonData.ids.id];
//   const firstName: string = jsonData.ids.name[key as keyof typeof jsonData.ids.name];
//   const secondName: string = jsonData.ids.famely[key as keyof typeof jsonData.ids.famely];
//   const platoon: number = jsonData.ids.platoon[key as keyof typeof jsonData.ids.platoon];
//   const token: string = `${jsonData.ids.id[key as keyof typeof jsonData.ids.id]}-${jsonData.ids.name[key as keyof typeof jsonData.ids.name]}`;
//   const isAdmin: boolean = jsonData.ids.maflag[key as keyof typeof jsonData.ids.maflag] === 1;
//   const isCommander: boolean = jsonData.ids.command[key as keyof typeof jsonData.ids.command] === 1;
//   const isOnMission: boolean = jsonData.ids.active[key as keyof typeof jsonData.ids.active] === 1;
//   // const employment: boolean[] = jsonData.ltm[jsonData.ids.id[key as keyof typeof jsonData.ids.id]] as boolean[];
//   const employment: boolean[] = createRandomBooleanArray(50, 0.23, 0.9);
//   // const employment: boolean[] = createRandomBooleanArray(50, 0.23, 0.9);
//   const recruitmentCycle: number = jsonData.ids.machzor[key as keyof typeof jsonData.ids.machzor] === null ? 2010 : jsonData.ids.machzor[key as keyof typeof jsonData.ids.machzor] as number;

//   return {
//     id,
//     firstName,
//     secondName,
//     platoon,
//     token,
//     isAdmin,
//     isCommander,
//     isOnMission,
//     employment,
//     recruitmentCycle,
//   }
// })

// добавить юзеру двумерный массив индивидуальных часов занятости [ [date][hour], [date][hour], [date][hour], ... , [date][hour] ]
// * изменено -- массив объектов по датам присутствует / отсутствует -- 0 / 1 -- true / false

export let users: User[] = [
  {
    firstName: 'אלכס',
    secondName: 'גורודוב',
    id: 8153728,
    platoon: 1,
    token: 'אלכס-8153728',
    isAdmin: false,
    isOnMission: false,
    employment: createRandomBooleanArray(24, 0.23, 0.9),
    recruitmentCycle: 2013,
    isCommander: false
  },
  {
    firstName: 'עידן',
    secondName: 'ניסים',
    id: 5873860,
    platoon: 1,
    token: 'עידן-5873860',
    isOnMission: false,
    employment: createRandomBooleanArray(24, 0.23, 0.9),
    isCommander: true,
  },
  {
    firstName: 'חיים',
    secondName: 'כהן',
    id: 7676691,
    platoon: 1,
    token: 'חיים-7676691',
    isOnMission: false,
    employment: createRandomBooleanArray(24, 0.23, 0.9),
    isCommander: false
  },
  {
    firstName: 'בר',
    secondName: 'קיבן',
    id: 5419991,
    platoon: 1,
    token: 'בר-5419991',
    isOnMission: false,
    employment: createRandomBooleanArray(24, 0.23, 0.9),
    isCommander: true,
  },
  {
    firstName: 'יעקב',
    secondName: 'ליפסקי',
    id: 1111111,
    platoon: 1,
    token: 'יעקב-1111111',
    isOnMission: false,
    employment: createRandomBooleanArray(24, 0.23, 0.9),
    isCommander: false
  },
  {
    firstName: 'דניאל',
    secondName: 'דהן',
    id: 8376326,
    platoon: 1,
    token: 'דניאל-8376326',
    isOnMission: false,
    employment: createRandomBooleanArray(24, 0.23, 0.9),
    isCommander: true,
  },
  {
    firstName: 'שוקי',
    secondName: 'שפיגל',
    id: 7701368,
    platoon: 1,
    token: 'שוקי-7701368',
    isOnMission: false,
    employment: createRandomBooleanArray(24, 0.23, 0.9),
    isAdmin: true,
    isCommander: false
  },
  {
    firstName: 'יובל',
    secondName: 'בן שלומו',
    id: 5668499,
    platoon: 1,
    token: 'יובל-5668499',
    isOnMission: false,
    employment: createRandomBooleanArray(24, 0.23, 0.9),
    isAdmin: false,
    isCommander: false
  }
]

export const userIds = users.map(user => {
  return user.id
});
