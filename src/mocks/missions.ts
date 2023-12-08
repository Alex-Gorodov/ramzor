import { Mission } from "../types/mission";
import { completeMissionParticipants } from "../utils/completeMissionParticipants";
import { users } from "./users";
import mesimot from "../mesimot.json"
import ids from "../ids.json"
import { User } from "../types/user";

// export let missions: Mission[] = ([
//   {
//     id: mesimot.id[0],
//     order: mesimot.id[0],
//     name: mesimot.name[0],
//     duration: mesimot.duration[0],
//     oneTimeActivity: mesimot.one_time_activity[0] === 1 ? true : false,
//     startDate: new Date(),
//     startTime: 2,
//     command: mesimot.command[0],
//     participants: completeMission(mesimot.soldier[0], mesimot.command[0], users).missionGroup,
//     description: 'פילבוקס (באנגלית: Pillbox, בעברית: מצדית) הוא הכינוי שניתן לעמדות שמירה מבוצרות מסוג בלוקהאוס עשויות בטון שהקימו הבריטים בארץ ישראל בתקופת המנדט, החל במאורעות תרצ"ו. מקור השם בצורתן הגלילית שהזכירה קופסת גלולות (Pill Box)',
//   },
//   {
//     id: mesimot.id[1],
//     order: mesimot.id[1],
//     name: mesimot.name[1],
//     duration: mesimot.duration[1],
//     oneTimeActivity: mesimot.one_time_activity[1] === 1 ? true : false,
//     startDate: new Date(),
//     startTime: 6,
//     command: mesimot.command[1],
//     participants: completeMission(mesimot.soldier[1], mesimot.command[1], users).missionGroup,
//     description: 'כוח בשיטה של מפקד+מס\' חיילים שיוצאים בדר"כ באופן רגלי ומתמקמים באיזורים אסטרטגיים/ על סמך מידע מודיעיני מוקדם והיסטוריה גזרתית. בדרך כלל במטרה למנוע ולסכל פעילות פח"עית או טרור עממי.',
//   },
//   {
//     id: mesimot.id[2],
//     order: mesimot.id[2],
//     name: mesimot.name[2],
//     duration: mesimot.duration[2],
//     oneTimeActivity: mesimot.one_time_activity[2] === 1 ? true : false,
//     startDate: new Date(),
//     startTime: 0,
//     command: mesimot.command[2],
//     participants: completeMission(mesimot.soldier[2], mesimot.command[2], users).missionGroup,
//     description: 'פעילות הסיור הצבאית היא בדרך כלל שיטה לאיסוף מודיעין קרבי, על ידי יחידות צבאיות המיומנות בכך, בסביבה עוינת, שדה קרב או שטח אויב. ברוב הצבאות המערביים מבוצע סוג זה של פעילות על ידי יחידות סיור מיוחדות (ואז הסיור מוגדר "סיור מיוחד").',
//   },
// ])

const jsonData = {
  mesimot,
  ids
};


export const missions: Mission[] = Object.keys(jsonData.mesimot.id).map((key) => {
  const id: number = jsonData.mesimot.id[key as keyof typeof jsonData.mesimot.id];
  const order: number = id;
  const name: string = jsonData.mesimot.name[key as keyof typeof jsonData.mesimot.name];
  const duration: number = jsonData.mesimot.duration[key as keyof typeof jsonData.mesimot.duration];
  const oneTimeActivity: boolean = jsonData.mesimot.one_time_activity[key as keyof typeof jsonData.mesimot.one_time_activity] === 1;
  const startDate: Date = jsonData.mesimot.start_date[key as keyof typeof jsonData.mesimot.start_date] ? new Date(jsonData.mesimot.start_date[key as keyof typeof jsonData.mesimot.start_date].replace(/"/g, '')) : new Date();
  // const startDate: Date = new Date();
  const endDate: Date = jsonData.mesimot.end_date[key as keyof typeof jsonData.mesimot.end_date] ? new Date(jsonData.mesimot.end_date[key as keyof typeof jsonData.mesimot.end_date].replace(/"/g, '')) : new Date();
  
  let startTime: number = 0;
  if (jsonData.mesimot.start_time[key as keyof typeof jsonData.mesimot.start_time]) {
    const startTimeString = jsonData.mesimot.start_time[key as keyof typeof jsonData.mesimot.start_time].replace(/"/g, '');
    startTime = parseInt(startTimeString.startsWith('0') ? startTimeString.substring(1) : startTimeString.split(':')[0]);
  }

  const command: number = jsonData.mesimot.command[key as keyof typeof jsonData.mesimot.command];

  const participants: User[] = completeMissionParticipants(jsonData.mesimot.soldier[key as keyof typeof jsonData.mesimot.soldier], command, users.filter((user) => !user.isOnMission)).missionGroup;
  participants.map((user) => user.isOnMission = true);
  const description: string = '...';

  return {
    id,
    order,
    name,
    duration,
    oneTimeActivity,
    startDate,
    startTime,
    command,
    participants,
    description,
    endDate,
  };
});
