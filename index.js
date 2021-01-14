var fs = require('fs');
const {shell} = require('electron');
const express = require('express');
const app = express();
const port = 3000;
const home = require('os').homedir();
var os = require('os');
var ifaces = os.networkInterfaces();
const homedir =  home + '/Documents' + '/WebCast/';
if (!fs.existsSync(homedir)) {
      fs.mkdirSync(homedir);
    }
app.use(express.static(homedir));
var con = '<!DOCTYPE html><html><title>WebDesktop</title><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"><body><h3>Site Map:</h3><ul>';
  files = fs.readdirSync(homedir);
  for (i = 0; i < files.length; i++) {
      if (fs.existsSync(homedir + files[i])) {
        file = fs.readFileSync(homedir + files[i]);
        //document.getElementById("files").innerHTML += '<li>' + files[i] +'</li>';
        con += '<li><a href="' + encodeURIComponent(files[i]) + '">' + files[i] +'</a></li>';
      }
  }
  //document.getElementById("files").innerHTML += '</ul>';
  con += '</ul></body></html>';
app.get('/', (req, res) => {
  res.send(con)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
$("#cast").click(function(){
    shell.openPath(homedir);
  });
 Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function (iface) {
  if ('IPv4' !== iface.family || iface.internal !== false) {
  // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
  return;
  }
  var myIP = "";
  var cmyIP = "";
  var amyIP = "";
  if (alias >= 1) {
  // this single interface has multiple ipv4 addresses
  cmyIP += '<p><b>Cast: </b><u><i><a href="http://' + iface.address + ':3000">' + iface.address + ':3000</a></i></u></p>';
  } else {
  // this interface has only one ipv4 adress
  cmyIP += '<p><b>Cast: </b><u><i><a href="http://' + iface.address + ':3000" target="_blank">' + iface.address + ':3000</a></i></u></p>';
  }
  ++alias;
  document.getElementById("cmyip").innerHTML = cmyIP;
  });
  //document.getElementById("myip").innerHTML = myIP;
  });
