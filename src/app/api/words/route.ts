import { NextRequest, NextResponse } from 'next/server';
import Word from '../../../models/word';
import dbConnect from '../../../lib/connectDB';
import { addWordSchema, wordSchema } from '../../../entities/wordSchema';
import { paginationSchema } from '../../../entities/paginationSchema';
import { z } from 'zod';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const parsedData = addWordSchema.parse(body);

    const newWord = new Word({
      ...parsedData,
      nextReview: new Date(),
      lastReviewed: new Date(),
      reviewCount: 0,
    });

    await newWord.save();
    return NextResponse.json({ message: 'Word added successfully' }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error('Error adding word:', error);
    return NextResponse.json({ error: 'Error adding word' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const params = {
      limit: url.searchParams.get('limit') || '10',
      page: url.searchParams.get('page') || '0',
    };
    const { limit, page } = paginationSchema.parse(params);

    const words = await Word.find({ userId })
      .skip(page * limit)
      .limit(limit);

    return NextResponse.json(words, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error('Error fetching words:', error);
    return NextResponse.json({ error: 'Error fetching words' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    const { id, ...updateData } = await request.json();
    const parsedData = wordSchema.partial().parse(updateData);

    const updatedWord = await Word.findByIdAndUpdate(id, parsedData, { new: true });
    if (!updatedWord) {
      return NextResponse.json({ error: 'Word not found' }, { status: 404 });
    }
    return NextResponse.json(updatedWord, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error('Error updating word:', error);
    return NextResponse.json({ error: 'Error updating word' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();
    const { id } = await request.json();

    const deletedWord = await Word.findByIdAndDelete(id);
    if (!deletedWord) {
      return NextResponse.json({ error: 'Word not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Word deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting word:', error);
    return NextResponse.json({ error: 'Error deleting word' }, { status: 500 });
  }
} 