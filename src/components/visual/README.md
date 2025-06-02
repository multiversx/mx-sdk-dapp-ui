# Visual Components

This directory contains reusable visual components that are controlled through props from parent components. These components are built using Stencil.js and follow a consistent pattern of prop-based control.

## Components

### Preloader (`mvx-preloader`)
A loading indicator component that provides visual feedback during asynchronous operations. It can be customized with additional CSS classes to match different loading states and design requirements. The component is lightweight and can be easily integrated into any part of the application where loading states need to be displayed.

### Font Awesome Icon (`mvx-fa-icon`)
An icon component that integrates Font Awesome icons into the application. It supports both icon definitions and string-based icon names. The component includes accessibility features through optional descriptions and maintains consistent styling across the application. It's used for maintaining a consistent icon system throughout the UI.

### Side Panel (`mvx-side-panel`)
A sliding panel component that provides a modal-like experience with animations. It includes a header with back and close buttons, making it suitable for navigation flows and detailed views. The panel supports programmatic control and user interactions, with transitions for opening and closing states. It's used for displaying detailed information, forms, or secondary navigation.

### Tooltip (`mvx-tooltip`)
A tooltip component that provides contextual information to users. It supports hover and click-based activation, with positioning options (top or bottom). The tooltip is triggered by HTML elements and includes features for managing focus and click events. It's used for providing additional context or explanations for UI elements.

### Transaction List Item
A component for displaying transaction information in a structured format. It handles transaction data including assets, actions, and status information. The component presents transaction data in a user-friendly way, supporting different types of assets and transaction states. It's used in transaction histories, activity feeds, and financial dashboards.

### Pagination (`mvx-pagination`)
A pagination component that provides navigation controls for paginated content. It includes first/last page navigation, page number display, and disabled states. The component handles large datasets with built-in support for page number calculations and edge cases. It's used in data tables, search results, and interfaces that require paginated content navigation.

## Usage

All components are designed to be controlled through props from parent components. They follow a consistent pattern where:
1. Props control the component's state and appearance
2. Events are emitted for user interactions
3. Optional CSS classes can be provided for styling customization

Example usage:
```tsx
<mvx-side-panel
  isOpen={true}
  panelTitle="My Panel"
  hasBackButton={true}
  onClose={() => handleClose()}
  onBack={() => handleBack()}
>
  <div>Panel content</div>
</mvx-side-panel>
```
