const searchBook = () => {
    const errorMessageDiv = document.getElementById("error-message");
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    errorMessageDiv.textContent = '';
    document.getElementById("search-result").textContent = '';
    document.getElementById("message").textContent = '';
    document.getElementById("notAvailable").textContent = '';
    if (searchText.length > 0) {
        toggleSpinner('block');    // display spinner
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.docs, data.numFound));
    }
    else {
        errorMessageDiv.innerHTML = "<p class='text-center p-3 text-danger'><b>You haven't searched for anything.<br>Please search by book name.</b></p>";
    }

    searchField.value = '';
}


const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}

// display search result
const displaySearchResult = (books, totalBookFound) => {
    const totalDisplay = books.length;
    const totalFound = totalBookFound;
    const showBooksOutofTotal = document.getElementById('message');
    showBooksOutofTotal.innerText = `Show ${totalDisplay} books out of ${totalFound}`;
    const first12Books = books.slice(0, 12);
    const searchResult = document.getElementById('search-result');
    // clear previous search result
    document.getElementById("error-message").textContent = "";
    searchResult.textContent = '';
    if (books.length === 0) {
        displayWarning();
    }
    else {
        first12Books.forEach(doc => {
            const div = document.createElement('div');
            const imageUrl = `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`;
            div.classList.add('col');
            div.innerHTML = `
            <div class="card shadow rounded p-3 m-2">
                <img  class="img-fluid imgHeight rounded " alt="..."" src='${imageUrl}'>    
                <h3 class="card-title text-primary">${doc.title}</h3>
                <p class="card-title"><b>Author Name:</b> <i>${doc.author_name ? doc.author_name : ''}</i></p>
                <p class="card-text"><b>Publisher: </b>${doc.publisher ? doc.publisher : ''} </p>
                <p class="card-text"><b>First Publish: </b>${doc.first_publish_year ? doc.first_publish_year : ''}</p>
            </div>
            `;
            searchResult.appendChild(div);
        });
        toggleSpinner('none'); // hide spinner
    }
}
// when search did not match show warning
const displayWarning = () => {
    toggleSpinner('none'); // hide spinner
    document.getElementById("search-result").innerHTML = '';
    const notAvailableDiv = document.getElementById("notAvailable");
    notAvailableDiv.innerHTML = ` <div class=" m-auto p-5 bg-warning" style="width: 18rem">
        <h5 class="card-title">Dear Sir,</h5>
        <p class="card-text">
          Your search did not match any of our books. Please enter the correct name.
        </p>
      </div>`;
}

