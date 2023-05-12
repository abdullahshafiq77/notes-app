import * as React from 'react';
import { useRouter } from 'next/router';
import { Typography, Card } from '@mui/material';

const NoteDetailsContent = () => {
  const router = useRouter();
  const { title, body } = router.query;

  return (
    <>
      <Card
        sx={{
          boxShadow: 'none',
          borderRadius: '10px',
          p: '25px 100px',
          mb: '15px',
        }}
      >
        <Typography
          as='h3'
          sx={{
            fontSize: 30,
            fontWeight: 600,
            mb: '15px',
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: 13,
            fontWeight: 500,
            mb: '5px',
          }}
        >
          {body}
        </Typography>
      </Card>
    </>
  );
};

export default NoteDetailsContent;
