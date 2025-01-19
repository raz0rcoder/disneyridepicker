import { ThemeParks } from "themeparks";

// Ride metadata from your existing app
const rideMetadata = [
  // Adventureland
  { name: "Indiana Jones Adventure", land: "Adventureland", type: "Thrill Rides" },
  { name: "Jungle Cruise", land: "Adventureland", type: "Family Rides" },
  { name: "Tarzan's Treehouse", land: "Adventureland", type: "Shows & Entertainment" },
  { name: "Walt Disney's Enchanted Tiki Room", land: "Adventureland", type: "Shows & Entertainment" },

  // Critter Country
  { name: "Tiana's Bayou Adventure", land: "Critter Country", type: "Dark Rides" },
  { name: "The Many Adventures of Winnie the Pooh", land: "Critter Country", type: "Dark Rides" },
  
  // ... (all other rides from your fallbackRides array)
];

// Helper function to find metadata for a ride
function findRideMetadata(rideName) {
  return rideMetadata.find(meta => 
    meta.name.toLowerCase().includes(rideName.toLowerCase()) ||
    rideName.toLowerCase().includes(meta.name.toLowerCase())
  ) || { land: "Unknown", type: "Attraction" };
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Initialize the Disneyland park
    const disneyland = new ThemeParks.Parks.DisneylandResortMagicKingdom();

    // Get wait times for all rides
    const waitTimes = await disneyland.getWaitTimes();

    // Format the response with metadata
    const formattedWaitTimes = waitTimes.map(ride => {
      const metadata = findRideMetadata(ride.name);
      return {
        name: ride.name,
        waitTime: ride.waitTime,
        status: ride.status,
        lastUpdate: ride.lastUpdate,
        land: metadata.land,
        type: metadata.type
      };
    });

    // Cache the response for 5 minutes (300 seconds)
    res.setHeader('Cache-Control', 's-maxage=300');
    
    return res.status(200).json(formattedWaitTimes);
  } catch (error) {
    console.error('Error fetching wait times:', error);
    
    // Return fallback data with current timestamp
    const fallbackData = rideMetadata.map(ride => ({
      ...ride,
      waitTime: 0,
      status: "Operating",
      lastUpdate: new Date().toISOString()
    }));
    
    return res.status(200).json(fallbackData);
  }
}