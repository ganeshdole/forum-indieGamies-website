# @ganeshdole/scrolltotop

## Description

In a React Single Page Application (SPA), users often expect the view to scroll to the top when they navigate to a new page. Without this functionality, users might find themselves starting at an arbitrary scroll position, which can be confusing and lead to a poor user experience. The `@ganeshdole/scrolltotop` package provides a simple solution to this problem by automatically scrolling the window to the top whenever a new page is loaded using React Router.

## Features

- Automatically scrolls the window to the top when a new page is loaded.
- Compatible with React Router.

## Installation

To install the package, use npm:

```bash
npm install @ganeshdole/scrolltotop
```

## Usage

1. Import the `ScrollToTop` component from `@ganeshdole/scrolltotop`.
2. Wrap the `ScrollToTop` component around the content of your application.
3. Ensure React Router is set up in your project if you're using it.

Example:

```javascript

import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ScrollToTop from "@ganeshdole/scrolltotop";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <ScrollToTop>
      <App />
    </ScrollToTop>
);
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

- [Ganesh Dole](https://github.com/ganeshdole)
