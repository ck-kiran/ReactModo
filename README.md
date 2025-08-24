# ReactModo

A highly customizable and accessible component for React applications, part of the ReactModo UI library.

## Installation

Install the library using npm or yarn:

```bash
npm install reactmodo
```

or

```bash
yarn add reactmodo
```

> **Note:**  
> `reactmodo` requires `react` and `react-dom` as peer dependencies.

## Usage

Import and use the Button component in your React app:

```jsx
import React from 'react';
import { Button } from 'reactmodo';

const App = () => {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div>
      <h1>ReactBricks Demo</h1>
      <Button
        onClick={handleClick}
        variant="primary"
      >
        Primary Button
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
      
      
    </div>
  );
};

export default App;
```

## License

This project is licensed under the ISC License.

---

For more components and documentation,
