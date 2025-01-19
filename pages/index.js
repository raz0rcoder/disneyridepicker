import dynamic from 'next/dynamic';

// Dynamically import App with no SSR
const App = dynamic(() => import('../src/App'), { ssr: false });

const Home = () => {
  return <App />;
};

export default Home;