/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]


$(document).ready(function() {
  
  const renderTweets = function(tweets) {
    // loops through tweets
    for (let i = 0; i < tweets.length; i++) {
      let tweet = tweets[i];
      // let timeAgo = timeago.fotmat(tweet.created_at);
      // calls createTweetElement for each tweet
      let $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      
      // console.log($tweet);
      $('#tweets-container').append($tweet);
    }
  }
  
  const createTweetElement = function(tweet) {
    let $tweet = 
    `<article class="tweet">
    <header class="tweet-header">
    <div class="img-name">
    <img src="${tweet.user.avatars}" alt="profile image">
    <span>${tweet.user.name}</span>
    </div>
          <span>${tweet.user.handle}</span>
        </header>
        <p>${tweet.content.text}</p>
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
}

renderTweets(data);

$("form").submit(function(event) {
  event.preventDefault();
  let text = $("#tweet-text").val();
  if (text === "" || text === null) {
  alert("Please enter a tweet before submitting.");
  } else if (text.length > 140) {
  alert("Your tweet is too long. Please limit it to 140 characters.");
  } else {
  let formData = $(this).serialize();
  $.ajax({
  type: "POST",
  url: "/tweets",
  data: formData,
  success: function(response) {
  console.log(response);
  },
  error: function(error) {
  console.log(error);
  }
  });
  $("#tweet-text").val("");
  }
  });

function loadTweets() {
  $.get("/tweets", function(data) {
      console.log(data);
  });
}

});