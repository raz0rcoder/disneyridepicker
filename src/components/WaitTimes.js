import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const getLandColor = (rideName) => {
  // Color scheme for each land
  const landColors = {
    mainStreet: '#C41E3A',  // Victorian red for Main Street USA
    adventureland: '#2F4F2F', // Deep jungle green for Adventureland
    frontierland: '#8B4513',  // Saddle brown for Frontierland
    fantasyland: '#6A0DAD',  // Royal purple for Fantasyland
    tomorrowland: '#4169E1',  // Royal blue for Tomorrowland
    critterCountry: '#8B7355', // Warm brown for Critter Country
    galaxysEdge: '#2F4F4F',   // Dark slate gray for Galaxy's Edge
    newOrleans: '#800080',    // Deep purple for New Orleans Square
  };

  // Map rides to their respective lands
  const landMappings = {
    // Main Street USA (and miscellaneous)
    'Disneyland Railroad': 'mainStreet',
    'Main Street Vehicles': 'mainStreet',
    
    // Adventureland
    'Indiana Jones Adventure': 'adventureland',
    'Jungle Cruise': 'adventureland',
    'Walt Disney\'s Enchanted Tiki Room': 'adventureland',
    'Tarzan\'s Treehouse': 'adventureland',
    
    // Frontierland
    'Big Thunder Mountain Railroad': 'frontierland',
    'Frontierland Shootin\' Exposition': 'frontierland',
    'Mark Twain Riverboat': 'frontierland',
    'Sailing Ship Columbia': 'frontierland',
    
    // Fantasyland
    'Alice in Wonderland': 'fantasyland',
    'Dumbo the Flying Elephant': 'fantasyland',
    'King Arthur Carrousel': 'fantasyland',
    'Mad Tea Party': 'fantasyland',
    'Matterhorn Bobsleds': 'fantasyland',
    'Mr. Toad\'s Wild Ride': 'fantasyland',
    'Peter Pan\'s Flight': 'fantasyland',
    'Pinocchio\'s Daring Journey': 'fantasyland',
    'Snow White\'s Enchanted Wish': 'fantasyland',
    'Storybook Land Canal Boats': 'fantasyland',
    'It\'s a Small World': 'fantasyland',
    'Casey Jr. Circus Train': 'fantasyland',
    
    // Tomorrowland
    'Astro Orbitor': 'tomorrowland',
    'Autopia': 'tomorrowland',
    'Buzz Lightyear Astro Blasters': 'tomorrowland',
    'Finding Nemo Submarine Voyage': 'tomorrowland',
    'Space Mountain': 'tomorrowland',
    'Star Tours': 'tomorrowland',
    
    // Critter Country
    'Splash Mountain': 'critterCountry',
    'The Many Adventures of Winnie the Pooh': 'critterCountry',
    'Davy Crockett\'s Explorer Canoes': 'critterCountry',
    
    // Galaxy's Edge
    'Millennium Falcon: Smugglers Run': 'galaxysEdge',
    'Star Wars: Rise of the Resistance': 'galaxysEdge',
    
    // New Orleans Square
    'Haunted Mansion': 'newOrleans',
    'Pirates of the Caribbean': 'newOrleans',
  };

  // Return the color based on the ride's land, defaulting to Main Street color if not found
  return landColors[landMappings[rideName] || 'mainStreet'];
};

// Styled components
const RideCard = styled(Paper)(({ theme, landColor }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: `${landColor}10`,
  borderLeft: `4px solid ${landColor}`,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    transform: 'translateY(-2px)',
    transition: 'transform 0.2s ease-in-out',
  },
}));

const StatusText = styled(Typography)(({ theme, status }) => ({
  color: status === 'OPERATING' 
    ? theme.palette.success.main
    : status === 'DOWN'
    ? theme.palette.error.main
    : theme.palette.warning.main,
}));

const WaitTimes = () => {
  const [waitTimes, setWaitTimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWaitTimes = async () => {
      try {
        const response = await fetch('/api/wait-times');
        if (!response.ok) {
          throw new Error('Failed to fetch wait times');
        }
        const data = await response.json();
        setWaitTimes(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWaitTimes();
    const interval = setInterval(fetchWaitTimes, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <Box p={2}>Loading wait times...</Box>;
  if (error) return <Box p={2} color="error.main">Error: {error}</Box>;

  return (
    <Box p={2}>
      <Typography variant="h4" component="h2" gutterBottom>
        Current Wait Times
      </Typography>
      <Grid container spacing={2}>
        {waitTimes.map((ride, index) => {
          const landColor = getLandColor(ride.name);
          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <RideCard elevation={2} landColor={landColor}>
                <Typography variant="h6" component="h3" gutterBottom>
                  {ride.name}
                </Typography>
                <Typography variant="h5" component="p" gutterBottom>
                  {ride.waitTime} minutes
                </Typography>
                <StatusText variant="body2" status={ride.status}>
                  Status: {ride.status}
                </StatusText>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                  Updated: {new Date(ride.lastUpdate).toLocaleTimeString()}
                </Typography>
              </RideCard>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default WaitTimes;