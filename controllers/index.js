"use strict"

/**
 * Index controllers. Redirect to /login
 */
exports.getIndex = function (req, res) { res.redirect('/login') };

exports.getQuack = function (req, res) { res.send( "__/-\\_\n\\__/\n" ) };


