import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';  // Adjust this import path based on where your Prisma client is located

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 12;
  const skip = (page - 1) * limit;

  try {
    const breeds = await prisma.breed.findMany({
      skip,
      take: limit,
    });

    const totalBreeds = await prisma.breed.count();

    return NextResponse.json({ breeds, totalBreeds });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch breeds' }, { status: 500 });
  }
}
