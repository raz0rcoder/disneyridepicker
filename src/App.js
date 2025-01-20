import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { 
  Button, 
  Typography, 
  Card, 
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  CircularProgress,
  Container,
  Box,
  Divider
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ShuffleIcon from '@mui/icons-material/Shuffle';

// Your existing fallbackRides array
const fallbackRides = [
  // Adventureland
  { name: "Indiana Jones Adventure", land: "Adventureland", type: "Thrill Rides" },
  { name: "Jungle Cruise", land: "Adventureland", type: "Family Rides" },
  { name: "Tarzan's Treehouse", land: "Adventureland", type: "Shows & Entertainment" },
  { name: "Walt Disney's Enchanted Tiki Room", land: "Adventureland", type: "Shows & Entertainment" },
  // Critter Country
  { name: "Tiana's Bayou Adventure", land: "Critter Country", type: "Dark Rides" },
  { name: "The Many Adventures of Winnie the Pooh", land: "Critter Country", type: "Dark Rides" }
  // Add the rest of your rides here...
];

function App() {
  const [rides, setRides] = useState([]);
  const [selectedRide, setSelectedRide] = useState(null);
  const [selectedLand, setSelectedLand] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [waitTimes, setWaitTimes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [uniqueLands, setUniqueLands] = useState([]);
  const [uniqueTypes, setUniqueTypes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const initializeRides = async () => {
      try {
        console.log('Fetching initial ride data...');
        const response = await axios.get('/api/wait-times');
        console.log('Response received:', response);
        
        if (!response.data || !Array.isArray(response.data)) {
          console.error('Invalid response data:', response.data);
          throw new Error('Invalid response data');
        }
        
        setRides(response.data);
        setWaitTimes(response.data);
        
        // Update unique lands and types
        const lands = [...new Set(response.data.map(ride => ride.land))];
        const types = [...new Set(response.data.map(ride => ride.type))];
        console.log('Unique lands:', lands);
        console.log('Unique types:', types);
        setUniqueLands(lands);
        setUniqueTypes(types);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error initializing rides:', error);
        // Use fallback data if fetch fails
        console.log('Using fallback ride data');
        setRides(fallbackRides);
        setWaitTimes(fallbackRides);
        const lands = [...new Set(fallbackRides.map(ride => ride.land))];
        const types = [...new Set(fallbackRides.map(ride => ride.type))];
        setUniqueLands(lands);
        setUniqueTypes(types);
        setIsLoading(false);
      }
    };

    initializeRides();
  }, []);

  const fetchWaitTimes = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/wait-times');
      setWaitTimes(response.data);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Error fetching wait times:', error);
      setWaitTimes(fallbackRides);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredRides = waitTimes.filter(ride => {
    const matchesLand = !selectedLand || ride.land === selectedLand;
    const matchesType = !selectedType || ride.type === selectedType;
    return matchesLand && matchesType;
  });

  const pickRandomRide = () => {
    if (filteredRides.length === 0) {
      setSelectedRide(null);
      return;
    }
    const randomIndex = Math.floor(Math.random() * filteredRides.length);
    setSelectedRide(filteredRides[randomIndex]);
  };

  const handleLandChange = (e) => {
    setSelectedLand(e.target.value);
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchWaitTimes();
    setRefreshing(false);
  };

  return (
    <>
      <Head>
        <title>Disneyland Ride Picker</title>
        <meta name="description" content="Pick your next Disneyland ride based on wait times" />
      </Head>

      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Typography variant="h3" component="h1" align="center" gutterBottom>
            Disneyland Ride Picker
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Filter by Land</InputLabel>
              <Select
                value={selectedLand}
                onChange={handleLandChange}
                label="Filter by Land"
              >
                <MenuItem value="">All Lands</MenuItem>
                {uniqueLands.map((land) => (
                  <MenuItem key={land} value={land}>{land}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Filter by Type</InputLabel>
              <Select
                value={selectedType}
                onChange={handleTypeChange}
                label="Filter by Type"
              >
                <MenuItem value="">All Types</MenuItem>
                {uniqueTypes.map((type) => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
            <Button
              variant="contained"
              onClick={pickRandomRide}
              disabled={isLoading || filteredRides.length === 0}
              startIcon={<ShuffleIcon />}
              sx={{
                background: 'linear-gradient(45deg, #6B46C1 30%, #4299E1 90%)',
                border: 0,
                borderRadius: 3,
                boxShadow: '0 3px 5px 2px rgba(107, 70, 193, .3)',
                color: 'white',
                padding: '8px 30px',
                '&:hover': {
                  background: 'linear-gradient(45deg, #805AD5 30%, #63B3ED 90%)',
                }
              }}
            >
              Pick a Random Ride
            </Button>

            <Button
              variant="contained"
              onClick={handleRefresh}
              disabled={refreshing}
              startIcon={<RefreshIcon />}
              sx={{
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                border: 0,
                borderRadius: 3,
                boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                color: 'white',
                padding: '8px 30px',
                '&:hover': {
                  background: 'linear-gradient(45deg, #2196F3 40%, #21CBF3 100%)',
                }
              }}
            >
              {refreshing ? 'Refreshing...' : 'Refresh Wait Times'}
            </Button>
          </Box>

          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          ) : (
            <Box>
              {selectedRide && (
                <>
                  <Card 
                    sx={{ 
                      mb: 4,
                      backgroundColor: 'primary.light',
                      '& .MuiTypography-root': {
                        color: 'primary.contrastText'
                      }
                    }}
                    elevation={3}
                  >
                    <CardContent>
                      <Typography variant="h5" component="div">
                        Selected Ride:
                      </Typography>
                      <Typography variant="h4" sx={{ mt: 1 }}>
                        {selectedRide.name}
                      </Typography>
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        mt: 2
                      }}>
                        <Typography variant="h6">
                          {selectedRide.land}
                        </Typography>
                        <Typography 
                          variant="h6"
                          sx={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            gap: 0.5,
                            color: selectedRide.waitTime === -1 ? 'error.light' : 
                                  selectedRide.waitTime === -2 ? 'warning.light' : 'inherit'
                          }}
                        >
                          <AccessTimeIcon />
                          {selectedRide.waitTime === -1 ? 'Closed' :
                           selectedRide.waitTime === -2 ? 'Down' :
                           `${selectedRide.waitTime} min wait`}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                  <Divider sx={{ mb: 4 }} />
                </>
              )}

              <Grid container spacing={2}>
                {filteredRides.map((ride) => (
                  <Grid item xs={12} sm={6} md={4} key={ride.name}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6">
                          {ride.name}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                          <Typography variant="subtitle2">
                            {ride.land}
                          </Typography>
                          <Typography 
                            variant="subtitle2"
                            sx={{ 
                              display: 'flex', 
                              alignItems: 'center',
                              gap: 0.5,
                              color: ride.waitTime === -1 ? 'error.main' : 
                                    ride.waitTime === -2 ? 'warning.main' : 'inherit'
                            }}
                          >
                            <AccessTimeIcon />
                            {ride.waitTime === -1 ? 'Closed' :
                             ride.waitTime === -2 ? 'Down' :
                             `${ride.waitTime} min wait`}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {lastUpdated && (
            <Typography variant="caption" sx={{ mt: 2, display: 'block', textAlign: 'center', color: 'text.secondary' }}>
              Last updated: {lastUpdated}
            </Typography>
          )}
        </Box>
      </Container>
    </>
  );
}

export default App;