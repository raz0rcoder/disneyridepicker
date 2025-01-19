import App from '../src/App';
import { NoSsr } from '@mui/material';

export default function Home() {
  return (
    <NoSsr>
      <App />
    </NoSsr>
  );
}