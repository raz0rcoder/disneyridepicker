import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { styled } from '@mui/material/styles';
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
  Box
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ShuffleIcon from '@mui/icons-material/Shuffle';

// Create a styled button component that overrides MUI's defaults
const DisneyButton = styled(Button)({
  background: 'linear-gradient(135deg, #6E46D2 0%, #2C92D2 100%)',
  color: 'white',
  fontWeight: 600,
  textTransform: 'none',
  padding: '12px 32px',
  borderRadius: '6px',
  transition: 'all 0.3s ease',
  boxShadow: '0 0 10px rgba(44, 146, 210, 0.3)',
  border: 'none',
  letterSpacing: '0.5px',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 15px rgba(44, 146, 210, 0.4)',
    background: 'linear-gradient(135deg, #7E56E2 0%, #3CA2E2 100%)',
  },
  '&:disabled': {
    background: 'linear-gradient(135deg, #9E86E2 0%, #7CC2E2 100%)',
    opacity: 0.7,
  }
});

const App = () => {
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
        
        const lands = [...new Set(response.data.map(ride => ride.land))];
        const types = [...new Set(response.data.map(ride => ride.type))];
        setUniqueLands(lands);
        setUniqueTypes(types);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error initializing rides:', error);
        setIsLoading(false);
      }
    };

    initializeRides();
  }, []);

  const fetchWaitTimes = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/wait-times');
      setWaitTimes(response.data);
      setLastUpdated(new Date().toLocaleTimeString());
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching wait times:', error);
      setIsLoading(false);
    }
  };

  const filteredRides = waitTimes.filter(ride => {
    const matchesLand = !selectedLand || ride.land === selectedLand;
    const matchesType = !selectedType || ride.type === selectedType;
    const isOperating = ride.waitTime !== -1; // Don't include closed rides
    return matchesLand && matchesType && isOperating;
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
            <DisneyButton
              onClick={pickRandomRide}
              disabled={isLoading || filteredRides.length === 0}
              startIcon={<ShuffleIcon />}
            >
              Pick a Random Ride
            </DisneyButton>

            <Button
              variant="contained"
              onClick={handleRefresh}
              disabled={refreshing}
              startIcon={<RefreshIcon />}
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
                <Card sx={{ mb: 4 }}>
                  <CardContent>
                    <Typography variant="h5">
                      {selectedRide.name}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                      <Typography variant="subtitle1">
                        {selectedRide.land}
                      </Typography>
                      <Typography 
                        variant="subtitle1"
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          gap: 0.5,
                          color: selectedRide.waitTime === -1 ? 'error.main' : 
                                selectedRide.waitTime === -2 ? 'warning.main' : 'inherit'
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
};

export default App;