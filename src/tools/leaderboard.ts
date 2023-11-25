import { User } from "../classes/User";
import i18next from "i18next";

export const getUsersField = function getUsersField(
  startingFrom: number,
  userList: User[],
  lang: string,
  pointName: string
): { name: string; value: string }[] {
  i18next.changeLanguage(lang);

  const fields: { name: string; value: string }[] = [];

  userList.sort(
    (a, b) =>
      b.getPoints("leaderboardPoints") - a.getPoints("leaderboardPoints")
  );

  startingFrom = (startingFrom - 1) * 10;

  // We add the n + 10 first users to the embed. If there are less than 10 users, we stop the loop.
  for (let i: number = startingFrom; i < startingFrom + 10; i++) {
    const user = userList[i];

    if (user) {
      fields.push({
        name: ` `,
        value:
          `**#${i + 1} ·** ` +
          i18next.t("embeds:leaderboard.fields.value", {
            userid: user.id,
            quantity: user.leaderboardPoints,
            pointName: pointName,
          }),
      });
    }
  }

  return fields;
};
