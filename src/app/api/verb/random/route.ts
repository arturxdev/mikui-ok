import { NextResponse } from 'next/server';
import Word from 'app/models/word';
import dbConnect from 'app/lib/connectDB';

export async function GET() {
  try {
    await dbConnect();
    const count = await Word.countDocuments();
    const randomIndex = Math.floor(Math.random() * count);
    const randomWord = await Word.findOne().skip(randomIndex);

    if (!randomWord) {
      return NextResponse.json({ error: 'No words found' }, { status: 404 });
    }

    return NextResponse.json(randomWord, { status: 200 });
  } catch (error) {
    console.error('Error fetching random word:', error);
    return NextResponse.json({ error: 'Error fetching random word' }, { status: 500 });
  }
} 
