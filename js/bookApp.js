var table =document.getElementById('table-body');
var bookList = [];

var submitButton = document.getElementById('btn-submit');
submitButton.addEventListener("click", function(e){
    e.preventDefault();
    
    var title = document.getElementById('bookTitle');
    var author = document.getElementById('author');
    var isbn = document.getElementById('isbn');

    var titleText = title.value;
    var authorText = author.value;
    var isbnText = isbn.value;

    if(titleText == "" || authorText == "" || isbnText == ""){
        alertMessage("unsuccesfull");
    }   
    else{
        saveLocalStorage(titleText,authorText,isbnText);
        addRowTable();
        alertMessage("succesfull");

        title.value = "";
        author.value = "";
        isbn.value = "";
    }
});

function alertMessage(type){
    if(type == "succesfull"){
        var alert = document.createElement('p');
        alert.setAttribute("class", "alertMessage-successful");
        alert.textContent = "Book added";
        var alertDiv = document.getElementById('alertDiv');
        alertDiv.appendChild(alert);
        setTimeout(function(){
            alertDiv.removeChild(alert)
        },3000);
    }
    else if(type == "delete"){
        var alert = document.createElement('p');
        alert.setAttribute("class", "alertMessage-successful");
        alert.textContent = "Book Removed!";
        var alertDiv = document.getElementById('alertDiv');
        alertDiv.appendChild(alert);
        setTimeout(function(){
            alertDiv.removeChild(alert)
        },3000);
    }

    else if(type == "unsuccesfull"){
        var alert = document.createElement('p');
        alert.setAttribute("class", "alertMessage-unsuccessful");
        alert.textContent = "Please fill in all fields";
        var alertDiv = document.getElementById('alertDiv');
        alertDiv.appendChild(alert);
        setTimeout(function(){
            alertDiv.removeChild(alert)
        },3000);
    }
}

function saveLocalStorage(_title,_author, _isbn) {
    var data = {
        "title": _title,
        "author": _author,
        "isbn": _isbn
    };
    
    var jsonData = JSON.stringify(data);
    
    bookList.push(jsonData);
    localStorage.setItem('data', JSON.stringify(bookList));
}

function addRowTable() {
    table.innerHTML = '';
    for(var i = 0; i < bookList.length; i++){
        var jsonData = bookList[i];
        var data = JSON.parse(jsonData);

        var newRow = document.createElement('tr');
    
        var newTitle = document.createElement('td');
        var newAuthor = document.createElement('td');
        var newIsbn = document.createElement('td');
        var deleteIcon = document.createElement('td');

        deleteIcon.setAttribute("id","delete-button")
        
        newTitle.textContent = data.title;
        newAuthor.textContent = data.author;
        newIsbn.textContent = data.isbn;
        deleteIcon.textContent = "X";

        deleteIcon.addEventListener('click', function(e) {
            var row = e.target.parentNode;
            var index = Array.prototype.indexOf.call(row.parentNode.children, row);
            deleteRow(row, index);
        });

        newRow.appendChild(newTitle);
        newRow.appendChild(newAuthor);
        newRow.appendChild(newIsbn);
        newRow.appendChild(deleteIcon);
        
        table.appendChild(newRow);
    }

}

window.addEventListener('load', function() {
    var existingData = localStorage.getItem('data');
    
    if (existingData) {
      bookList = JSON.parse(existingData);
      addRowTable();
    }
});

function deleteRow(row, index) {
    row.parentNode.removeChild(row);

    if (index > -1) {
      bookList.splice(index, 1);
      localStorage.setItem('data', JSON.stringify(bookList));
    }
    alertMessage("delete");
}


       
 
    

