# Stoppable-Recursive-Async-Calls
This is a toy app to demonstrate how to stop stale recursive calls with old parameters, in the situation when we have new calls with new parameters. In this app we will have a parameter `timespan` which defaults to 0, and the app will keep fetching page 1, 2, ... for this timespan. If we change timespan, the infinite fetch for previous timespan will stop, and it will start a infinite fetch for the new timespan.

## how it works
The trick here is to manage recursion in `useEffect()` and use a `stopped` flag to tell if the recursion should continue. When a new dependecy comes in (in our case `timespan`), it will set previous `stopped` to `true`, so previous recursions will stop. And a new `stopped` is generated to be `false`, thus a new round of recursion calls with updated parameters started to execute.

## run
```
git clone git@github.com:shunjizhan/Stoppable-Recursive-Async-Calls.git
cd Stoppable-Recursive-Async-Calls
yarn install
yarn start
```

## reference
https://flufd.github.io/avoiding-race-conditions-use-current-effect/

