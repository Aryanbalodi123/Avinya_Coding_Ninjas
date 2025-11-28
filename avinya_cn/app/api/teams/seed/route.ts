import { NextResponse } from 'next/server';
import { seedDatabase } from '@/lib/seed';

// ---------------------------------------------------------
// IMPORTANT: This must be named "POST" because you are 
// sending a POST request from the console.
// ---------------------------------------------------------
export async function POST() {
  try {
    const result = await seedDatabase();
    return NextResponse.json(result);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to seed' }, { status: 500 });
  }
}