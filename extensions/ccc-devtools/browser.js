"use strict";

const exec = require('child_process').exec;

function execCommond(command, cb) {
    exec(command, function (err, stdout, stderr) {
        if (err !== null) {
            cb(new Error(err));
        } else if (typeof (stderr) != "string") {
            cb(new Error(stderr));
        } else {
            cb(null);
        }
    });
}

exports.methods = {
    install() {
        const command = `cd ${Editor.Project.path} && git clone -b v3.0.0 https://github.com/potato47/ccc-devtools.git preview-template`;
        console.log('正在安装ccc-devtools...');
        execCommond(command, (err) => {
            if (err !== null) {
                console.error(err);
            } else {
                console.log('ccc-devtools 安装成功!');
            }
        });
    },
    uninstall() {
        const command = `cd ${Editor.Project.path} && rm -rf preview-template`;
        console.log('正在卸载ccc-devtools...');
        execCommond(command, (err) => {
            if (err !== null) {
                console.error(err);
            } else {
                console.log('ccc-devtools 卸载成功!');
            }
        });
    },
    home() {
        execCommond('open https://github.com/potato47/ccc-devtools');
    }
};

exports.load = function () {

};

exports.unload = function () {

};
