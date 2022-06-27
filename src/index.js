import App from './App';
import './style.css';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App tab="home" />);
