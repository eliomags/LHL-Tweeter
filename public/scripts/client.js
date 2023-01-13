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
      // calls createTweetElement for each tweet
      let $tweet = createTweetElement(tweets[i]);
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
          <div class="date">${tweet.created_at}</div>
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

});