// Escape Function to prevent XSS
const escapeF = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

$(document).ready(function () {
  function loadTweets() {
    $.get("/tweets", function (data) {
      renderTweets(data);
    });
  }
  loadTweets();

  $("form").submit(function (event) {
    event.preventDefault();
    let text = $("#tweet-text").val();
    if (text === "" || text === null) {
      $("#error-msg").html(
        "<i class='fas fa-exclamation-triangle'></i>Please enter a tweet before submitting!<i class='fas fa-exclamation-triangle'></i>"
      );
      $("#error-msg").slideDown();
      return;
    }
    if (text.length > 140) {
      return;
    }
    let formData = $(this).serialize();
    $.ajax({
      method: "POST",
      type: "application/json",
      url: "/tweets",
      data: formData,
      success: function (response) {
        $("#tweet-text").val("");
        $(".counter").val(140);
        $.get("/tweets", (res) => {
          renderTweets(res.slice(-1));
        });
      },
      error: function (error) {
        console.log(error);
      },
    });
  });
});
const renderTweets = function (tweets) {
  // loops through tweets
  for (let i = 0; i < tweets.length; i++) {
    let tweet = tweets[i];
    // calls createTweetElement for each tweet
    let $tweet = createTweetElement(tweet);
    // takes return value and appends it to the tweets container

    $("#tweets-container").prepend($tweet);
  }
};

const createTweetElement = function (tweet) {
  let $tweet = `<article class="tweet">
      <header class="tweet-header">
      <div class="img-name">
      <img src="${tweet.user.avatars}" alt="profile image">
      <span>${tweet.user.name}</span>
      </div>
            <span>${tweet.user.handle}</span>
          </header>
          <p>${escapeF(tweet.content.text)}</p>
          <hr>
          <footer>
            <div class="date">${timeago.format(tweet.created_at)}</div>
            <div class="action">
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i>
            </div>
          </footer>
        </article>`;
  return $tweet;
};
