import YouTubeIframeLoader from 'youtube-iframe';
import Component from '../../common/js/component';
import {getDeviceType, listen, unlisten, Resize, nFindComponent} from '../../common/js/helpers';
import CanvasIndicate from '../canvas-indicate/canvas-indicate';

class Video extends Component {
    constructor(nRoot) {
        super(nRoot, 'video');
        this.bgWrapper = this.nFindSingle('bg-wrapper');
        this.button = this.nFindSingle('button');
        this.videoYT = this.nRoot.querySelector('.video__item_youtube');
        this.canvasIndicate = new CanvasIndicate(nFindComponent('canvas-indicate'), this.nRoot, '#fff');

        if (this.videoYT) {
            this.youtubeReady = this.youtubeReady.bind(this);
            this.onPlayerReady = this.onPlayerReady.bind(this);
            this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
            setTimeout(() => {
                this.youtubeReady(this.nRoot);
            }, 1);
        } else {
            this.videoPlay = this.videoPlay.bind(this);
            this.bgWrapper.addEventListener('click', this.videoPlay, false);
        }
        /* По-хорошему тут разрулить на девайсы */
        this.currentDevice = getDeviceType();
        this.afterResize = this.afterResize.bind(this);

        if (getDeviceType() === 'mobile') {
            this.initMobile();
        } else {
            this.initDesktop();
        }
        this.resize = new Resize();
        listen('deviceType:after-resize', this.afterResize);
    }

    hover() {
        this.canvasIndicate.hover();
    }

    leave() {
        this.canvasIndicate.leave();
    }

    initDesktop() {
        this.hover = this.hover.bind(this);
        this.nRoot.addEventListener('mouseover', this.hover);
        this.leave = this.leave.bind(this);
        this.nRoot.addEventListener('mouseout', this.leave);
    }

    initMobile() {

    }

    youtubeReady(item) {
        const video = item.querySelector('.video__item_youtube');
        const embed = video.getAttribute('data-embed');
        YouTubeIframeLoader.load((YT) => {
            this.player = new YT.Player(video.id ? video.id : video, {
                height: '100%',
                width: '100%',
                videoId: `${embed}`,
                playerVars: {
                    autoplay: 0,
                    rel: 0,
                    showinfo: 0,
                    controls: 0,
                    modestbranding: 1,
                },
                events: {
                    onReady: this.onPlayerReady,
                    onStateChange: this.onPlayerStateChange,
                },
            });
        });
    }

    onPlayerReady() {
        this.bgWrapper.addEventListener('click', () => {
            this.bgWrapper.classList.add('video__bg-wrapper_hide');
            this.button.classList.add('video__button_hide');
            this.player.playVideo();
        });
        this.button.addEventListener('click', () => {
            this.bgWrapper.classList.add('video__bg-wrapper_hide');
            this.button.classList.add('video__button_hide');
            this.player.playVideo();
        });
    }

    onPlayerStateChange(event) {
        if (event.data === YT.PlayerState.PLAYING) {
            this.nRoot.querySelector('.video__item_youtube').classList.add('video__item_active');
        }
        if (event.data === YT.PlayerState.PAUSED) {
            if (this.button.classList.contains('video__button_hide')) {
                this.button.classList.remove('video__button_hide');
                this.bgWrapper.classList.remove('video__bg-wrapper_hide');
                this.nRoot.querySelector('.video__item_youtube').classList.remove('video__item_active');
            }
        }
    }

    videoPlay() {
        this.videoInner = this.nFindSingle('item_inner');
        if (this.videoInner) {
            if (this.videoInner.paused) {
                this.videoInner.play();
                this.button.classList.add('video__button_hide');
            } else {
                this.videoInner.pause();
                this.button.classList.remove('video__button_hide');
            }
        }
    }

    pause() {
        this.videoInner = this.nFindSingle('item_inner');
        if (this.button.classList.contains('video__button_hide')) {
            this.button.classList.remove('video__button_hide');
        }
        if (this.videoInner) {
            this.videoInner.pause();
            this.videoInner.currentTime = 0;
        } else {
            this.player.stopVideo();
            this.bgWrapper.classList.remove('video__bg-wrapper_hide');
            this.nRoot.querySelector('.video__item_youtube').classList.remove('video__item_active');
        }
    }

    afterResize() {
        if (getDeviceType() !== this.currentDevice) {
            if (getDeviceType() === 'mobile') {
                this.destroyDesktop();
                this.initMobile();
            } else if (this.currentDevice === 'mobile') {
                this.destroyMobile();
                this.initDesktop();
            }
            this.currentDevice = getDeviceType();
        }
    }

    destroyDesktop() {
        this.nRoot.removeEventListener('mouseover', this.hover);
        this.nRoot.removeEventListener('mouseout', this.leave);
    }

    destroyMobile() {

    }

    destroy() {
        unlisten('deviceType:after-resize', this.afterResize);
        if (getDeviceType() === 'mobile') {
            this.destroyMobile();
        } else {
            this.destroyDesktop();
        }

        this.canvasIndicate.destroy();
        // this.player.destroy();
        if (!(this.videoYT)) {
            this.bgWrapper.removeEventListener('click', this.videoPlay, false);
        }
    }
}

export default Video;
