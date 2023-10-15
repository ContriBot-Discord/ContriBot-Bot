import { ContributionUser } from "@/types";
import { Contribution } from "../dbInit";
import { contribution } from "../index";

export function getPoints(id: string, all: boolean = false): number {
  if (all) return contribution.get(id)?.allContributionPoint ?? 0;
  return contribution.get(id)?.contributionPoint ?? 0;
}

export async function addPoints(
  id: string,
  amount: number,
  all: boolean = true
): Promise<ContributionUser> {
  const user = contribution.get(id) ?? (await createNewUser(id, amount));

  user.contributionPoint += Number(amount);
  if (all) user.allContributionPoint += Number(amount);

  await user.save();
  contribution.set(id, user);

  return user;
}

export async function removePoints(
  id: string,
  amount: number,
  all: boolean = true
): Promise<ContributionUser> {
  const user = contribution.get(id) ?? (await createNewUser(id, amount));

  user.contributionPoint -= Number(amount);
  if (all) user.allContributionPoint -= Number(amount);

  await user.save();
  contribution.set(id, user);

  return user;
}

export async function resetPoints(
  id: string,
  all: boolean = true
): Promise<ContributionUser> {
  const user = contribution.get(id) ?? (await createNewUser(id, 0));

  user.contributionPoint = 0;
  if (all) user.allContributionPoint = 0;

  await user.save();
  contribution.set(id, user);

  return user;
}

export async function resetAllUsersPoints(
  all: boolean = false
): Promise<ContributionUser[]> {
  const users = await Contribution.findAll();

  for (const user of users) {
    resetPoints(user.userId, all);
  }

  return users;
}

async function createNewUser(id: string, amount: number) {
  const newUser = await Contribution.create({
    userId: id,
    contributionPoint: amount,
    allContributionPoint: amount,
  });

  contribution.set(id, newUser);

  return newUser;
}
