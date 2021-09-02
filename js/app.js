const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);

    // clear data
    searchField.value = '';
    if (searchText == '') {
        // please write something to display
        console.log('search any food item');
    }
    else {
        // load data
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.docs));
    }

}

const displaySearchResult = docs => {
    const searchResult = document.getElementById('search-result');
    // clear previous search result
    searchResult.textContent = '';

    docs.forEach(doc => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h3 class="card-title text-primary">${doc.title}</h3>
                <p class="card-title"><b>Author Name:</b> <i>${doc.author_name ? doc.author_name : ''}</i></p>
                <p class="card-text"><b>Publisher: </b>${doc.publisher ? doc.publisher : ''} </p>
                <p class="card-text"><b>First Publish: </b>${doc.first_publish_year ? doc.first_publish_year : ''}</p>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
    });
}