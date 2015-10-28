'use strict';
var rewriter = require('rev-rewriter');
var xtend = require('xtend');
var cdnDomain = require('config').cdnDomain;
module.exports = function (revMap, contents, noMediaQueries) {
    return rewriter(xtend({
        revMap: revMap,
        assetPathPrefix: '/',
        revPost: function (p, rewritten) {
            if (!rewritten) {
                return '/' + p;
            }
            var url = p[0] !== '/' ? '/' + p : p;
            if (typeof cdnDomain === 'string') {
                url = '//' + cdnDomain.replace(/^(https?)?\/+|\/+$/i, '') + url;
            }
            return url;
        }
    }, noMediaQueries ? {
        revPre: function (p) {
            var match = p.match(/(\.nmq)?\.css$/);
            if (match && !match[1]) {
                return p.replace(/\.css$/, '.nmq.css');
            } else {
                return p;
            }
        }
    } : {}), contents);
};
