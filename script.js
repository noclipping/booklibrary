library = []

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

let randomBook = () =>{
  let randomNum = getRandomInt(4)
  if(randomNum === 0){
    return '📕';
  } else if(randomNum === 1){
    return '📗';
  } else if(randomNum === 2){
    return '📘';
  } else if(randomNum === 3){
    return '📙';
  }
}

let  storedLibrary = JSON.parse(localStorage.getItem("savedLibrary"))

if(storedLibrary){
  library = storedLibrary
}

function Book(title,author,pages,read){
	this.title = title
  this.author = author
  this.pages = pages
  this.read = read

}
Book.prototype.info = function(){
	return `Book title ${this.title} the author is ${this.author} and the amount of pages is ${this.pages}.` 
}
Book.prototype.tap = function(){
	return {title:this.title,author:this.author,pages:this.pages,read:this.read};
}

function addBookToLibrary(title,author,pages,read){
	let newBook= new Book(title, author, pages, read)
	library.push(newBook.tap());
  return(newBook.tap())
}

// end book object

let theTable = document.querySelector("table");
let submitButton = document.getElementById("button")


submitButton.addEventListener("click",e=>{
	let title = document.getElementById("title");
  let author = document.getElementById("author");
  let pages = document.getElementById("pages");
  let read = document.getElementById("read");
  
  
  
  if(checkForDuplicate(title.value)){
    console.log("DUPLICATE BOOK!")
    let errorField = document.querySelector("#error")
    errorField.style.color = 'red'
    errorField.textContent="ERROR: Duplicate book title!"
  } else{
    let book=addBookToLibrary(title.value,author.value,pages.value,read.checked)
     addTableRow(book)
     let errorField = document.querySelector("#error")
     errorField.textContent=""
  }
  saveLibrary();
  
  
})

function addTableRow(book){
let theIndex = library.findIndex(e=> e.title === book.title)
console.log(book)
console.log(theIndex)
let newRow = document.createElement("tr");
		newRow.setAttribute("data-index", theIndex);
		for (const[key,value] of Object.entries(book)){
		
    let newRowData = document.createElement("td");
    newRowData.textContent=value;
    newRow.append(newRowData);
  }
  	let delButton = document.createElement("button")
    delButton.setAttribute("data-index",theIndex);
    delButton.classList.add("button")
    delButton.textContent = "❌"
  	newRow.append(delButton)
    
    // END DEL BUTTON DOM CREATION, NEW CODE BELOW
    let readButton = document.createElement("button");
    readButton.setAttribute("data-index",theIndex);
    readButton.classList.add("read")
    readButton.style.color="green"
    readButton.textContent = "✔";
    
    newRow.append(readButton);

    theTable.append(newRow);

    DelListener(delButton,theIndex);

    ReadListener(readButton,theIndex);

    header.textContent+=randomBook();
  	
}

function updateLibrary(){
  
  for(let book of library){
  if(book === "empty"){continue}
  addTableRow(book);
}
}

function DelListener(button,bkindex){
  button.addEventListener("click", e=>{
    let header = document.querySelector("#header")
    let theRow = document.querySelector(`tr[data-index="${e.target.getAttribute('data-index')}"]`)

    if(theRow != null){theRow.remove()}

    library.splice(bkindex, 1, "empty");

    let arry = header.textContent.split("")
    console.log(arry)
    arry.splice(-2,2)
    console.log(arry)
    let finish = arry.join("")
    header.textContent=finish;
    saveLibrary();
  })
}

function ReadListener(button,bkindex){
  button.addEventListener("click", e=>{
    let bookindex = bkindex
    let theRow = document.querySelector(`tr[data-index="${e.target.getAttribute('data-index')}"]`)
    let readDOM = theRow.lastElementChild.previousElementSibling.previousElementSibling;
    if(library[bookindex].read === false){
    readDOM.textContent = true;
    library[bookindex].read = true;
    } else {
    readDOM.textContent = false;
    library[bookindex].read = false;
    }
    saveLibrary();
    
  })
}
function checkForDuplicate(newTitle){
  for(let book of library){
    if(book.title === newTitle){
      return true
    } 
  }
}
function saveLibrary(){
  localStorage.setItem('savedLibrary', JSON.stringify(library)); 
}


console.log(library);


updateLibrary();

