/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import { createRoot } from 'react-dom/client';

import { Button } from '../index';

const App: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '20px',
      }}
    >
      <h1>ReactModo Component Library</h1>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="success">Success</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="warning">Warning</Button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="ripple">Ripple</Button>
        <Button variant="shimmer">Shimmer</Button>
        <Button size="medium" variant="hover-reveal">
          Hover Reveal
        </Button>
      </div>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
