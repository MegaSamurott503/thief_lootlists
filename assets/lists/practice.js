const lootlist_Test = {
  id: "t0_test",
  title: "App Test",
  totals: [
    [150,800,50,1000],
    [600,800,50,1450],
    [850,800,50,1700]
  ],
  goal1: {
    total: [500,800,1200],
    gold: [50,50,50],
    info: "optional",
  },
  goal2: {
    total: [800,1200,1400],
    info: "bonus",
  },
  carryLoot: true,
  carryItems: false,
  loot: [
    {
      id: "loot_finewine",
      name: "Fine Wine",
      img: require("../assets/items12/finewine.png"),
      values: [
        {
          id: "50goods",
          value: [0,0,50],
          locations: [
            {
              id: `${this.title}_5`,
              findSimple: "findE",
              findArea: "Angelwatch 9F",
              findNarrow: "ballroom",
              findExact: "serving table",
              findCount: [1,1,1],
            },
          ],
        }
      ],
    },
    {
      id: "loot_gem",
      name: "Gem",
      img: require("../assets/items12/gem.png"),
      values: [
        {
          id: "100gems",
          value: [0,100,0],
          locations: [
            {
              id: `${this.title}_6`,
              findSimple: "findM",
              findArea: "Dayport Trader's Bank",
              findNarrow: "employee office",
              findExact: "safe",
              findCount: [8,8,8],
              findObj: true,
            }
          ]
        },
      ],
    },
    {
      id: "loot_purse",
      name: "Purse",
      img: require("../assets/items12/purse.png"),
      values: [
        {
          id: "50gold",
          value: [50,0,0],
          locations: [
            {
              id: `${this.title}_1`,
              findSimple: "findE",
              findArea: "Castle van Vernon",
              findNarrow: "tower",
              findExact: "on red archer",
              findCountBox: [1,0,0],
              findPick: true,
            },
            {
              id: `${this.title}_2`,
              findSimple: "findM",
              findArea: "Necromancer's Spire",
              findNarrow: "4F",
              findExact: "altar",
              findCount: [0,2,2],
              findSecret: true,
            },
            {
              id: `${this.title}_3`,
              findSimple: "findH",
              findArea: "Shemenov Estate",
              findNarrow: "chandelier hall",
              findExact: "blue chest",
              findCount: [2,0,5],
              findCountBox: [1,0,3],
              findBox: true,
            },
          ],
        },
        {
          id: "100gold",
          value: [100,0,0],
          locations: [
            {
              id: `${this.title}_4`,
              findSimple: "find",
              findArea: "Angelwatch 8F",
              findNarrow: "north guest room",
              findExact: "on nobleman",
              findObj: true,
              findCountBox: [0,5,0],
              findPick: true,
            },
          ],
        },
        {
          id: "carryover",
          value: [0,0,0],
          carryValue: [-1,0,0],
          locations: [
            {
              id: `${this.title}_7`,
              findSimple: "find",
              loadout: "start",
            },
          ],
        }
      ],
    },
  ],
}
export default lootlist_Test;
