# CS 260 Notes

[My startup](https://simon.cs260.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS Notes

I signed up for an AWS account, I haven't started paying for anything yet I don't think.

Our tech stack: React->Caddy2->NodeJs->mongoDB

Front ends run in browser, AWS handles back end for our project

Layers- Link (physical connection), internet (establishing connection/routing), transport (packet delivery - TCP/UDP), application (functionality like browsing)

DNS- Domain name system
1. look up ip address using the name
2. talks to server

[subdomain.]secondary.top (secondary.top is root)

TLDs
Originals: com, org, edu, gov, mil, int, net
Country: uk, cn, tv
Generic: click, gold, ceo

localhost (127.0.0.1)



## HTML Notes

Tags for different sections of the page

Use the most specific tag you can for an element, ID can be added if it is unique and class helps distinguish different types of divisions.
Most things are formatted like

<img src="source image>

or for tags
<main></main>

So start with that if you can't figure it out.

## CSS Notes

Responsive design
- Meta name = "viewport" - One pixel on device matches one pixel on ours
- float: right - pushes something to the right and wraps everything around it
- Display - none, block, inline, flex, grid
- Grid - one of the display types, puts children in a grid, hence the name
- Flex - all of the children are flexible. On children, you can specify the flex rule. Three values: grow, shrink, basis. Basis is default desired size, if extra space grow tells you how much to grow, and if there is less space, shrink tells how much to shrink. flex: grow, shrink, basis.
- Block is default display type for divs, inline for spans.

Holy Grail of layout
Classic layout, header with nav on top, footer with information on the bottom, application controls on the left with the content area in the main middle.

Media Queries
Some sort of preposition to describe when to trigger, and it overwrites previous rule

CSS frameworks
A bunch of css references you can include, we are using bootstrap.
link to it in header

## Javascript Basics

console.log('hello' + ' ' + world)

function join(a, b) {
  return a + ' ' + b;
}

array declaration
const words = ['hello', 'world'];
words.forEach((word) => console.log(word));
  
function countdown() {
  let i = 0;
  while (i++ < 5) {
    console.log('Counting... ${i}');
  }
}

create a file called index.js if you don't want to do stuff in the browser


Node.js
Even better way to do it without the browser

## React Notes
Web framework does 4 things: Simplify common patterns, provide common components, improve performance, increase device coverage.

JSX: Combining Javascript and HTML

JSX -> const jsx = <p>Hello World</p>;
JS -> const jsx = React.createElement("p", null, "Hello world");

Does cool injecting stuff to put that element there.
JSX translates it automatically from the first one to put an html element onto the DOM using Babel


Components- header, main, footer

Component:
const Hello = () => {
  return <div>Hello React</div>;
}

Children:

function Header() {
  return {
    <nav className="app-bar">
      <Link label="home"/>
      <Link label="users"/>
      <Link label="about"/>
    </nav>
  };
}

Router:
Our application has a lot of duplicated HTML, not componentized
We want to convert to a single page application, or SPA. Componentized DOM injection for our content page. Uses <BrowserRouter>

Toolchain:
How do I compile JSX myself? 
Vite- Frontend Build tool


## More JS stuff
Run Js files with node. node index.js

Console.log flavors

C style - console.log('hello %s', 'world');
console.count('a') (increments the number of times a has been called)
helps to debug things that don't really work with a debugger

Functions are just another type

const add = function (a, b = 0) {
  return a + b;
};

function doMath(operation, a, b) {
  return operation(a, b);
}
doMath takes in a function as a parameter and does the operation to the other parameters

console.log(doMath(function (a, b) { return a - b; }, 5, 3));
(this creates an *anonymous function*)

console.log(doMath((a, b) => a - b, 5, 3));
(the arrow syntax makes this look cleaner, does the exact same thing)

More about arrow functions
() => 3;
() => { 3; }; <- This returns undefined because of the new line, need to inlcude a return statement
() => { return 3; };

Closures
Clousures let me create a function that not only passes in a parameter, but also the state of everything passed in

function makeClosure(init) {
  let closureValue = init;
  return () => `closure ${++closureValue}`;
}

const closure = makeClosure(0);
console.log(closure()); <- prints out one
console.log(closure()); <- this is where it gets interesting, it will increment again to 2 because it is a closure and saves the states

Setting up the most basic react application of all time
mkdir reactDemo && cd reactDemo
npm init -y
npm install vite@latest -D
npm install react react-dom

index.html
<html lang="en">
  <body>
    <div id="root"></div>
    <script type="module" src="/index.jsx"></script>
  </body>
</html>


import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  return <div>Hello React</div>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

Arrow functions in react
function App() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>n++</button>
      <button onClick={() => setCount(count - 1)}>n--</button>
    </div>
  );
}
Helpful for buttons like this

 Reactivity in react, have to change it, it doesn't update automatically. React.useState();

 JSON
 Json is a way to represent data, has string, number, boolean, array, object, null. Converts from an object format in js to a textual representation in json.
 const obj;
 const json = JSON.stringify(obj);
 const objFromJson = JSON.parse(json);

 

 

