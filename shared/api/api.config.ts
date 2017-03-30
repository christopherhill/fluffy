'use strict';

const h = window.location.hostname;
const r = window.location.protocol;
const p = window.location.pathname;
const t = window.location.port;

let root = '';

if (t) {
    root = `${r}//${h}:${t}`;
} else {
    root = `${r}//${h}`;
}

var environments = {
    'devenv' : 'DEV',
    'prodenv' : 'PROD'
}

const localAPI = {
    enabled: window.location.hostname.indexOf('localhost') >= 0,
    path: `${r}//${h}:8080/${process.env.API_URL}/` // webpack
};

export const ENV = {
    environment: environments[h] ? environments[h] : 'LOCAL',
    serverUrl: localAPI.enabled ? localAPI.path : `${root}/${process.env.API_URL}/`
};