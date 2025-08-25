/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import { createRoot } from 'react-dom/client';

import { InjectButtonStyles } from '../components/Button/Button';
import { Button } from '../index';

const App: React.FC = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Component Library Demo</h1>

      <div className="p-8 font-sans bg-gray-50 min-h-screen">
        <InjectButtonStyles />
        <h1 className="text-3xl font-bold mb-6">Enhanced Button Component</h1>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-3">Standard Variants</h2>
            <div className="flex flex-wrap gap-4 items-center">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="success">Success</Button>
              <Button variant="warning">Warning</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="outline">Outline</Button>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Magic UI Variants</h2>
            <div className="flex flex-wrap gap-4 items-center">
              <Button backgroundColor="#1f2938" color="#000" variant="ripple">
                Ripple Effect
              </Button>
              <Button variant="shimmer">Shimmer</Button>
              <Button size="medium" variant="interactive-hover">
                Interactive Hover
              </Button>
              <Button size="medium" variant="hover-reveal">
                Hover Reveal
              </Button>
              <Button variant="animated-subscribe">Subscribe</Button>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Sizes</h2>
            <div className="flex flex-wrap gap-4 items-center">
              <Button size="small" variant="outline">
                Small
              </Button>
              <Button
                backgroundColor="#33A1E0"
                size="medium"
                textColor="#FFFCFB"
              >
                Medium
              </Button>
              <Button
                backgroundColor="#3B060A"
                size="large"
                textColor="#FFFCFB"
              >
                Large
              </Button>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">With Icons & Loading</h2>
            <div className="flex flex-wrap gap-4 items-center">
              <Button
                leftIcon={
                  <svg
                    fill="none"
                    height="20"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                }
                variant="outline"
              >
                Left Icon
              </Button>
              <Button
                endIcon={
                  <svg
                    fill="none"
                    height="20"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                }
                variant="outline"
              >
                End Icon
              </Button>
              <Button loading>Loading Center</Button>
              <Button height="40px" loading variant="shimmer" width="100px">
                Loading Start
              </Button>
              <Button loading loadingPosition="end" variant="shimmer">
                Loading End
              </Button>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">
              States & Customization
            </h2>
            <div className="flex flex-wrap gap-4 items-center">
              <Button disabled>Disabled</Button>
              <Button component="a" href="https://google.com">
                Link
              </Button>
              <Button fullWidth>Full Width</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
