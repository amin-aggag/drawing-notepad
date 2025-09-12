# Drawing Notepad 📝🖌️

A drawing app that supports stylus, mouse and touch input. With a sleek and minimal design that is responsive on desktop and mobile, it works anywhere as the sketchpad of your next big idea.

There is a continuation of this project into a full-fledged note-taking app for both handwriting and typing, complete with an Obsidian-like graph view to view connections between notes. It's at this link: [https://github.com/amin-aggag/ilmmind-web/](https://github.com/amin-aggag/ilmmind-web)

![Drawing Notepad preview - A house on a hill with two hills with trees behind it](/canvas-drawing-app/src/assets/Drawing%20Notepad%20Preview%20Image.png)

## Technologies used

![React logo](/canvas-drawing-app/src/assets/react.svg) React

![TypeScript logo](/canvas-drawing-app/src/assets/Typescript_logo_2020.svg) TypeScript

![Vite logo](/canvas-drawing-app/src/assets/Vitejs-logo.svg) Vite

I designed the code to be **reusable**, **maintainable**, **clean** and easy to add features to by using React design patterns including custom hooks and the use of `useContext()` for state management throughout the component tree as well as SOLID principles, including the Single-Responsibility principle and Open-Closed principle. 

None of this code came from any course or YouTube tutorial. This project was made on my own.

## Features

🖊️ Various pens sizes

🎨 Various colors to choose from

🤚 A moveable canvas to draw on (two fingers or trackpad gestures to pan)

↩️ Undo and redo functionality

👆 Touch and mouse support

🖼️ Sleek and undistracting UI design

## Planned code refactors

🎨 Use TailwindCSS for styling and reusable components to avoid messy inline CSS styling

📦 Use Redux.js for state management instead of just useContext() since Redux seems perfect for my use case (the app requires centralised state management as several components need access to the same state variables)

## Running the app locally

Clone this repository: `git clone <repository-link>`

Run `cd drawing-notepad/canvas-drawing-app; npm i`

Run `npm run dev`

The app should now be working on [http://localhost:5173](http://localhost:5173)!

## Known bugs

When moving the canvas with two fingers, dots from the touch input are registered as actual drawings. This will be fixed soon. For now, they can be undone and drawing can continue as usual.

