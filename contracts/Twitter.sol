// SPDX-License-Identifier: Unlicense OR MIT
pragma solidity ^0.8.0;

contract Twitter {
  struct Tweets {
    uint id;
    string tweet;
    address author;
    uint timestamp;
    uint likes;
    mapping (address => bool) likedBy;
    Comment[] comments;
  }

  struct Comment {
    uint id;
    string comment;
    address author;
    uint timestamp;
  }

  Tweets[] public tweets;
  uint public nextTweetId = 0;
  mapping(address => uint[]) public userTweets;

  modifier hasLiked(uint _id) {
    Tweets storage tweet = tweets[_id];
    require(tweet.likedBy[msg.sender] == true);
    _;
  }

  modifier hasNotLiked(uint _id) {
    Tweets storage tweet = tweets[_id];
    require(tweet.likedBy[msg.sender] == false);
    _;
  }

  function createTweet(string memory _tweet) public {
    Tweets storage tweet = tweets[nextTweetId];
    tweet.id = nextTweetId;
    tweet.tweet = _tweet;
    tweet.author = msg.sender;
    tweet.timestamp = block.timestamp;
    tweet.likes = 0;
    userTweets[msg.sender].push(nextTweetId);
    nextTweetId++;
  }

  function likeTweet(uint _id) external hasNotLiked(_id)  {
    Tweets storage tweet = tweets[_id];
    tweet.likedBy[msg.sender] = true;
    tweet.likes++;
  }

  function unlikeTweet(uint _id) external hasLiked(_id) {
    Tweets storage tweet = tweets[_id];
    tweet.likedBy[msg.sender] = false;
    tweet.likes--;
  }

  function addComment(string memory _comment, uint _id) public {
    Tweets storage tweet = tweets[_id];
    Comment storage comment = tweet.comments[tweet.comments.length];
    comment.comment = _comment;
    comment.author = msg.sender;
    comment.timestamp = block.timestamp;
    comment.id = tweet.comments.length;
  }
}
