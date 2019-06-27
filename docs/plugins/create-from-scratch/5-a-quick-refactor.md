---
---

# Step 5. A Quick Refactor

In this step we refactor the App component to align with the uniform we we prefer to create React components.

The `App` component installed by the Create React App (CRA) tool follows the functional model of component programming. This approach is gaining popularity, and in recent (as of June 2019) releases the React team is promoting it as the default form. However, there is some debate about this in the React community, and we are not, as of now, adopting this pattern.

Rather, we follow the class-based component programming model.

The primary reasons are:

- the function component model has only recently received support to place it on a parity with class components
  - it is thus not widely known or documented
- to keep codebases as understandable as possible by the most number of developers, we prefer to support the least number of programming patterns.
- the class-based component model works well with Typescript
- functional compnents require third party support to achieve functionality parity with class components.
- less refactoring work if a component needs to utilize component lifecycle methods

So, let's refactor `App.tsx`:

1. Edit `react-app/src/App.tsx`

2. Replace

   ```typescript
   const App: React.FC = () => {
     return (
       <div className="App">
         <p>Hello!</p>
       </div>
     );
   };

   export default App;
   ```

3. With:

   ```typescript
   interface AppProps {}

   interface AppState {}

   export default class App<AppProps, AppState> extends React.Component {
     render() {
       return (
         <div className="App">
           <p>Hello!</p>
         </div>
       );
     }
   }
   ```

4. Re-run test

   ```bash
   npm run test
   ```

## Next Step

[Step 6. Setup as Plugin](./6-setup-as-plugin)

\---
