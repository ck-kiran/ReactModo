# ReactModo

**ReactModo** is a powerful, customizable, and accessible UI component library for React. This package provides a `Button` component that is designed for speed, ease of use, and extensive customization.

## Installation

Install the library using npm or yarn:

```bash
npm install reactmodo
```

```bash
yarn add reactmodo
```

> **Note:** `reactmodo` requires `react` and `react-dom` as peer dependencies.

## Usage

To use the `Button` component, import it into your React application:

```jsx
import React from 'react';
import { Button, InjectButtonStyles } from 'reactmodo';

const App = () => {
  // Inject styles for special variants like ripple and shimmer
  // This only needs to be done once in your application root.
  return (
    <>
      <InjectButtonStyles />
      <div style={{ padding: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <Button variant="primary">Primary Button</Button>
        <Button variant="ripple">Ripple Effect</Button>
        <Button variant="shimmer">Shimmer</Button>
      </div>
    </>
  );
};

export default App;
```

### Important: Injecting Styles

For special variants like `ripple`, `shimmer`, `interactive-hover`, and `hover-reveal` to work correctly, you must include the `InjectButtonStyles` component at the root of your application. This component injects the necessary CSS for these effects into the document head.

## Button Props

The `Button` component accepts the following props:

| Prop                  | Type                                                                                             | Default             | Description                                                                                                       |
| --------------------- | ------------------------------------------------------------------------------------------------ | ------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `variant`             | `primary`, `secondary`, `danger`, `success`, `warning`, `ghost`, `outline`, `ripple`, `shimmer`, etc. | `primary`           | The preset style of the button.                                                                                   |
| `size`                | `small`, `medium`, `large`                                                                       | `medium`            | The size of the button.                                                                                           |
| `color`               | `primary`, `secondary`, `error`, `info`, `success`, `warning`, `inherit`, or `string`              | `primary`           | The color of the component, supporting theme colors and custom values.                                            |
| `children`            | `React.ReactNode`                                                                                | -                   | The content of the button.                                                                                        |
| `onClick`             | `(event: React.MouseEvent<HTMLButtonElement>) => void`                                           | -                   | The function to call when the button is clicked.                                                                  |
| `disabled`            | `boolean`                                                                                        | `false`             | If `true`, the button is disabled.                                                                                |
| `loading`             | `boolean`                                                                                        | `false`             | If `true`, the button is in a loading state.                                                                      |
| `loadingPosition`     | `start`, `end`, `center`                                                                         | `center`            | The position of the loading indicator.                                                                            |
| `leftIcon`, `endIcon` | `React.ReactNode`                                                                                | -                   | Icons to display before or after the button text.                                                                 |
| `component`           | `React.ElementType`                                                                              | `button`            | The component to use for the root node (e.g., `a` for links).                                                     |
| `href`                | `string`                                                                                         | -                   | The URL to link to if the button is used as an anchor.                                                            |
| `fullWidth`           | `boolean`                                                                                        | `false`             | If `true`, the button will take up the full width of its container.                                               |
| `...`                 |                                                                                                  | -                   | All other standard `React.ButtonHTMLAttributes` are supported.                                                    |

### Custom Styling

You can customize the button's appearance using the following props:

- `backgroundColor`
- `textColor`
- `borderColor`
- `borderWidth`
- `borderRadius`
- `padding`
- `width`
- `height`

## Special Variants

### Ripple Effect

```jsx
<Button variant="ripple">Ripple Button</Button>
```

### Shimmer Effect

```jsx
<Button variant="shimmer">Shimmer Button</Button>
```

### Interactive Hover

```jsx
<Button variant="interactive-hover" size="large">Interactive Hover</Button>
```

### Hover Reveal

```jsx
<Button variant="hover-reveal" size="large">Hover Reveal</Button>
```

### Animated Subscribe

```jsx
<Button variant="animated-subscribe">Subscribe</Button>
```

## License

This project is licensed under the ISC License.