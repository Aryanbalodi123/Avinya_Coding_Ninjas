import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// GET: Single Team
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid team id' }, { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db();

    const team = await db.collection('teams').findOne({ _id: new ObjectId(id) });

    if (!team) {
      return NextResponse.json({ error: 'Team not found' }, { status: 404 });
    }

    return NextResponse.json(team);
  } catch (e) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// PATCH: Accept Invitation
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid team id' }, { status: 400 });
    }
    const body = await request.json();
    const { memberId, hasAcceptedInvitation } = body;

    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection('teams').updateOne(
      { _id: new ObjectId(id), "members.id": memberId },
      { $set: { "members.$.hasAcceptedInvitation": hasAcceptedInvitation } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ error: 'Update failed' }, { status: 400 });
    }

    const updatedTeam = await db.collection('teams').findOne({ _id: new ObjectId(id) });
    return NextResponse.json(updatedTeam);
  } catch (e) {
    return NextResponse.json({ error: 'Error updating invite' }, { status: 500 });
  }
}