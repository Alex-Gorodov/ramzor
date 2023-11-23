import { Mission } from "../types/mission";
import { users } from "./users";

export let missions: Mission[] = ([
    {
      id: 0,
      order: 0,
      name: 'סיור',
      length: 4,
      isSpecial: false,
      startingDate: new Date(),
      startingTime: 0,
      numOfCommanders: 1,
      participants: [users[0], users[1], users[2], users[3]],
      description: 'פעילות הסיור הצבאית היא בדרך כלל שיטה לאיסוף מודיעין קרבי, על ידי יחידות צבאיות המיומנות בכך, בסביבה עוינת, שדה קרב או שטח אויב. ברוב הצבאות המערביים מבוצע סוג זה של פעילות על ידי יחידות סיור מיוחדות (ואז הסיור מוגדר "סיור מיוחד").',
    },
    {
      id: 1,
      order: 1,
      name: 'בולם',
      length: 6,
      isSpecial: false,
      startingDate: new Date(),
      startingTime: 2,
      numOfCommanders: 1,
      participants: [users[0], users[1], users[2], users[3]],
      description: 'פילבוקס (באנגלית: Pillbox, בעברית: מצדית) הוא הכינוי שניתן לעמדות שמירה מבוצרות מסוג בלוקהאוס עשויות בטון שהקימו הבריטים בארץ ישראל בתקופת המנדט, החל במאורעות תרצ"ו. מקור השם בצורתן הגלילית שהזכירה קופסת גלולות (Pill Box)',
    },
    {
      id: 2,
      order: 2,
      name: 'סלנובה',
      length: 4,
      isSpecial: false,
      startingDate: new Date(),
      startingTime: 6,
      numOfCommanders: 1,
      participants: [users[0], users[2], users[4], users[6]],
      description: 'כוח בשיטה של מפקד+מס\' חיילים שיוצאים בדר"כ באופן רגלי ומתמקמים באיזורים אסטרטגיים/ על סמך מידע מודיעיני מוקדם והיסטוריה גזרתית. בדרך כלל במטרה למנוע ולסכל פעילות פח"עית או טרור עממי.',
    },
])