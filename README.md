# Payments Data Dashboard

## Introduction

This project is a web dashboard built to manage payment transactions. It utilizes modern web technologies and libraries to provide a seamless user experience.

## Technologies Used

- **React**: Used as the frontend library for building user interfaces.
- **@tanstack/react-query**: Used for fetching and posting data to the backend. It offers a convenient way to manage asynchronous data fetching, retries and caching.
- **Tailwind CSS**: Employed for styling the user interface, providing a utility-first approach to styling.
- **Axios**: Used for making HTTP requests to the backend API. Axios is a promise-based HTTP client that simplifies the process of sending asynchronous requests.
- **react-icons**: Utilized for adding icons to various UI elements
- **@headlessui**: Used for implementing modal/dialog components within the Tailwind CSS framework.

## Design Choices

- **@tanstack/react-query**: Chosen for its simplicity and efficiency in managing asynchronous data fetching, caching, retry mechanism and state synchronization.
- **Tailwind CSS**: Selected for its utility-first approach, allowing rapid development and easy customization of UI components.
- **Axios**: Preferred for its simplicity and robustness in handling HTTP requests. Axios provides a straightforward API for making requests and handling responses.
- **Context API**: Used for managing global application state, particularly for managing payment history and the state of the payment dialog.
- **react-icons**: Used to enhance the visual appeal of the user interface with a variety of high-quality icons. React-icons simplifies the process of adding icons to components without the need for external assets.
- **@headlessui**: Adopted for its accessibility-focused approach to building modal/dialog components. Headless UI provides accessible and customizable components that integrate seamlessly with Tailwind CSS.

## Installation and Setup

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

1. Unzip the file into your local machine
2. Navigate to the project directory:
   ```
   cd <project-directory>
   ```
3. Install dependencies using npm or yarn:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```
4. Start the React development server:
   ```
   npm start
   ```
   or
   ```
   yarn start
   ```
5. Ensure that the backend API is running and accessible at http://localhost:8080 for full functionality.
6. Access the web dashboard in your browser at [http://localhost:3000](http://localhost:3000).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
