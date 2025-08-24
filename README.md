# ReactModo

A highly customizable and accessible button component for React applications, part of the ReactModo UI library.

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
import { Button } from 'reactbricks'; // Updated package name

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
        disabled={true}
      >
        Disabled Button
      </Button>
      <Button
        loading={true}
      >
        Loading Button
      </Button>
      <Button
        loading={true}
        loadingText="Submitting..."
      >
        Custom Loading
      </Button>
    </div>
  );
};

export default App;
```

## Props

Customize the Button with the following props:

| Prop         | Type                          | Default      | Description                                                         |
| ------------ | ----------------------------- | ------------ | ------------------------------------------------------------------- |
| `children`   | `React.ReactNode`             | **required** | The content displayed inside the button (e.g., text, icons).        |
| `onClick`    | `React.MouseEventHandler`     | `undefined`  | Function called when the button is clicked.                         |
| `variant`    | `'primary' | 'secondary' | 'danger'` | `'primary'`  | Visual style of the button.                                         |
| `size`       | `'small' | 'medium' | 'large'` | `'medium'`   | Size of the button.                                                 |
| `disabled`   | `boolean`                     | `false`      | If `true`, disables the button.                                     |
| `loading`    | `boolean`                     | `false`      | If `true`, shows a loading indicator and disables the button.       |
| `loadingText`| `string`                      | `'Loading...'` | Text to display when the button is in a loading state.              |
| `className`  | `string`                      | `''`         | Custom CSS class for the button.                                    |
| `...rest`    | `React.ButtonHTMLAttributes<HTMLButtonElement>` |              | Any other standard HTML button attributes.                          |

## License

This project is licensed under the ISC License.

---

For more components and documentation,