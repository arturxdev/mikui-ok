import { NextResponse } from 'next/server';
import Word from 'app/models/word';
import dbConnect from 'app/lib/connectDB';

export async function GET(request: Request) {
  try {
    await dbConnect();
    
    // Extract userId from query parameters
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Find words related to the user
    const count = await Word.countDocuments({ userId });
    const randomIndex = Math.floor(Math.random() * count);
    const randomWord = await Word.findOne({ userId }).skip(randomIndex);

    if (!randomWord) {
      return NextResponse.json({ error: 'No words found for this user' }, { status: 404 });
    }

    return NextResponse.json(randomWord, { status: 200 });
  } catch (error) {
    console.error('Error fetching random word:', error);
    return NextResponse.json({ error: 'Error fetching random word' }, { status: 500 });
  }
} 
