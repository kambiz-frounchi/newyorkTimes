var apiKey = "hMqJTYfIP98xJwFPzIw1RLpms46eRL0Q";

/*
searchTerm
numRecords
startYear
endYear
searchBtn
clearBtn
topArticles
*/

$("#searchButton").on("click", function () {

//$(document).ready(function() {
    var query = $("#search").val();
    var beginDate = $("#startYear").val() + "0101";
    var endDate = $("#endYear").val() + "1231";
    var numRecords = $("#numRecords").val();

    query = "covid";
    beginDate = "20150101";
    endDate = "20201231";

    var queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${apiKey}&q=${query}&begin-data=${beginDate}&end-date=${endDate}`;

    var articles, articlesToShow, numPages;

    $.ajax({url: queryURL, method: "GET"}).then ( function (response) {
        console.log(response);
        articles = response.response.docs;
        articlesToShow = Math.min(response.response.meta.hits, numRecords);
        console.log(articlesToShow);
        numPages = Math.max(Math.abs(articlesToShow / 10), 1);

        for (var page = 0; page < numPages; page++) {
            queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${apiKey}&q=${query}&begin-data=${beginDate}&end-date=${endDate}&page=${page}`;
    
            $.ajax({url: queryURL, method: "GET"}).then ( function (response) {
                console.log(response);
            
                response.docs.forEach(function (item) {
                    console.log(item);
                    var article = $("<div>").addClass("card-body");
                    var articleTitle = $("<h5>").addClass("card-title").text("something");
                    var articleText = $("<p>").addClass("card-text").text("something");
                    
                    article.append(articleTitle, articleText);
                //$("#topArticles").append(article);
                    $("body").append(article);
               });
            });
        }
    });
});
