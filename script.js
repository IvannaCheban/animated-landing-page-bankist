"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const nav = document.querySelector(".nav");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
const header = document.querySelector(".header");
const message = document.createElement("div");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

message.classList.add("cookie-message");

message.innerHTML =
  'We use cookies fo improved functiononality and analytics. <button class="btn btn--close-cookie">Got it</button>';

header.append(message);

header.after(message); // as a sibling

//Delete elements
document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    message.remove(message);
  });
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px";
message.style.backgroundColor = "#37383d";
message.style.width = "120%";
//Implementing smooth scroling
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
btnScrollTo.addEventListener("click", function () {
  const s1Coord = section1.getBoundingClientRect();
  section1.scrollIntoView({ behavior: "smooth" });
});
// Implementing page naviagation smooth scroling

// 1)add event listener to a common parrent of all the elements that we are interested in
//2)Determin what parent originated that event, so we can then work with that element
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  //Matching strategy (ignore strategy to avoid events that happen NOT on the links)

  if (e.target.classList.contains("nav__link")) {
    console.log("Link");
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});
//Passing arguments to EventHandlers

//Building a tabbed component

//adding event handlers to buttons
tabsContainer.addEventListener(
  "click",
  function (e /*to know which button was clicked*/) {
    const clicked = e.target.closest(".operations__tab"); //its finding the closest parrent with its classname

    //Guard clause
    if (!clicked) return; //modern way

    //Active tab
    tabs.forEach((t) => t.classList.remove("operations__tab--active")); // removing the class before its added from any other tab
    clicked.classList.add("operations__tab--active");

    //Activate content area
    tabsContent.forEach((c) =>
      c.classList.remove("operations__content--active")
    ); //removing the class before its added
    document
      .querySelector(`.operations__content--${clicked.dataset.tab}`)
      .classList.add("operations__content--active");
  }
);

//Passing arguments to event handlers
//mouseEnter does not bubble
const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link"); //best practise - moving up to closest parent at then from there selecting what we want
    const logo = link.closest(".nav").querySelector("img");
    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

//passing 'an argument' into handler, using the this keyword as an addtional value
nav.addEventListener(
  "mouseover",
  handleHover.bind(0.5) /*function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link"); //best practise - moving up to closest parent at then from there selecting what we want
    const logo = link.closest(".nav").querySelector("img");
    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = 0.5;
    });
    logo.style.opacity = 0.5;
  }
}*/
);

nav.addEventListener(
  "mouseout",
  handleHover.bind(1) // The bind method creates a new function that, when called, has its this keyword set to the provided value.
  /*function (e, opacity) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link"); //best practise - moving up to closest parent at then from there selecting what we want
    const logo = link.closest(".nav").querySelector("img");
    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = 1;
    });
    logo.style.opacity = 1;
  }
}*/
);

//Implementing sticky Navigation: The scroll Event

//To make navigation stiky we need to add class="nav stiky with position fixed and background color with opacity 0.9"
/*
const initialCords = section1.getBoundingClientRect();

window.addEventListener("scroll", function (e) {
  //scroll event is not really eficient and should be avoided, it fires all the time no matter how small the change is
  if (window.scrollY > initialCords.top) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
});
*/
// //A better way to implement a sticky navigation
// //The intersection observer API
// // firt we have to create new IntersectionObserver, it accepts 2 values: callback function and observer options object. Store this observer as a variable and then call the element that serves as a starting point for observer

// //entries arg is an aray of the threshold entries
// const obsCallback = function (entries, observer) {
//   entries.forEach((entry) => {
//     console.log(entry); // intersection ratio is the treshold that we defined in options
//   });
// };

// const obsOptions = {
//   root: null, //element that he want our target to intersect//if its null it will intersect entire view port
//   threshold: [0, 0.2], //persentage of interseciton at which observer callback will be called
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);

