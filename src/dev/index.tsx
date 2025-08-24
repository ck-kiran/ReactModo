import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Button } from '../index';

const App: React.FC = () => {
  const [textValue, setTextValue] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Component Library Demo</h1>
      
      <div className="space-y-8">
        {/* Button Examples */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Buttons</h2>
          <div className="flex gap-4 flex-wrap">
            <Button variant="primary" size="small">Small Primary</Button>
            <Button variant="secondary" size="medium">Medium Secondary</Button>
            <Button variant="danger" size="large">Large Danger</Button>
            <Button disabled>Disabled Button</Button>
          </div>
        </section>
      </div>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);