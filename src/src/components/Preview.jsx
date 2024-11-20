import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Preview = ({ values }) => {
  const navigate = useNavigate();
  const cardTypeLabel = values.cardType === 'team' ? 'Team Card' : 'Individual Card';

  const handleCreate = async () => {
    let photoUrl = null;
    
    if (values.photo) {
      // Convert photo to base64
      const reader = new FileReader();
      photoUrl = await new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(values.photo);
      });
    }

    // Create new card object
    const newCard = {
      ...values,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      photoUrl
    };

    // Save to localStorage
    const existingCards = JSON.parse(localStorage.getItem('businessCards') || '[]');
    const updatedCards = [...existingCards, newCard];
    localStorage.setItem('businessCards', JSON.stringify(updatedCards));

    // Navigate to dashboard
    window.location.href = '/#/dashboard';
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        {cardTypeLabel} Preview
      </Typography>

      <Paper 
        elevation={3} 
        sx={{ 
          width: 175,
          height: 250,
          mx: 'auto',
          mb: 4,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Box sx={{ 
          height: '50%',
          width: '100%',
          bgcolor: '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid #eee'
        }}>
          {values.photo ? (
            <Box
              component="img"
              src={URL.createObjectURL(values.photo)}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          ) : (
            <Typography sx={{ fontSize: '0.7rem' }} color="text.secondary">No photo</Typography>
          )}
        </Box>

        <Box sx={{ 
          p: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 0.25
        }}>
          <Typography sx={{ 
            fontSize: '0.8rem',
            fontWeight: 'bold',
            lineHeight: 1.2
          }}>
            {`${values.firstName} ${values.lastName}`}
          </Typography>
          
          <Typography sx={{ 
            fontSize: '0.7rem',
            fontWeight: 'medium',
            color: 'primary.main',
            lineHeight: 1.1
          }}>
            {values.jobTitle}
          </Typography>
          
          <Typography sx={{ 
            fontSize: '0.7rem',
            lineHeight: 1.1
          }}>
            {values.companyName}
          </Typography>

          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: 0.25,
            mt: 0.5
          }}>
            <Typography sx={{ 
              fontSize: '0.65rem',
              color: 'text.secondary',
              lineHeight: 1
            }}>
              {values.phone}
            </Typography>
            <Typography sx={{ 
              fontSize: '0.65rem',
              color: 'text.secondary',
              lineHeight: 1
            }}>
              {values.email}
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleCreate}
      >
        Create Card
      </Button>
    </Box>
  );
};

export default Preview;
