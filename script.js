"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

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
const header = document.querySelector(".header");
const message = document.createElement("div");
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
