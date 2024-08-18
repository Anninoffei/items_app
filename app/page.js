"use client"
import { Box, Stack, Typography, Checkbox, FormControlLabel, Button, TextField } from '@mui/material';
import { Firestore } from 'firebase/firestore';
import { collection, getDocs, addDoc, doc, deleteDoc } from 'firebase/firestore';
import { firestore } from './firebase';
import { useState, useEffect } from 'react';

// Your component code here
const initialItems = [
  { name: 'Tomato', selected: false, quantity: 0 },
  // ... other items
];

export default function Home() {
  const [items, setItems] = useState(initialItems);
  const [firebaseItems, setFirebaseItems] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState(0);

  // ... existing useEffect and handleSelectItem function

  const handleAddItem = async () => {
    try {
      const itemRef = await addDoc(collection(firestore, 'items'), { name: newItemName, selected: false, quantity: newItemQuantity });
      setFirebaseItems((prevItems) => [...prevItems, { id: itemRef.id, name: newItemName, selected: false, quantity: newItemQuantity }]);
      setNewItemName('');
      setNewItemQuantity(0);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveItem = async (item) => {
    try {
      await deleteDoc(doc(firestore, 'items', item.id));
      setFirebaseItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Box border="1px solid #333">
        <Box
          sx={{
            width: 800,
            height: 100,
            bgcolor: '#658ba7',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h2" color="text.primary" textAlign="center">
            Inventory Items
          </Typography>
        </Box>
        <Stack sx={{ width: 800, height: 300, overflow: 'auto' }} spacing={1}>
          {firebaseItems.map((item, index) => (
            <Box
              key={index}
              sx={{
                width: '100%',
                height: 200,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: '#e6f9ff',
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={item.selected}
                    onChange={() => handleSelectItem(item)}
                  />
                }
                label={
                  <Typography variant="h5" gutterBottom color="#a78365" fontWeight="bold">
                    {item.name} (Quantity: {item.quantity})
                  </Typography>
                }
              />
              <Button
                sx={{ marginLeft: 2 }}
                variant="contained"
                color="error"
                onClick={() => handleRemoveItem(item)}
              >
                Remove
              </Button>
            </Box>
          ))}
        </Stack>
      </Box>
      <Box sx={{ width: 800, height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 2 }}>
        <TextField
          label="Item Name"
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          sx={{ width: '50%', marginRight: 2 }}
        />
        <TextField
          label="Quantity"
          type="number"
          value={newItemQuantity}
          onChange={(e) => setNewItemQuantity(e.target.value)}
          sx={{ width: '20%', marginRight: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleAddItem}>
          Add Item
        </Button>
      </Box>
    </Box>
  );
}