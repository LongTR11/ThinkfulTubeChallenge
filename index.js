const SEARCH_YOUTUBE_VIDEOS = "https://www.googleapis.com/youtube/v3/search";

function getDataFromApi(searchTerm, callback) {
    const settings = {
        url: SEARCH_YOUTUBE_VIDEOS,
        data: {
            part: 'snippet',
            key: "AIzaSyDvDUJoARAY5nYrzgb20NU1-CkcbUq-kpM",
            q: `${searchTerm}`
        },
        dataType: 'json',
        type: 'GET',
        success: callback
    };
    $.ajax(settings);
}

function renderResults(result) {
    return `
    <div>
        <img class='js-thumbnail-image' src='${result.snippet.thumbnails.medium.url}'/>
    </div>
    `;
}

function displayThumbnails(AJAXdata) {
    let results = AJAXdata.items.map(function (item) {
        return renderResults(item);
    });
    $('.js-search-results').html(results);
}

function watchSubmit() {
    $('.search-button').submit(event => {
        event.preventDefault();
        let queryTarget = $('#js-query');
        let query = queryTarget.val();
        queryTarget.val("");
        console.log(queryTarget);
        console.log(query);
        getDataFromApi(query, displayThumbnails);
    });
}
$(watchSubmit);



// \https://www.googleapis.com/youtube/v3/search?q=surfing&part=snippet&key=AIzaSyDvDUJoARAY5nYrzgb20NU1-CkcbUq-kpM