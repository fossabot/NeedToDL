var fs = require('fs');
var ytdl = require('ytdl-core');
var mkdirp = require('mkdirp');
const homedir = require('os').homedir().replace(/\\/g, "/");


function submit() {
    var link = document.getElementById('ytlink').value
    var log = document.getElementById('log');
    var format = document.getElementById('mpsel').selectedIndex
    var dl = document.getElementById('dlsel').selectedIndex
    if (!fs.existsSync("./dl")) {
        mkdirp('./dl', function(err) { if (err != null) return alert(err) });
    }
    if (dl == "0") {
        ytinfo(link, format);
    } else if (dl == "1") {
        dlsptf(link)
    }

}

function ytinfo(url, format) {
    var validate = ytdl.validateURL(url)
    if (validate != true) return alert("Not valid URL")
    ytdl.getInfo(url, (err, info) => {
        if (err) return alert(err);
        console.log(info)
        downloadYT(info, url, format)
    })

}

function dlsptf(link) {
    return ("not working yet")
}

function downloadYT(info, url, format) {
    var author = info.author.name.split(' ').join('_')
    var title = info.title.split(' ').join('_')
    if (format == "0") {

        ytdl(url, { filter: (format) => format.container === "mp4" })
            .pipe(fs.createWriteStream(`./dl/${author}-${title}.mp4`));
    } else if (format == "1") {
        //a
        ytdl(url, { filter: "audioonly" })
            .pipe(fs.createWriteStream(`./dl/${author}-${title}.webm`));

    }
}



function printit(s) {
    var log = document.getElementById('log');

    log.innerHTML += s + '<br>';
}