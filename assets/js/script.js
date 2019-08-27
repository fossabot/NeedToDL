var fs = require('fs');
var ytdl = require('ytdl-core');
var mkdirp = require('mkdirp');
var testurl = "http://www.youtube.com/watch?v=A02s8omM_hI";


function submit() {
    var link = document.getElementById('ytlink').value
    var log = document.getElementById('log');
    if (!fs.existsSync("./videos")) {
        mkdirp('./videos', function(err) {});
    }
    ytdl(testurl, { filter: (format) => format.container === 'mp4' })
        .pipe(fs.createWriteStream('./videos/video.mp4'));


    //ytinfo(testurl);

}

function ytinfo(id) {
    var validate = ytdl.validateURL(testurl)
    if (validate != true) return alert("Not valid URL")
}

function printit(s) {
    log.innerHTML += s + '<br>';
}