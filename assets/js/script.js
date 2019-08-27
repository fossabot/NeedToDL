function submit() {
    var link = document.getElementById('ytlink').value
    var log = document.getElementById('log');

    printit(link)

}

function printit(s) {
    log.innerHTML += s + '<br>';
}