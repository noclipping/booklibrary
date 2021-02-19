library = []


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
}

// end book object

let theTable = document.querySelector("table");





let submitButton = document.getElementById("button")

submitButton.addEventListener("click",e=>{
	let title = document.getElementById("title");
  let author = document.getElementById("author");
  let pages = document.getElementById("pages");
  let read = document.getElementById("read");
  
  
  addBookToLibrary(title.value,author.value,pages.value,read.checked)
  addTableRow(library[library.length-1])
  
})

// above: submit button
// test stuff below 

let newbook = new Book("Call of C", "HP love", 234, false);





function addTableRow(book){
let newRow = document.createElement("tr");
		newRow.setAttribute("data-index", library.length);
		for (const[key,value] of Object.entries(book)){
		
    let newRowData = document.createElement("td");
    newRowData.textContent=value;
    newRow.append(newRowData);
  }
  	let delButton = document.createElement("button")
    delButton.setAttribute("data-index",library.length);
    delButton.classList.add("button")
    delButton.textContent = "X"
  	newRow.append(delButton)
    theTable.append(newRow);
   
  	updateDeleteButtons();
}


function updateLibrary(){
	
  for(let book of library){
  addTableRow(book);
}
}

console.log(newbook.info());

library.push(newbook.tap());

console.log(library);

updateLibrary();

function updateDeleteButtons(){

   let delButtons = document.querySelectorAll(".button")
      console.log(delButtons.length)

      delButtons.forEach(button => button.addEventListener("click", e=>{
    let theRow = document.querySelector(`tr[data-index="${e.target.getAttribute('data-index')}"]`)
    //console.log(e.target.getAttribute('data-index'));
    if(theRow != null){theRow.remove()} 
    // still trying to figure out why without an if statement causes error
    library.splice(e.target.getAttribute('data-index')-1, 1);
   
  }))
  
}




