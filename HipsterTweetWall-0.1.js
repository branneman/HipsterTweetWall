/**
 * HipsterTweetWall
 *
 * Version: 0.1-alpha (25-09-2012)
 *
 * Contributers:
 *   - Bran van der Meer <branmovic@gmail.com>
 *
 * License:
 *   GNU General Public License, version 3 (GPL-3.0)
 *   http://www.opensource.org/licenses/gpl-3.0.html 
 */
var HipsterTweetWall = new function() {

    var $reference,
        api = {},
        config = {
            'search':         '@cnn',
            'totalTweets':    4,
            'includeRTs':     false,
            'speed':          20000,
            'updateInterval': 5000,
            'font-size':      '36px',
            'tweetHtml':      '<div><span class="avatar"></span><span class="user">@[user]</span><span class="tweet">[tweet]</span><span class="date">[date]</span></div>'
        };

    // Check whether the html for the component is found, then bootstrap it
    api.init = function(configParams) {

        // Initialize component
        var components = $('[data-component="HipsterTweetWall"]');
        if (components.length !== 1) {
            return;
        }
        $reference = $(components[0]);

        // Override config settings when url parameters or configParams is passed along
        readConfig(configParams);

        // Start grabbing tweets, then start animation
        loadTweets();

        // Update tweets
        if (config.updateInterval) {
            setInterval(loadTweets, config.updateInterval);
        }
    };

    // Update local config with url parameters and/or passed configParams
    var readConfig = function(configParams) {

        // Check for URL parameters
        if (window.location.hash.length) {
            var params = window.location.hash.substring(1).split('&');
            $.each(params, function(i, param) {
                param = param.split('=');
                if (config[param[0]] !== undefined) {
                    config[param[0]] = param[1];
                }
            });
        }

        // Reload the page when the url parameters change
        $(window).on('hashchange', function() {
            window.location.reload();
        });

        // Check for configParams
        if (configParams != undefined) {
            $.each(configParams, function(key, value) {
                if (config[key] !== undefined) {
                    config[key] = value;
                }
            });
        }
    };

    // Start CSS animations for all the tweet elements
    var startAnimation = function() {
        $reference.children().each(function(index) {
            var $element = $(this),
                duration = config.speed + 'ms',
                interval = (config.speed / config.totalTweets) * index;
            $element.css({
                '-webkit-animation-duration': duration,
                   '-moz-animation-duration': duration,
                        'animation-duration': duration,
                'font-size': config['font-size']
            });
            setTimeout(function() {
                $element.addClass('running');
            }, interval);
        });
    };

    // Grab latest tweets
    var loadTweets = function() {

        // Build url for Twitter REST API request, expecting a JSONP response
        var url = 
            'http://search.twitter.com/search.json?q=' + config.search +
            (config.includeRTs ? '' : '+exclude:retweets') +
            '&rpp=' + config.totalTweets +
            '&include_entities=true&result_type=recent&callback=?';

        // Execute request, add tweet elements and start the animation
        $.getJSON(url, function(data) {
            $.each(data.results, placeTweet);
            startAnimation();
        });
    };

    // Put a single tweet on the wall
    var placeTweet = function(index, tweet) {

        // Format date string
        var dateObject = new Date(tweet.created_at),
            months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            dateString =
                ('0' + dateObject.getHours()).slice(-2) + ':' +
                ('0' + dateObject.getMinutes()).slice(-2) + ' - ' +
                ('0' + dateObject.getDate()).slice(-2) + ' ' +
                months[dateObject.getMonth()] + ' &#39;' +
                (dateObject.getFullYear() + '').substring(2);

        // Build tweet html
        var tweetHtml = config.tweetHtml
        	.replace('[user]',  tweet.from_user)
        	.replace('[tweet]', tweet.text)
        	.replace('[date]',  dateString);

        // Check whether a tweet on the current index already exists
        var node = $reference.children('[data-index=' + index + ']');

        // Create new element when a tweet on the current index does not exist yet
        if (!node.length) {
            tweetHtml = '<div class="tweet-container" data-index="' + index + '">' + tweetHtml + '</div>';
            $reference.append(tweetHtml);
        }

        // Queue the tweet on the current index to be replaced when it's css animation iteration is finished
        if (node.length) {
            var animationIteration = function() {
                node.html(tweetHtml);
                node.off('webkitAnimationIteration');
                node.off('animationiteration');
            };
            node.on('webkitAnimationIteration', animationIteration);
            node.on('animationiteration', animationIteration);
        }

		// Queue the image for loading in the background
        // @todo implement
		//addToBackgroundImageQueue(tweet.entities.urls[0].expanded_url);

    };

	// Add a image url to the backgroundImageQueue when it's not already there
    // @todo implement
	var backgroundImageQueue = [];
	var addToBackgroundImageQueue = function(url) {
		if ($.inArray(url, backgroundImageQueue) === -1) {
			backgroundImageQueue.push(url);
		}
	};

    // Grab a background image referenced in a tweet
    var updateBackgroundImage = function() {
        // @todo implement
    };

    return api;
};