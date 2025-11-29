import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

// ---------------------------------------------------------
// IMPORTANT: The function name MUST be "GET" for this to work
// ---------------------------------------------------------
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    
    // Fetch all teams
    const teams = await db.collection('teams')
      .find({})
      // Include _id so frontend can build /team/<_id> links
      .project({ _id: 1, teamId: 1, teamName: 1, teamSize: 1 })
      .toArray();
      
    return NextResponse.json(teams);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch teams' }, { status: 500 });
  }
}