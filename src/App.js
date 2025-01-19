// ... previous imports ...

const App = () => {
  // ... previous state declarations ...

  const filteredRides = waitTimes.filter(ride => {
    const matchesLand = !selectedLand || ride.land === selectedLand;
    const matchesType = !selectedType || ride.type === selectedType;
    return matchesLand && matchesType;
  });

  // ... rest of your component code ...
};

export default App;