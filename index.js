'use strict';
var rewriter = require('rev-rewriter');
var xtend = require('xtend');
module.exports = function (revMap, contents, noMediaQueries) {
    return rewriter(xtend({
        revMap: revMap,
        assetPathPrefix: '/',
        revPost: function (p, rewritten) {
            return !rewritten || p[0] !== '/' ? '/' + p : p;
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
