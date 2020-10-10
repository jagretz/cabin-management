# Cabin Management <!-- omit in toc -->

👀 _this app is currently in-devlopment. i.e. is not in production or production ready._

A "managment" application to help manage reservations for family/friends cabins. It also includes many helpful notes such as how-to guides, what groceries are needed etc.

- [npm Scripts](#npm-scripts)
  - [`npm start`](#npm-start)
  - [`npm test`](#npm-test)
  - [`npm run build`](#npm-run-build)
- [Project Architecture](#project-architecture)
  - [Libraries, Frameworks, Tools](#libraries-frameworks-tools)
  - [State Management](#state-management)
- [Contribution](#contribution)

# npm Scripts

In the project directory, you can run:

## `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.

## `npm test`

Launches the test runner in the interactive watch mode.

## `npm run build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

_This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)._ -- Thank you CRA team!

# Project Architecture

## Libraries, Frameworks, Tools

Scaffolding

- create-react-app

Libraries

- React
- Firebase

Testing

- testing-library

Styles / CSS

- CSS standard i.e no pre-processors.

Linting & Formatting

- eslint: recommended settings with minor differences
- prettier: Use the defaults

## State Management

No state management libraries (i.e. Redux, MobX) are used. Instead, global application state is managed directly by react using local component state with prop drilling, react context, and separation of pages using react-router.

Using a state management library would make things easier as the application grows, but for now, with the application in its inception phase, managing state with react will due.

# Contribution

_Try_ to follow the Angular teams [Git Commit Guidelines](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines). See more their more detailed explainations and [examples](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#)
