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

let theTable = document.querySelector("table");

let newbook = new Book("Call of C", "HP love", 234, false);




console.log(newbook.info());

library.push(newbook.tap());

console.log(library);


for(let book of library){

	let newRow = document.createElement("tr");
  
	for (const[key,value] of Object.entries(book)){
		
    let newRowData = document.createElement("td");
    newRowData.textContent=value;
    newRow.append(newRowData);
    theTable.append(newRow);
  }
}

