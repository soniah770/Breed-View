"use client"; // Mark this file as a client component

import React, { useState } from 'react';
import { useFetchBreeds } from '../hooks/useFetchBreeds';
import BreedCard from '../components/BreedCard';
import { z } from 'zod';

// Zod schema for validating breed data
const BreedListSchema = z.array(
  z.object({
    name: z.string(),
    weight: z.string(),
    temperament: z.string(),
    origin: z.string().nullable(),
    life_span: z.string(),
    imageUrl: z.string().nullable(),
  })
);

const Home = () => {
  const [page, setPage] = useState(1);
  const { data, total, isLoading, error } = useFetchBreeds(page, 12);

  // Validate data with Zod
  const validatedData = BreedListSchema.safeParse(data);

  if (!validatedData.success) {
    console.error('Validation failed:', validatedData.error);
    return <div>Error validating data</div>;
  }

  if (error) return <div>Error loading breeds</div>;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Dog Breeds</h1>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {/* Apply correct grid layout here */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {validatedData.data.map((breed) => (
              <BreedCard key={breed.name} breed={breed} />
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
              disabled={page === 1}
            >
              Previous
            </button>
            <span>
              Page {page} of {Math.ceil(total / 12) || 1}
            </span>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="bg-blue-500 text-white px-4 py-2 rounded ml-4"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
