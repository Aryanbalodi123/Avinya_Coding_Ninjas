import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    
    // Fetch all teams with complete member details
    const teams = await db.collection('teams')
      .find({})
      .toArray();
      
    return NextResponse.json(teams);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch teams' }, { status: 500 });
  }
}
