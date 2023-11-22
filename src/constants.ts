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
    value: "<:blue_dev:1176930986940973166>",
  },
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
  return emojies.find((emoji) => emoji.name === name);
};