// observer.observe(section1); // whenever Intersection observer observes the section in specified threshold callback function is fireing
const navHeight = nav.getBoundingClientRect().height; // not passing but calling a value

const stickyNav = function (entries) {
  const [entry] = entries; //entries[0]
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0, // if 0% of header is visible
  rootMargin: `${navHeight}px`, //box of 90 pixsels that will be applied to outside of the traget element
});
headerObserver.observe(header);

//Revealing sections on scroll

const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries; // destructuring
  console.log(entry);
  if (!entry.isIntersecting) return; // guard clause

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target); // stoping the observation as the page loaded
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

/*
//Dom Traversing fundamentals
const h1 = document.querySelector("h1");

//going downwards: child

console.log(h1.querySelectorAll(".highlight")); //works even if its not direct children of h1, but it supposed to be relative
console.log(h1.childNodes);
console.log(h1.children); //live collection
console.log((h1.firstElementChild.style.color = "white"));
console.log((h1.lastElementChild.style.color = "orangered"));

//Going upwards:parrents
console.log(h1.parentNode); //direct parent
console.log(h1.parentElement);
h1.closest(".header").style.background = "var(--gradient-secondary)"; //choosing the closest parent to header element// opposite of quarySelector - quary selector looks for kids and closest for ancestors(parents)
h1.closest("h1").style.background = "var(--gradient-primary)"; //if there are no h1 elements in parenting list the closest method will return the element itself

//Going sideways(siblings) we can go only to previous and the next one

console.log(h1.previousElementSibling); //null because ithere are no h1 elements before this one

console.log(h1.nextElementSibling);

//for nodes

console.log(h1.previousSibling);

console.log(h1.nextSibling);

// moving up to an element and reading children form there
console.log(h1.parentElement.children);

[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = "scale(0.5)";
});
*/
// Implementing page naviagation smooth scroling (NOT effitient way)
// document.querySelectorAll(".nav__link").forEach(function (e) {
//   e.addEventListener("click", function (e) {
//     e.preventDefault();

//     const id = this.getAttribute("href"); //selection local html value of each nav link

//     document.querySelector(id).scrollIntoView({ behavior: "smooth" }); //getting the selector from each element to use it at  the same time
//   }); // not effitient way
// });
//Event delegation, Implementing page naviagation

/*
//Event propagation in practice

// rgb(255,255,255)
//random number genearator
const randomInt = (min, max) => Math.floor(Math.random() * max - min + 1) + min;

const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

console.log(randomColor(0, 255));

document.querySelector(".nav__link").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("Link", e.target, e.currentTarget);
  // stop event propagation
  // e.stopPropagation();
});
document.querySelector(".nav__links").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("Container", e.target, e.currentTarget);
});
document.querySelector(".nav").addEventListener(
  "click",
  function (e) {
    this.style.backgroundColor = randomColor();

    console.log("Nav", e.target, e.currentTarget);
  }
  // true //here we set 3rd event listener parameter(UseCapture parameter) to true event handler will not listen to the bubbling events but to capturing events
);

//Even PROPAGATION: bubling and capturing theory

//JS events have a very important property: capturing phase and bubling phase
//capturing phase is  the process of event traveling from the root(Document) to the target elemet throught all of the parent elements of the target element
//when it reached the target the target phase begins where events can be handled right at the target, and we do that with different event listeners
//as soon as event occurs it runs the attached callback function

//after reaching the target event travels back to the root in the so called bublling phase we say that event bubled up to the document root throught all the parents elements, basicaly its as if this event happend in each of the parent element, if we would assing the element to section we would have handled the exact same event twice, once at it's target and once at its parent element, this behavior allows us to implement really powerfull patterns
// by default events can only be handled at target and bubling phase, but we can also set it to listen to events in the capturing phase instead
//

/*
//Implementing smooth scroling theory
//old way
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", function (e) {
  const s1Coords = section1.getBoundingClientRect(); //getting the coordinates of the part that we need to scroll to
  console.log(s1Coords);
  console.log(e.target.getBoundingClientRect()); //when we scroll these coordinates change// this position is relative to the view port
  console.log("Current sroll (X/Y):", window.pageXOffset, window.pageYOffset); //when we at the top its 0 / 0, Y changes when we scroll down, it increases the further you scroll
  console.log(
    "height / witdh viewport",
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  ); //accesing the witdh and  height of the clients viewport
  // scrolling
  // window.scrollTo(
  //   s1Coords.left + window.pageXOffset, //determined position of the element relevant to the document
  //   s1Coords.top + window.pageYOffset
  // ); // the left goes first, and then the top -  //traveling to section 1 coordinates on click by reading left and top properties from getBoundingClientRect(); method and also we need to add the part that we dont see with window.pageZoffset to get to the postion when we are not exactly on the top of the screen(current position + current scroll)
  // window.scrollTo({
  //   // to make scrolling smooth we need to specify the object left, top and behavior properties
  //   left: s1Coords.left + window.pageXOffset,
  //   top: s1Coords.top + window.pageYOffset,
  //   behavior: "smooth",
  // });
  //MODERN way
  section1.scrollIntoView({ behavior: "smooth" }); // does't work with older browsers
});
*/
//How the DOM is really works

