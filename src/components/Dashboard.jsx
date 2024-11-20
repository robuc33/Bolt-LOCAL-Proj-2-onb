import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  AppBar, 
  Toolbar,
  Grid,
  IconButton,
  Tooltip,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// ... Previous DeleteConfirmationDialog, BusinessCard, and AddCard components remain the same ...

const CreateCardDialog = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    photo: null,
    jobTitle: '',
    companyName: '',
    phone: '',
    email: '',
    cardType: ''
  });

  const [photoPreview, setPhotoPreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        photo: file
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({
      firstName: '',
      lastName: '',
      photo: null,
      jobTitle: '',
      companyName: '',
      phone: '',
      email: '',
      cardType: ''
    });
    setPhotoPreview(null);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New Business Card</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <Typography variant="h6">1. Enter your name</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </Box>

          <Typography variant="h6">2. Choose a picture of yourself</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 200,
                height: 200,
                border: '2px dashed #ccc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: photoPreview ? `url(${photoPreview})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {!photoPreview && 'Preview'}
            </Box>
            <Button variant="contained" component="label">
              Upload Photo
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handlePhotoChange}
              />
            </Button>
          </Box>

          <Typography variant="h6">3. Enter your title and company</Typography>
          <TextField
            fullWidth
            label="Job Title"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            label="Company Name"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
          />

          <Typography variant="h6">4. Enter your phone number</Typography>
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />

          <Typography variant="h6">5. Enter your email address</Typography>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
          />

          <Typography variant="h6">6. Choose a card type</Typography>
          <FormControl fullWidth>
            <InputLabel>Card Type</InputLabel>
            <Select
              name="cardType"
              value={formData.cardType}
              onChange={handleInputChange}
              label="Card Type"
            >
              <MenuItem value="team">Team Card</MenuItem>
              <MenuItem value="individual">Individual Card</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={handleSubmit}
          variant="contained"
          color="primary"
        >
          Create Card
        </Button>
      </DialogActions>
    </Dialog>
  );
};

function Dashboard() {
  const navigate = useNavigate();
  const [cardList, setCardList] = useState(
    JSON.parse(localStorage.getItem('businessCards') || '[]')
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  );
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    card: null
  });
  const [createDialog, setCreateDialog] = useState(false);

  const handleAddNewCard = () => {
    setCreateDialog(true);
  };

  const handleCreateDialogClose = () => {
    setCreateDialog(false);
  };

  const handleCreateCard = async (formData) => {
    let photoUrl = null;
    if (formData.photo) {
      const reader = new FileReader();
      photoUrl = await new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(formData.photo);
      });
    }

    const newCard = {
      ...formData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      photoUrl
    };

    const updatedCards = [newCard, ...cardList];
    localStorage.setItem('businessCards', JSON.stringify(updatedCards));
    setCardList(updatedCards);
    setCreateDialog(false);
  };

  // ... Previous delete and edit handlers remain the same ...

  return (
    <Box>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
            My Business Cards
            <Chip 
              label={cardList.length}
              size="small"
              sx={{ 
                backgroundColor: 'primary.main',
                color: 'white',
                fontWeight: 'bold',
                minWidth: '32px'
              }} 
            />
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item>
            <AddCard onClick={handleAddNewCard} />
          </Grid>
          {cardList.map((card) => (
            <Grid item key={card.id}>
              <BusinessCard 
                card={card} 
                onDelete={handleDeleteClick}
                onEdit={handleEditCard}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      <DeleteConfirmationDialog
        open={deleteDialog.open}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        cardName={deleteDialog.card ? `${deleteDialog.card.firstName} ${deleteDialog.card.lastName}` : ''}
      />

      <CreateCardDialog
        open={createDialog}
        onClose={handleCreateDialogClose}
        onSubmit={handleCreateCard}
      />
    </Box>
  );
}

export default Dashboard;
