const emojies = [
  {
    name: "red_line",
    value: "<:red_line:1176930932838629489>".repeat(8),
  },
  {
    name: "orange_line",
    value: "<:orange_line:1176931079979028530>".repeat(8),
  },
  {
    name: "blue_line",
    value: "<:blue_line:1176930988677410886>".repeat(8),
  },
  {
    name: "pink_line",
    value: "<:pink_line:1176930957656334436>".repeat(8),
  },
  {
    name: "blue_dev",
    value: "<:blue_dev:1176930986940973166> ",
  },
  {
    name: "red_bug",
    value: "<:red_bug:1176930931139936336> ",
  },
  {
    name: "pink_stats",
    value: "<:pink_stats:1176930966036557904> ",
  },
  {
    name: "pink_star",
    value: "<:pink_star:1176930964484657154> ",
  },
  {
    name: "pink_shop",
    value: "<:pink_shop:1176930961863225424> ",
  },
  {
    name: "pink_person",
    value: "<:pink_person:1176930959212425266> ",
  },
  {
    name: "pink_book",
    value: "<:pink_book:1176930956196716544> ",
  },
  {
    name: "pink_leaderboard",
    value: "<:pink_leaderboard:1176957469881278594> ",
  },
  {
    name: "pink_basket",
    value: "<:pink_basket:1176930953613025320> ",
  },
  {
    name: "pink_shop",
    value: "<:pink_shop:1176930961863225424>",
  },
  {
    name: "pink_flask",
    value: "<:pink_flask:1177169807972503572>",
  },
  {
    name: "pink_at",
    value: "<:pink_at:1177169806202507314>",
  },
  {
    name: "pink_object",
    value: "<:pink_object:1177169811420221451>"
  },
  {
    name: "orange_stats",
    value: "<:orange_stats:1176931091496583238> ",
  },
  {
    name: "orange_star",
    value: "<:orange_star:1176931089604944017> ",
  },
  {
    name: "orange_shop",
    value: "<:orange_shop:1176931087298084874> ",
  },
  {
    name: "orange_shield",
    value: "<:orange_shield:1176931085674889216> ",
  },
  {
    name: "orange_settings",
    value: "<:orange_settings:1176931082705309707> ",
  },
  {
    name: "orange_person",
    value: "<:orange_person:1176931081379926176> ",
  },
  {
    name: "orange_leaderboard",
    value: "<:orange_leaderboard:1176931077936398457> ",
  },
  {
    name: "orange_hashtag",
    value: "<:orange_hashtag:1176931076866838629> ",
  },
  {
    name: "orange_hammer",
    value: "<:orange_hammer:1176931075411427398> ",
  },
  {
    name: "orange_book",
    value: "<:orange_book:1176931072949366834> ",
  },
  {
    name: "orange_shop",
    value: "<:orange_shop:1176931087298084874>"
  }
];

const colors = [
  {
    name: "RED",
    hex: "#D73E3E",
    light: false,
  },
  {
    name: "PINK",
    hex: "#FF5D99",
    light: false,
  },
  {
    name: "ORANGE",
    hex: "#F69255",
    light: false,
  },
  {
    name: "BLUE",
    hex: "#36DBFF",
    light: false,
  },
];

export const getColor = (name: string) => {
  return colors.find((color) => color.name === name);
};

export const getEmoji = (name: string) => {
  return emojies.find((emoji) => emoji.name === name)!.value;
};
