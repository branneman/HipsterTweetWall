# HipsterTweetWall

## Examples
   * Simple example wall: [`#search=fronteers`](http://branneman.github.com/HipsterTweetWall/#search=fronteers)
   * Simple example wall, with complex query: [`#search=fronteers+OR+fronteers12`](http://branneman.github.com/HipsterTweetWall/#search=fronteers+OR+fronteers12)
   * Simple example wall, with speed: [`#search=fronteers&speed=10000`](http://branneman.github.com/HipsterTweetWall/#search=fronteers&speed=10000)

## Features
   * Makes use of CSS3 animations, see [supported browsers](http://caniuse.com/#feat=css-animation).
   * Add config parameters in the url after the hash.
   * Add config parameters while calling `OpenTweetWall.init()`, example:  
     `OpenTweetWall.init({'search': 'fronteers', 'speed': 10000});`
   * 2 Versions: Hosted on github and downloadable for self-hosting.

## Config parameters
   * `search` _string_  
     The twitter search string, default `'@cnn'`
   * `totalTweets` _integer_  
     Number of maximum tweets that will be on screen at the same time, default 4.
   * `includeRTs` _boolean_  
     Whether retweets will be included with the `'RT '` prefix.
   * `speed` _integer_  
     Number of milliseconds it will take a single tweet to reach the top, default 20000 (20 sec).
   * `updateInterval` _integer_ or _boolean_ `false`  
     Number of milliseconds after which twitter will be polled for new tweets, false for no updates. Default 5000 (5 sec). See [Twitter Rate limits](https://dev.twitter.com/docs/rate-limiting).
   * `font-size` _string_  
     CSS font-size declaration, default `36px`.
   * `tweetHtml` _string_  
     HTML template for a single tweet, available variables are: `[user]` `[tweet]` `[date]`