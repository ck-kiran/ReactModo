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
            <Button variant="primary" size="large">
              Click me
            </Button>

            <Button
              backgroundColor="#8B5CF6"
              textColor="white"
              borderColor="#7C3AED"
              borderRadius="12px"
              padding="12px 24px"
              hoverBackgroundColor="#7C3AED"
              focusRingColor="#8B5CF6"
              ariaLabel="Submit form"
              leftIcon={<span>→</span>}
              onClick={() => console.log('Clicked!')}
            >
              Custom Button
            </Button>

            <Button loading={true} leftIcon={<span>💾</span>}>
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