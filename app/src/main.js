// ///////////////////////////////////////////////////////////
// 3D Cube ///////////////////////////////////////////////////
// http://michaelgaio.com/lab/famous/cube/
// ///////////////////////////////////////////////////////////
define(function(require, exports, module) {
    'use strict';
    // import dependencies
    var Engine = require('famous/core/Engine');
    var Modifier = require('famous/core/Modifier');
    // var StateModifier = require('famous/modifiers/StateModifier');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var Timer = require('famous/utilities/Timer');
    //
    var convert = Math.PI/180;
    var matrix=[];
    var rot;
    var rotate = [
        [0, 0, 0],
        [0, 90, 0],
        [0, -90, 0],
        [0, 0, 0],
        [90, 0, 0],
        [-90, 0, 0]
    ];
    var size = 100;
    var xlate = [
        [0, 0, size],
        [size, 0, 0],
        [-size, 0, 0],
        [0, 0, -size],
        [0, size, 0],
        [0, -size, 0]
    ];
    var xlt;
    var rotationY = 0;
    var rotationZ = 0;
    var matrix2;
    var colors = ['red', 'blue', 'violet', 'green', 'yellow', 'aqua'];
    var _surface = [];
    var _smod = [];
    //
	// CREATE CONTEXT ////////////////////////////////
    var _ctx = Engine.createContext();
    _ctx.setPerspective(500);
    for (var i = 0; i < colors.length; i++) {
        _surface[i] = new Surface({
            size: [size*2, size*2],
            properties: {
                backgroundColor: colors[i],
                opacity: 0.9
            }
        });
        _surface[i].addClass('backfaceVisibility');
        _smod[i] = new Modifier({
            origin: [0.5, 0.5]
        });
        _ctx.add(_smod[i]).add(_surface[i]);
    }
    //
    // ORIGINAL CUBE ////////////////////////////////
    function originalCube() {
        for (var i = 0; i < 6; i++) {
            xlt = xlate[i];
            rot = rotate[i];
            matrix.push(Transform.multiply(
            Transform.translate(xlt[0], xlt[1], xlt[2]),
            Transform.rotate(rot[0]*convert, rot[1]*convert, rot[2]*convert)));
            _smod[i].setTransform(
            matrix[i], {
                duration:0
            });
        }
    }
    //
    // ROTATE /////////////////////////////////////
    function callback() {
        rotationY += 0.1;
        rotationZ += 0.2;
    }
    function rotateCube() {
        for (var i = 0; i < colors.length; i++) {
            xlt = xlate[i];
            rot = rotate[i];
            matrix2 = Transform.rotate(0, rotationY * convert, rotationZ * convert);
            matrix2 = Transform.multiply(matrix2, matrix[i]);
            _smod[i].setTransform(matrix2, {duration: 0}, callback);
        }
    }
    originalCube();
    Timer.setInterval(rotateCube, 20);
});
