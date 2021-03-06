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
  mapping(address => uint[]) userTweets;

  event NewTweet(address author, uint id, string tweet, uint timestamp);
  event NewComment(address author, uint id, string comment, uint timestamp);

  constructor() payable {}

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

  function createTweet(string memory _tweet) public payable {
    Tweets storage tweet = tweets.push();
    tweet.id = nextTweetId;
    tweet.tweet = _tweet;
    tweet.author = msg.sender;
    tweet.timestamp = block.timestamp;
    tweet.likes = 0;
    userTweets[msg.sender].push(nextTweetId);
    nextTweetId++;
    emit NewTweet(msg.sender, nextTweetId, _tweet, block.timestamp);
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

  function addComment(string memory _comment, uint _id) public payable {
    Tweets storage tweet = tweets[_id];
    uint commentId = tweet.comments.length;
    Comment storage comment = tweet.comments.push();
    comment.comment = _comment;
    comment.author = msg.sender;
    comment.timestamp = block.timestamp;
    comment.id = commentId;
    emit NewComment(msg.sender, commentId, _comment, block.timestamp);
  }

  function getUserTweets(address _user) public view returns (uint[] memory) {
    return userTweets[_user];
  }

  function getTweetComments(uint _id) public view returns (Comment[] memory) {
    return tweets[_id].comments;
  }

  function getTweetLength() public view returns (uint) {
    return tweets.length;
  }

  function getLikedByTweet(uint _id) public view returns (bool) {
    return tweets[_id].likedBy[msg.sender];
  }
}
