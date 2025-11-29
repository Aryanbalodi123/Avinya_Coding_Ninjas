import clientPromise from "./mongodb";
import { Team, Member } from "./types";

export async function seedDatabase() {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection<Team>("teams");

  // Clear existing
  await collection.deleteMany({});

  const teams: Team[] = [];

  for (let i = 1; i <= 22; i++) {
    const teamIdStr = i.toString().padStart(2, "0");
    const members: Member[] = [];

    for (let m = 1; m <= 4; m++) {
      members.push({
        id: `mem-${teamIdStr}-0${m}`,
        name: `Member ${m} of Team ${i}`,
        email: `student${m}_team${i}@university.edu`,
        rollNumber: `RN-${teamIdStr}-00${m}`,
        hasAcceptedInvitation: false, // Default
      });
    }

    teams.push({
      teamId: `team-${teamIdStr}`,
      teamName: `Alpha Squad ${teamIdStr}`,
      teamSize: 4,
      members: members,
      createdAt: new Date(),
    });
  }

  await collection.insertMany(teams);
  return { success: true, count: teams.length };
}