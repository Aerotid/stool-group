import '../css/common.css';
import '../scss/common.scss';
import 'objectFitPolyfill';
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/carousel';
import 'bootstrap/js/dist/tab';
import 'babel-polyfill';
import './barbaInit';
import 'element-closest/browser';
import { isEdge, isIE, nGetBody } from './helpers';
// import $ from 'jquery/dist/jquery.min';

if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
}

function requireAll(r) {
    r.keys().forEach(r);
}

if (isIE() || isEdge()) {
    nGetBody().classList.add('is-ie');
}

requireAll(require.context('../../components/', true, /\.svg$/));
requireAll(require.context('../icons/', true, /\.svg$/));

window.addEventListener('resize', objectFitPolyfill);