// - Interact with the browser
// - Create modify and delete HTML elements, set styles, classes and atributes, listen and respond to events
//DOM is very complex API that contains lots of methods and properties
//DOM has different types of nodes, html elements, text elements

//How the DOM API is organizend behind the scenes

//every node is of the type node

// each node is represented by js object, this node object gets acces to spetial node methods and  properties(.textCOntent, childNOdes, parentNode, cloneNode)

//Each node type has diffrent child types: Element, Text, Comment, Document

//so whenever there is text element we can already know that it gets its own node <p>text<p>/ <!--Comment--> because whatever is in the code is in the DOM
//<p></p> <!----> - are represented by Element and each element gets acces to tons of properties InnerHTML Classlist, children parentElement

//Element has an inneer HTMLElement child type, and that element has execly one child type for each html element that exest in HTML: HTMLButtonElement, HTML DivElement and those elements can have unique propeerties

//Iheritanse of methods and properties

//any HTMLElement will have acces to .addEventListener();.cloneNode(); or closest() mehods

//Document is also a node type

//DOM API needs all the node-type to listen to events
// we usually liten to events with addEventlistener on an Element or Document all of this works becase of the spectial node type called EventTarget which is the parrent of both the Node-type and also the Window node-type because all types will inherit this method

//
//Selecting, creating and deleting elements

// console.log(document.documentElement); //selecitng entire document// selecting entire elemet to apply style.
// //for these spetial elements we dont need to write any selector
// console.log(document.head);
// console.log(document.body);

// //oherwise we can use
// const header = document.querySelector(".header"); // selecting first element that matches

// const allSections = document.querySelectorAll(".section"); // this will return a node list and that will contain all the elements that are the sections

// console.log(allSections);

// document.getElementById("section--1"); //here we only pass the ID name itself without the selector

// const allButtons = document.getElementsByTagName("button");
// console.log(allButtons); //here we have all the buttons returned in HTMLcollection, if DOM changes this collection is immediately UPDATED automaticaly

// console.log(document.getElementsByClassName("btn")); //also returns a live elements collection

// //Creating and inserting ellements

// const message = document.createElement("div"); // creates a dom element and stores that element in into the message
// message.classList.add("cookie-message");

// // message.textContent =
// // "We use cookies fo improved functiononality and analytics.";
// message.innerHTML =
//   'We use cookies fo improved functiononality and analytics. <button class="btn btn--close-cookie">Got it</button>'; //now we nave this element and all we have to do is to insert it in our DOM
// // header.prepend(message); // prepending adds the element as the first child of selected element into DOM

// header.append(message); // append adds the element as the last child of selected element into DOM

