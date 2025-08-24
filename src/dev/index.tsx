import React from 'react';
import { createRoot } from 'react-dom/client';

import { Button } from '../index';

const App: React.FC = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Component Library Demo</h1>

      <div className="space-y-8">
        {/* Button Examples */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Buttons</h2>
          <div className="flex gap-4 flex-wrap">
            <Button size="large" variant="primary">
              Click me
            </Button>

            <Button
              ariaLabel="Submit form"
              backgroundColor="#8B5CF6"
              borderColor="#7C3AED"
              borderRadius="12px"
              focusRingColor="#8B5CF6"
              hoverBackgroundColor="#7C3AED"
              leftIcon={<span>→</span>}
              onClick={() => console.log('Clicked!')}
              padding="12px 24px"
              textColor="white"
            >
              Custom Button
            </Button>

            <Button leftIcon={<span>💾</span>} loading={true}>
              Saving...
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
