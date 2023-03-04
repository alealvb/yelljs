<p align="center">
  <h1 align="center"> Yelljs </h1>
</p>
<p align="center">
  Yelling-like communication in your app
</p>

<hr/>

<h3> Download & Installation </h3>

```shell
yarn add yelljs
```

<h3> Usage </h3>

```javascript
import { yell, hear, mute } from "yelljs";

// We have a drink behavior
const drink = (liquid) => console.log("drinking fresh " + liquid);

// every time a 'drinking' event fires, we want our drink function to execute
// for subscribing we use 'hear'
hear("drinking", drink);

// now anywhere on our app at anytime we can call the yell function with our 'drinking' speaker
yell("drinking", "water");
//> drinking fresh water

// all the arguments passed to yell will be passed to the listener function
const drink = (liquid1, liquid2) => {
  console.log("drinking " + liquid + " with " + liquid2);
};
yell("drinking", "hot chocolate", "milk");
//> drinking fresh hot chocolate with milk

// to stop our drink function to execute further we use 'mute'
// we have to pass as arguments the speaker and the function we want to stop,
// since multiple function can be attached to the same speaker
mute("drinking", drink);

// you can also get a 'silence' function that will mute the exact function you passed with hear
const stopDrinking = hear("drinking", drink);
yell("drinking"); // will execute the drink function
stopDrinkingWine();
yell("drinking"); // will not execute the drink function

// promises/async support is also available via yellAsync
// yellAsync will return a promise that will resolve when all the listeners have resolved
const delayedDrink = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("delayed gulp gulp");
};
hear("getWater", delayedDrink);
yellAsync("getWater");
//> delayed gulp gulp

// you can also create a yelljs instance to have more control over who can hear/yell on the system

import Yell from "yelljs";
const myYell = new Yell();

const drink = () => console.log("gulp gulp");

const stopDrinking = myYell.hear("getWater", drink);
myYell.yell("getWater");
//> gulp gulp
stopDrinking();
```
