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