// //The message now is only at the bottom, that means that this element is now a live element at the DOM and can not be at the multiple places at the time, so append method moved the element from being the first child to be the last child

// // header.append(message.cloneNode(true)); //this allows to copy the element. here we pass in true which means that all the child elements will aslo be copied along

// // header.before(message); //as a sibling
// header.after(message); // as a sibling

// //Delete elements
// document
//   .querySelector(".btn--close-cookie")
//   .addEventListener("click", function () {
//     message.remove(message);
//     // message.parentElement.removeChild(message);//before remove method was introduced
//   });
//
/*
//STYLES, atributes and classes
//
//styles
message.style.backgroundColor = "#37383d";
message.style.width = "120%";
console.log(message.style.color); //reading the properties inline only possible if we set them manualy inline
console.log(message.style.backgroundColor);

console.log(getComputedStyle(message).color); //reading the properties of an ellement
console.log(getComputedStyle(message).height); // even if we did not set the property ourselves, browser did it so we still have acces to it
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px"; //here we can add getcomputedstyle height and extra height that we would like to, just need to concider that the value we  is a sting, so we need to convert that

//Custom proberties (CSS variables)
document.documentElement.style.setProperty("--color-primary", "orangered"); //first selecting the property that we want to change, and second specifying the what we want to change it too

//Atributes (class, id)
const logo = document.querySelector(".nav__logo");
console.log(logo.alt); //this works because images should have those atributes
console.log(logo.src); //if we specify it in html than the Js will automaticaly create these properties on the object
console.log(logo.className); //nav__logo

logo.alt = "Beautiful minimalist logo"; // setting alt atributes

// non-standart
console.log(logo.designer); //undefined because its not a standart property
console.log(logo.getAttribute("designer")); // a bit different but it works
logo.setAttribute("company", "Bankist");
console.log(logo.getAttribute("company"));

console.log(logo.src); //absolute
console.log(logo.getAttribute("src")); // relative(to html)

const link = document.querySelector(".nav__link--btn");
console.log(link.href); // absolute
console.log(link.getAttribute("href")); // relative to html

//Data atributes
console.log(logo.dataset.versionNumber); // these specioal atributes, with data in the name, are always stored in dataset object
//In JavaScript, a dataset typically refers to a collection of structured data that can be used for various purposes, such as analysis, manipulation, or visualization. It can be represented in different formats, such as arrays, objects, or JSON (JavaScript Object Notation).
//You can perform various operations on the dataset, such as filtering based on specific criteria, sorting, mapping to extract specific properties, or aggregating data using reduce functions.

//Classes
logo.classList.add("c", "j");
logo.classList.remove("c", "j");
logo.classList.toggle("c");
logo.classList.contains("c"); //not includes

//set class
//Dont use
// logo.className = "jonas"; // overwrigth all there is and allow only 1 className,
*/
/*
//Type of EVENTS and event HANDLERS
//event is a signal generated by certain DOM node
//
//event happens and it doest matter if we listen to it or not
//
//Mouse enter event

const h1 = document.querySelector("h1");

// h1.addEventListener("mouseenter", function (e) {
//   alert("addEventListener: Great! You are reading the heading");
// }); // much like hoover

//Using onEvent on the element

// h1.onmouseenter = function (e) {
//   alert("onmouseenter: Great! You are reading the heading :D");
// }; //old school method

//why addEventListener is better: in allows us to add multiple listeners to the same event// if use onmouseenter it overwrights the event
//Remove event handler
const alertH1 = function (e) {
  alert("addEventListener: Great! You are reading the heading heading");
  // h1.removeEventListener("mouseenter", alertH1); // handy when you only want to listen to the event once
};

h1.addEventListener("mouseenter", alertH1);

//we can remove listener at any point
// setTimeout(() => h1.removeEventListener("mouseenter", alertH1), 5000);

//removing by using HTMLatribute , defining in HTML // this is bad practice
// <h1 onclick= "alert('HTML alert')">
//very old
*/
//
