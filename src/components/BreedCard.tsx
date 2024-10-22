import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material'; // Ensure Material UI components are imported correctly
import { z } from 'zod';

// Zod schema for validating individual breed data
const BreedSchema = z.object({
  name: z.string(),
  weight: z.string(),
  temperament: z.string(),
  origin: z.string().nullable().optional(),
  life_span: z.string(),
  imageUrl: z.string().nullable().optional(),
});

type Breed = z.infer<typeof BreedSchema>;

interface BreedCardProps {
  breed: Breed;
}

const BreedCard: React.FC<BreedCardProps> = ({ breed }) => {
  // Destructure breed properties
  const { name, weight, temperament, origin, life_span, imageUrl } = breed;

  return (
    <Card
      sx={{
        maxWidth: 345,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
      }}
    >
      <CardMedia
        component="img"
        height="190"
        image={imageUrl || '/images/placeholder.png'}
        alt={`${name} image`}
        sx={{
          objectFit: 'cover',
        }}
      />
      
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Weight: {weight}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Temperament: {temperament}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Origin: {origin || 'Unknown'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Life Span: {life_span}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BreedCard;
