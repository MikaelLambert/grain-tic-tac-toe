# React-tac-toe

## Build something like this!
![Tic-tac-toe Game](https://github.com/grain-team/tic-tac-toe/blob/master/objective.png?raw=true)

# Extra points
- Use TypeScript
- Make it look nice
- Add modern tooling of your choice (linter, formatter, etc)
- Save game data to LocalStorage
- Add a controller to change the grid size (3x3, 4x4, 5x5 or 6x6)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

# Notes

Thanks for taking the time to look through this, I had a great time working on this project!

- I took the time to style it a bit nicer
- I chose to just add local storage since it's a simply change in the interest of time
- I chose to use a turn counter instead of checking the whole board for a draw to save some processing
- I'm not a fan of the states and state transfers but this was a decent first pass without researching tic-tac-toe designs
- I put everything into the `App.js` file for simplcity but would separate them in a real app
- I didn't clean up the starter app too much to save time
- I think the `useEffect()` calls could be cleaner but what I have works okay
