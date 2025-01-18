import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { load } from 'cheerio';
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
  CircularProgress
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import './App.css';

// Fallback rides data
const fallbackRides = [
  // Adventureland
  { name: "Indiana Jones Adventure", land: "Adventureland", type: "Thrill Ride", waitTime: 0 },
  { name: "Jungle Cruise", land: "Adventureland", type: "Boat Ride", waitTime: 0 },
  { name: "Tarzan's Treehouse", land: "Adventureland", type: "Walkthrough", waitTime: 0 },
  { name: "Walt Disney's Enchanted Tiki Room", land: "Adventureland", type: "Show", waitTime: 0 },

  // Critter Country
  { name: "Tiana's Bayou Adventure", land: "Critter Country", type: "Water Ride", waitTime: 0 },
  { name: "The Many Adventures of Winnie the Pooh", land: "Critter Country", type: "Dark Ride", waitTime: 0 },
  
  // Fantasyland
  { name: "Alice in Wonderland", land: "Fantasyland", type: "Dark Ride", waitTime: 0 },
  { name: "Casey Jr. Circus Train", land: "Fantasyland", type: "Train Ride", waitTime: 0 },
  { name: "Dumbo the Flying Elephant", land: "Fantasyland", type: "Aerial Carousel", waitTime: 0 },
  { name: "it's a small world", land: "Fantasyland", type: "Boat Ride", waitTime: 0 },
  { name: "King Arthur Carrousel", land: "Fantasyland", type: "Carousel", waitTime: 0 },
  { name: "Mad Tea Party", land: "Fantasyland", type: "Spinning Ride", waitTime: 0 },
  { name: "Matterhorn Bobsleds", land: "Fantasyland", type: "Thrill Ride", waitTime: 0 },
  { name: "Mr. Toad's Wild Ride", land: "Fantasyland", type: "Dark Ride", waitTime: 0 },
  { name: "Peter Pan's Flight", land: "Fantasyland", type: "Dark Ride", waitTime: 0 },
  { name: "Pinocchio's Daring Journey", land: "Fantasyland", type: "Dark Ride", waitTime: 0 },
  { name: "Snow White's Enchanted Wish", land: "Fantasyland", type: "Dark Ride", waitTime: 0 },
  { name: "Storybook Land Canal Boats", land: "Fantasyland", type: "Boat Ride", waitTime: 0 },

  // Frontierland
  { name: "Big Thunder Mountain Railroad", land: "Frontierland", type: "Thrill Ride", waitTime: 0 },
  { name: "Sailing Ship Columbia", land: "Frontierland", type: "Boat Ride", waitTime: 0 },
  { name: "Mark Twain Riverboat", land: "Frontierland", type: "Boat Ride", waitTime: 0 },

  // Galaxy's Edge
  { name: "Millennium Falcon: Smugglers Run", land: "Galaxy's Edge", type: "Interactive", waitTime: 0 },
  { name: "Star Wars: Rise of the Resistance", land: "Galaxy's Edge", type: "Dark Ride", waitTime: 0 },

  // Main Street U.S.A.
  { name: "Disneyland Railroad", land: "Main Street U.S.A.", type: "Train Ride", waitTime: 0 },
  { name: "Main Street Vehicles", land: "Main Street U.S.A.", type: "Transport", waitTime: 0 },

  // New Orleans Square
  { name: "Haunted Mansion", land: "New Orleans Square", type: "Dark Ride", waitTime: 0 },
  { name: "Pirates of the Caribbean", land: "New Orleans Square", type: "Dark Ride", waitTime: 0 },

  // Tomorrowland
  { name: "Astro Orbitor", land: "Tomorrowland", type: "Aerial Carousel", waitTime: 0 },
  { name: "Autopia", land: "Tomorrowland", type: "Driving Ride", waitTime: 0 },
  { name: "Buzz Lightyear Astro Blasters", land: "Tomorrowland", type: "Interactive", waitTime: 0 },
  { name: "Finding Nemo Submarine Voyage", land: "Tomorrowland", type: "Submarine Ride", waitTime: 0 },
  { name: "Monorail", land: "Tomorrowland", type: "Transport", waitTime: 0 },
  { name: "Space Mountain", land: "Tomorrowland", type: "Thrill Ride", waitTime: 0 },
  { name: "Star Tours – The Adventures Continue", land: "Tomorrowland", type: "Simulator", waitTime: 0 }
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

  // Initialize rides list and wait times
  useEffect(() => {
    const initializeRides = async () => {
      try {
        console.log('Fetching initial ride data...');
        const response = await axios.get('http://localhost:3001/api/wait-times');
        console.log('Response received:', response);
        
        if (!response.data || !Array.isArray(response.data)) {
          console.error('Invalid response data:', response.data);
          throw new Error('Invalid response data');
        }
        
        const newRides = response.data.map(ride => ({
          ...ride,
          type: determineRideType(ride.name)
        }));

        console.log('Processed rides:', newRides);
        setRides(newRides);
        setWaitTimes(newRides);
        
        // Update unique lands and types
        const lands = [...new Set(newRides.map(ride => ride.land))];
        const types = [...new Set(newRides.map(ride => ride.type))];
        console.log('Unique lands:', lands);
        console.log('Unique types:', types);
        setUniqueLands(lands);
        setUniqueTypes(types);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error initializing rides:', error);
        console.error('Error details:', {
          message: error.message,
          response: error.response ? {
            status: error.response.status,
            data: error.response.data
          } : null,
          stack: error.stack
        });
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

  // Helper function to determine ride type
  const determineRideType = (name) => {
    name = name.toLowerCase();
    if (name.includes('mountain') || name.includes('matterhorn') || name.includes('incredicoaster') || name.includes('racers')) {
      return "Thrill Ride";
    } else if (name.includes('boat') || name.includes('submarine') || name.includes('cruise') || name.includes('river') || name.includes('splash')) {
      return "Water Ride";
    } else if (name.includes('haunted') || name.includes('pirates') || name.includes('small world') || name.includes('peter pan')) {
      return "Dark Ride";
    } else if (name.includes('mad tea party') || name.includes('teacups')) {
      return "Spinning Ride";
    } else if (name.includes('dumbo') || name.includes('astro orbitor')) {
      return "Aerial Carousel";
    } else if (name.includes('buzz') || name.includes('smugglers') || name.includes('midway mania')) {
      return "Interactive";
    } else if (name.includes('autopia')) {
      return "Driving Ride";
    }
    return "Attraction";
  };

  // Fetch real wait times
  const fetchWaitTimes = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/wait-times');
      const html = response.data;
      const $ = load(html);
      
      const newWaitTimes = [...fallbackRides];
      
      $('.attraction-list .attraction').each((_, element) => {
        const rideName = $(element).find('.title').text().trim();
        const waitTimeText = $(element).find('.wait-time').text().trim();
        
        // Parse wait time
        let waitTime = 0;
        if (waitTimeText.toLowerCase().includes('closed')) {
          waitTime = -1;
        } else if (waitTimeText.toLowerCase().includes('temporary')) {
          waitTime = -2;
        } else {
          const minutes = waitTimeText.match(/(\d+)/);
          waitTime = minutes ? parseInt(minutes[1]) : 0;
        }
        
        // Find matching ride in our list
        const rideIndex = newWaitTimes.findIndex(ride => 
          ride.name.toLowerCase().includes(rideName.toLowerCase()) ||
          rideName.toLowerCase().includes(ride.name.toLowerCase())
        );
        
        if (rideIndex !== -1) {
          newWaitTimes[rideIndex].waitTime = waitTime;
          console.log(`Updated ${rideName} with wait time: ${waitTime}`);
        }
      });

      console.log('Updated wait times:', newWaitTimes);
      setWaitTimes(newWaitTimes);
      setLastUpdated(new Date().toLocaleTimeString());
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching wait times:', error);
      setWaitTimes(fallbackRides);
      setIsLoading(false);
    }
  };

  // Fetch wait times initially and every 5 minutes
  useEffect(() => {
    if (rides.length) {
      fetchWaitTimes();
      const interval = setInterval(fetchWaitTimes, 300000); // 5 minutes
      return () => clearInterval(interval);
    }
  }, [rides]);

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
    <div className="App">
      <header className="App-header">
        <img src="/img/logo.jpg" alt="Disneyland Ride Picker Logo" className="app-logo" />
        <h1>Disneyland Ride Picker</h1>

        <div className="filters">
          <FormControl sx={{ m: 1, minWidth: 200 }}>
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

          <FormControl sx={{ m: 1, minWidth: 200 }}>
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
        </div>

        <Button
          variant="contained"
          className="random-ride-button"
          onClick={pickRandomRide}
          disabled={isLoading || filteredRides.length === 0}
          startIcon={<ShuffleIcon />}
        >
          Pick a Random Ride
        </Button>

        <Button
          variant="contained"
          className="refresh-button"
          onClick={handleRefresh}
          disabled={refreshing}
          startIcon={<RefreshIcon />}
        >
          {refreshing ? 'Refreshing...' : 'Refresh Wait Times'}
        </Button>

        {isLoading ? (
          <CircularProgress />
        ) : (
          <div>
            {selectedRide && (
              <Card className={`ride-card selected-ride`} sx={{ mb: 4 }}>
                <CardContent>
                  <Typography variant="h5" className="ride-name">
                    {selectedRide.name}
                  </Typography>
                  <div className="ride-info">
                    <Typography className="land-name">
                      {selectedRide.land}
                    </Typography>
                    <Typography 
                      className={`wait-time ${selectedRide.waitTime === -1 ? 'closed' : 
                                           selectedRide.waitTime === -2 ? 'down' : ''}`}
                    >
                      <AccessTimeIcon />
                      {selectedRide.waitTime === -1 ? 'Closed' :
                       selectedRide.waitTime === -2 ? 'Down' :
                       `${selectedRide.waitTime} min wait`}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            )}

            <Grid container spacing={2}>
              {filteredRides.map((ride) => (
                <Grid item xs={12} sm={6} md={4} key={ride.name}>
                  <Card className="ride-card">
                    <CardContent>
                      <Typography variant="h6" className="ride-name">
                        {ride.name}
                      </Typography>
                      <div className="ride-info">
                        <Typography className="land-name">
                          {ride.land}
                        </Typography>
                        <Typography 
                          className={`wait-time ${ride.waitTime === -1 ? 'closed' : 
                                               ride.waitTime === -2 ? 'down' : ''}`}
                        >
                          <AccessTimeIcon />
                          {ride.waitTime === -1 ? 'Closed' :
                           ride.waitTime === -2 ? 'Down' :
                           `${ride.waitTime} min wait`}
                        </Typography>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
        )}

        {lastUpdated && (
          <Typography variant="caption" sx={{ mt: 2, display: 'block', color: 'text.secondary' }}>
            Last updated: {lastUpdated}
          </Typography>
        )}
      </header>
    </div>
  );
}

export default App;
