//Suvrajit karmaker
function myFunction() {
    if (validate() == true) {

        let question1 = new InputTypeMethod("div1", "question1");
        question1.removeElement();
        question1.update();

        let question2 = new McqMrqMethod("div2", "question2", "radio");
        question2.removeElement();
        question2.update();

        let question3 = new McqMrqMethod("div3", "question3", "checkbox");
        question3.removeElement();
        question3.update();

        let question4 = new TextAreaTypeMethod("div4", "question4");
        question4.removeElement();
        question4.update();

        let submitButton = new Element("submit");
        submitButton.removeElement();

    } else {
        alert("You have to answer all of the questions.");
    }
}
/////////////////////////////////////form validation///////////////////////////////////////
function validate() {
    let isValidQuestion1 = document.getElementById('question1').value;
    isValidQuestion1 = isValidQuestion1.replace(/\s+/g, ' ');
    if (isValidQuestion1 == null || isValidQuestion1 == "") {
        return false;
    }

    let isValidQuestion4 = document.getElementById('question4').value;
    isValidQuestion4 = isValidQuestion4.replace(/\s+/g, '');
    if (isValidQuestion4 == null || isValidQuestion4 == "") {
        return false;
    }

    let item = document.getElementsByTagName('input');
    let countCheckbox = 0, countRadio = 0;
    for (let i = 0; i < item.length; i++) {
        if (item[i].type == "radio" && item[i].checked == true) {
            countRadio++;
        }
        if (item[i].type == "checkbox" && item[i].checked == true) {
            countCheckbox++;
        }
    }
    if (countCheckbox > 0 && countRadio > 0) {
        return true;
    } else {
        return false;
    }
}
////////////////////////////////
function createInheritance(child, parent) {
    child.prototype = Object.create(parent.prototype);
}

//////////////////////////////////
function Element(elementId) {
    this._elementId = elementId;
}
Element.prototype.addElement = function (parentId, html) {
    let parentElement = document.getElementById(parentId);
    parentElement.appendChild(html);
}
Element.prototype.removeElement = function () {
    let element = document.getElementById(this._elementId);
    element.remove(element);
}

////////////////////////////////////////
function InputTypeMethod(parentId, elementId) {
    this._parentId = parentId;
    Element.call(this, elementId);
    this._html = this.htmlGenaretor();
}
createInheritance(InputTypeMethod, Element);
InputTypeMethod.prototype.htmlGenaretor = function () {
    let str = document.getElementById(this._elementId).value;
    let newElement = document.createElement("p");
    let node = document.createTextNode(str);
    newElement.appendChild(node);
    newElement.className = "forP";
    return newElement;
}
InputTypeMethod.prototype.update = function () {
    Element.prototype.addElement.call(this, this._parentId, this._html);
}

///////////////////////////////////////////////
function TextAreaTypeMethod(parentId, elementId) {
    InputTypeMethod.call(this, parentId, elementId);
}
createInheritance(TextAreaTypeMethod, InputTypeMethod);
TextAreaTypeMethod.prototype.htmlGenaretor = function () {
    let str = document.getElementById(this._elementId).value;
    let textAreaHeight = document.getElementById(this._elementId).style.height;
    let newElement = document.createElement("textarea");
    newElement.setAttribute("readonly", "");
    newElement.setAttribute("style", `height: ${textAreaHeight};`);
    let node = document.createTextNode(str);
    newElement.appendChild(node);
    return newElement;
}

///////////////////////////////////////////////
function McqMrqMethod(parentId, elementId, inputType) {
    this._inputType = inputType;
    InputTypeMethod.call(this, parentId, elementId);
}
createInheritance(McqMrqMethod, InputTypeMethod);
McqMrqMethod.prototype.htmlGenaretor = function () {
    let createUl = document.createElement('ul');

    let item = document.getElementById(this._elementId).getElementsByTagName('input');
    for (let i = 0; i < item.length; i++) {
        if (item[i].type == this._inputType && item[i].checked == true) {
            let x = document.createElement("LI");
            let t = document.createTextNode(item[i].value);
            x.appendChild(t);
            createUl.appendChild(x);
        }
    }

    return createUl;
}

////////////////////////////////////////
let textarea = document.querySelector('textarea');

textarea.addEventListener('keydown', autosize);

function autosize() {
    let element = this;
    setTimeout(function () {
        element.style.cssText = 'height:auto; padding:0';
        element.style.cssText = 'height:' + element.scrollHeight + 'px';
    }, 0);
}
