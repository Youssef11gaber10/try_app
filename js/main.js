// * global elements and arrays and regex
var books = [];
var subBtn = document.querySelector('.sub');
var bookName = document.getElementById('name');
var bookUrl = document.getElementById('url');
var Delete = [];//araray of button delete
var Visit = [];//araray of button visit
var regName = /^[a-zA-z0-9]{3,}$/;
var regUrl = /^(ftp|http|https):\/\/[^ "]+$/;
// var regUrl = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
//todo expalin this symbols in regex

//* dispaly at first when refresh
if (localStorage.getItem('books') != null) {
    books = JSON.parse(localStorage.getItem('books'));
    displayBooks();
}
//* dispaly function
function displayBooks() {
    var collector = ``;
    for (var i = 0; i < books.length; i++) {
        collector +=
            `
        <tr>
        <td>${i + 1}</td>
        <td>${books[i].name}</td>
        <td><button value='${books[i].url}' class="btn btn-outline-success "><i class="fa-solid fa-eye pe-2"></i> Visit</button></td>
        <td><button class="btn btn-outline-danger" ><i class="fa-solid fa-trash-can"></i> Delete</button></td>
        </tr>
        `
    }
    document.getElementById('tb').innerHTML = collector;
    resetEventsDelete();
    resetEventsVisits();


}
//* functtion return inputs clear
function fillInputs(inp1, inp2) {
    bookName.value = inp1;
    bookUrl.value = inp2;
}
// * function submit
subBtn.addEventListener('click', function () {

    if (regName.test(bookName.value) && regUrl.test(bookUrl.value) && found(bookName.value) && found(bookUrl.value)) 
    {
        var bookObj =
        {
            name: bookName.value,
            url: bookUrl.value
        }

        books.unshift(bookObj);
        localStorage.setItem('books', JSON.stringify(books));
        displayBooks();
        fillInputs('', '');
        bookName.classList.remove('is-valid');
        bookUrl.classList.remove('is-valid');

    }

    else 
    {
        swal(
            {
            title: "Site Name or Url is not valid, Please follow the rules below :",
            text: `
            Site name must contain at least 3 characters.
            Site URL must be a valid one.
            you can't add same name or url to two rows.
            `,
            icon: "info",
            dangerMode: true,
            timer: 3000
          }
          );

        return;
    }


})

// function Delete(index)
// {
//     books.splice(index,1);
//     localStorage.setItem('books',JSON.stringify(books));
//     displayBooks();
// }
//  //!question how to do delete with addEvent listiner

// Delete = Array.from(document.querySelectorAll('.btn-outline-danger'));

// for (var i = 0; i < Delete.length; i++) {

//     Delete[i].addEventListener('click', function (e) {//the problem was i sent here (i) as param so its always being last numper of loop because i after looping that was taken when i call the func take i form his value it was the num that false the loop
//         DeleteItem(indexof(e.target));//so the second problem was resetting the events after delete  //bythway  the e was work but problem was in reset the events
//     })

// }

// todo Adding Click Event to All delete buttons every time we call display like we call it in onclick'Delete(${i})'
function resetEventsDelete() {
    Delete = Array.from(document.querySelectorAll('.btn-outline-danger'));// i always need to pick all elements because they change in crud i was sure that reset came from the diplay() with forloop
    for (var i = 0; i < Delete.length; i++) {

        Delete[i].addEventListener('click', function (e) {
            DeleteItem(e);
        })

    }

}
// todo Adding Click Event to All visit buttons every time we call display like we call it in onclick'Visit()'
function resetEventsVisits() {
    Visit = Array.from(document.querySelectorAll('.btn-outline-success'));
    for (var i = 0; i < Visit.length; i++) {
        Visit[i].addEventListener('click', function (e) {
            visitSite(e);
        })
    }
}

// *function delete item in arr depends on resetEventsDelete
function DeleteItem(event) {
    var index = Delete.indexOf(event.target)
    books.splice(index, 1);
    displayBooks();
    localStorage.setItem('books', JSON.stringify(books));
}

// *function visit site in arr depends on resetEventsVisits
function visitSite(event) {
    url = event.target.value
    // open(`https://${url}`)
    open(`${url}`);
}

// *validation in name input
bookName.addEventListener('keyup', function () {
    if(regName.test(bookName.value) && found(bookName.value) )
    {
        bookName.classList.replace('is-invalid','is-valid')
    }
    else
    {
        if(bookName.classList.contains('is-valid'))
        {

            bookName.classList.replace('is-valid','is-invalid');
        }
        else
        {
            bookName.classList.add('is-invalid');
        }
    }
})


// *validation in url input
bookUrl.addEventListener('keyup', function () {
    if(regUrl.test(bookUrl.value) && found(bookUrl.value))
    {
        bookUrl.classList.replace('is-invalid','is-valid')
    }
    else
    {
        if(bookUrl.classList.contains('is-valid'))
        {

            bookUrl.classList.replace('is-valid','is-invalid');
        }
        else
        {
            bookUrl.classList.add('is-invalid');
        }
    }
})

// * ths function check if the new added name or url it was in array before
function found(name)
{
    for(var i=0;i<books.length;i++)
    {
        if(name==books[i].name || name ==books[i].url)
        {
            return false;
        }
    }
    return true;
}






