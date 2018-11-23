import React, {Component} from 'react';


export default class Video extends Component {



    constructor(props) {
        super(props);
        // This binding is necessary to make `this` work in the callback
    }

    shouldComponentUpdate() {
        return false;
    }

    componentWillReceiveProps() {
      //  this.video.
    }

    componentDidMount() {

        var player = global.videojs('content_video');

        var onAdsManagerLoaded = function() {
            player.ima.addEventListener(global.google.ima.AdEvent.Type.LOADED,
                event => {
                    console.log('LOADED event');
                }
            );
        };

        var options = {
            id: 'content_video',
            adTagUrl: 'https://pubads.g.doubleclick.net/gampad/ads?iu=/21769261068/Volkan2&' +
                'description_url=test&env=vp&impl=s&correlator=&tfcd=0&npa=0&gdfp_req=1&output=vast&sz=640x480&unviewed_position_start=1',
            adsManagerLoadedCallback: onAdsManagerLoaded,
            adsRenderingSettings: {
                enablePreloading: true
            }
        };

        player.ima(options);

// Remove controls from the player on iPad to stop native controls from stealing
// our click
        var contentPlayer =  document.getElementById('content_video_html5_api');
        if ((navigator.userAgent.match(/iPad/i) ||
            navigator.userAgent.match(/Android/i)) &&
            contentPlayer.hasAttribute('controls')) {
            contentPlayer.removeAttribute('controls');
        }

// Initialize the ad container when the video player is clicked, but only the
// first time it's clicked.
        var startEvent = 'click';
        if (navigator.userAgent.match(/iPhone/i) ||
            navigator.userAgent.match(/iPad/i) ||
            navigator.userAgent.match(/Android/i)) {
            startEvent = 'touchend';
        }
        player.one(startEvent, function() {
            player.ima.initializeAdDisplayContainer();
        });
    }






    render(){
        return (
            <div id="video">


                <video id="content_video" className="video-js vjs-default-skin"
                       controls preload="auto" width="640" height="480">
                    <source src="http://techslides.com/demos/sample-videos/small.mp4" type="video/mp4"></source>

                </video>

            </div>
        );
    }
}