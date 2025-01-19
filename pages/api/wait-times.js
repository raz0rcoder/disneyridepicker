import axios from 'axios';
import * as cheerio from 'cheerio';

const rideMetadata = [
  // Adventureland
  { name: "Indiana Jones Adventure", land: "Adventureland", type: "Thrill Rides" },
  { name: "Jungle Cruise", land: "Adventureland", type: "Family Rides" },
  { name: "Tarzan's Treehouse", land: "Adventureland", type: "Shows & Entertainment" },
  { name: "Walt Disney's Enchanted Tiki Room", land: "Adventureland", type: "Shows & Entertainment" },
  // Critter Country
  { name: "Tiana's Bayou Adventure", land: "Critter Country", type: "Dark Rides" },
  { name: "The Many Adventures of Winnie the Pooh", land: "Critter Country", type: "Dark Rides" },
  // Fantasyland
  { name: "Alice in Wonderland", land: "Fantasyland", type: "Dark Rides" },
  { name: "Casey Jr. Circus Train", land: "Fantasyland", type: "Family Rides" },
  { name: "Dumbo the Flying Elephant", land: "Fantasyland", type: "Family Rides" },
  { name: "it's a small world", land: "Fantasyland", type: "Dark Rides" },
  { name: "King Arthur Carrousel", land: "Fantasyland", type: "Family Rides" },
  { name: "Mad Tea Party", land: "Fantasyland", type: "Family Rides" },
  { name: "Matterhorn Bobsleds", land: "Fantasyland", type: "Thrill Rides" },
  { name: "Mr. Toad's Wild Ride", land: "Fantasyland", type: "Dark Rides" },
  { name: "Peter Pan's Flight", land: "Fantasyland", type: "Dark Rides" },
  { name: "Pinocchio's Daring Journey", land: "Fantasyland", type: "Dark Rides" },
  { name: "Snow White's Enchanted Wish", land: "Fantasyland", type: "Dark Rides" },
  { name: "Storybook Land Canal Boats", land: "Fantasyland", type: "Family Rides" },
  // Frontierland
  { name: "Big Thunder Mountain Railroad", land: "Frontierland", type: "Thrill Rides" },
  { name: "Sailing Ship Columbia", land: "Frontierland", type: "Transportation" },
  { name: "Mark Twain Riverboat", land: "Frontierland", type: "Transportation" },
  // Galaxy's Edge
  { name: "Millennium Falcon: Smugglers Run", land: "Galaxy's Edge", type: "Thrill Rides" },
  { name: "Star Wars: Rise of the Resistance", land: "Galaxy's Edge", type: "Dark Rides" },
  // Main Street U.S.A.
  { name: "Disneyland Railroad", land: "Main Street U.S.A.", type: "Transportation" },
  { name: "Main Street Vehicles", land: "Main Street U.S.A.", type: "Transportation" },
  // Mickey's Toontown
  { name: "Mickey & Minnie's Runaway Railway", land: "Mickey's Toontown", type: "Dark Rides" },
  { name: "Chip 'n' Dale's GADGETcoaster", land: "Mickey's Toontown", type: "Family Rides" },
  { name: "Roger Rabbit's Car Toon Spin", land: "Mickey's Toontown", type: "Dark Rides" },
  // New Orleans Square
  { name: "Haunted Mansion", land: "New Orleans Square", type: "Dark Rides" },
  { name: "Pirates of the Caribbean", land: "New Orleans Square", type: "Dark Rides" },
  // Tomorrowland
  { name: "Astro Orbitor", land: "Tomorrowland", type: "Family Rides" },
  { name: "Autopia", land: "Tomorrowland", type: "Family Rides" },
  { name: "Buzz Lightyear Astro Blasters", land: "Tomorrowland", type: "Dark Rides" },
  { name: "Finding Nemo Submarine Voyage", land: "Tomorrowland", type: "Dark Rides" },
  { name: "Monorail", land: "Tomorrowland", type: "Transportation" },
  { name: "Space Mountain", land: "Tomorrowland", type: "Thrill Rides" },
  { name: "Star Tours – The Adventures Continue", land: "Tomorrowland", type: "Thrill Rides" }
];

function parseWaitTime(waitTimeText) {
  if (!waitTimeText) return { waitTime: 0, status: 'Operating' };
  
  const text = waitTimeText.toLowerCase().trim();
  
  if (text === 'closed') {
    return { waitTime: -1, status: 'Closed' };
  }
  
  if (text === 'open') {
    return { waitTime: 0, status: 'Operating' };
  }

  if (text.includes('refurbishment')) {
    return { waitTime: -2, status: 'Down for Maintenance' };
  }

  const minutes = parseInt(text);
  if (!isNaN(minutes)) {
    return { waitTime: minutes, status: 'Operating' };
  }

  return { waitTime: 0, status: 'Operating' };
}

function findRideMetadata(rideName) {
  return rideMetadata.find(meta => 
    meta.name.toLowerCase().includes(rideName.toLowerCase()) ||
    rideName.toLowerCase().includes(meta.name.toLowerCase())
  ) || { land: "Unknown", type: "Attraction" };
}

async function scrapeWaitTimes() {
  try {
    const response = await axios.get('https://queue-times.com/en-US/parks/16/queue_times', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Cache-Control': 'no-cache'
      }
    });

    const $ = cheerio.load(response.data);
    const waitTimes = [];

    // Process each panel block that doesn't contain reservation information
    $('.panel-block').each((_, element) => {
      const $element = $(element);
      const elementText = $element.text().toLowerCase();
      
      // Skip if this is a reservation slot entry or contains "single rider"
      if (elementText.includes('reservation') || 
          elementText.includes('slots') || 
          elementText.includes('single rider')) {
        return;
      }

      const rideName = $element.find('span.has-text-weight-normal').text().trim();
      if (!rideName) return;

      const waitTimeText = $element.find('span.has-text-weight-bold').text().trim();
      const { waitTime, status } = parseWaitTime(waitTimeText);

      // Skip entries that don't match our metadata
      const metadata = findRideMetadata(rideName);
      if (metadata.land === "Unknown") return;

      waitTimes.push({
        name: rideName,
        waitTime,
        status,
        lastUpdate: new Date().toISOString(),
        land: metadata.land,
        type: metadata.type
      });
    });

    if (waitTimes.length === 0) {
      throw new Error('No wait times found in the HTML');
    }

    return waitTimes;
  } catch (error) {
    console.error('Scraping error:', error.message);
    throw error;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const waitTimes = await scrapeWaitTimes();
    res.setHeader('Cache-Control', 's-maxage=300');
    return res.status(200).json(waitTimes);
  } catch (error) {
    console.error('Handler error:', error);
    
    // Return fallback data
    const fallbackData = rideMetadata.map(ride => ({
      ...ride,
      waitTime: 0,
      status: "Operating",
      lastUpdate: new Date().toISOString()
    }));
    
    return res.status(200).json(fallbackData);
  }
}