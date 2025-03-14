function dgEBI(el){return document.getElementById(el);}
function dcEsA(eType, attr) {
  var ele = document.createElement(eType);
  for (var p in attr) { ele.setAttribute(attr[p][0], attr[p][1]) };
  return ele;
}

const texa = dgEBI('texa');
const tbd = dgEBI('tbd');
const addbtn = dgEBI('addbtn');
const logReverse = dgEBI('logReverse');
const txtbxwid = dgEBI('txtbx-wid');
const opfile = dgEBI('opfile');
var dla = document.createElement('a');
const trcn2 = document.getElementById('tbd').getElementsByTagName('tr');

var tstamp;
var objURL = {};
objURL.uri = undefined;
objURL.existence = false;
var nts = [];
var cTSize = 50;
txtbxwid.value = cTSize;
var fReader = new FileReader();

fReader.onload = function () {
  texa.value = fReader.result;
};

function addToLog(gn) {
  var addText = dgEBI('lt'+gn).value;
  var lot = new Date();
  var alot = [lot.getFullYear(), String(lot.getMonth() + 1).padStart(2, '0'), String(lot.getDate()).padStart(2, '0'), String(lot.getHours()).padStart(2, '0'), String(lot.getMinutes()).padStart(2, '0'), String(lot.getSeconds()).padStart(2, '0'), String(lot.getMilliseconds()).padStart(3, '0')];
  var timestamp = '[' + alot[0] + '/' + alot[1] + '/' + alot[2] + ' ' + alot[3] + ':' + alot[4] + ':' + alot[5] + '.' + alot[6] + '] ';
  var lv = texa.value + '\n' + timestamp + addText;
  texa.value = lv;
  texa.scrollTop = texa.scrollHeight
}

function chboxwid(){
  cTSize = txtbxwid.value;
  for (n in nts){
    dgEBI('lt'+nts[n]).size = cTSize;
  }
}

function saveF() {
  saveblob = new Blob([texa.value], { 'type': 'text/plain', 'name': tstamp+'.txt' });
  dla.setAttribute('download', tstamp+'.txt');
  dla.setAttribute('target', '_blank');
  if (objURL.existence == true) { window.URL.revokeObjectURL(objURL.uri); }
  if (objURL.existence == false) { objURL.existence = true; }
  objURL.uri = window.URL.createObjectURL(saveblob);
  dla.setAttribute('href', objURL.uri);
  dla.click();
  dla = document.createElement('a');
  URL.revokeObjectURL(objURL.uri);
};

function delF(gn){
  tbd.removeChild(dgEBI('tr'+gn));
  nts = nts.filter(function (tgt) { return tgt != gn; });
}

opfile.addEventListener('change', function () {
  if (opfile.files.length != 0) {
    fReader.readAsText(opfile.files[0]);
  }
});

function clearF(){
  var lot0 = new Date();
  var alot = [
    lot0.getFullYear(), 
    String(lot0.getMonth() + 1).padStart(2, '0'), 
    String(lot0.getDate()).padStart(2, '0'), 
    String(lot0.getHours()).padStart(2, '0'), 
    String(lot0.getMinutes()).padStart(2, '0'), 
    String(lot0.getSeconds()).padStart(2, '0'), 
    String(lot0.getMilliseconds()).padStart(3, '0')
  ];
  timestamp = '[' + alot[0] + '/' + alot[1] + '/' + alot[2] + ' ' + alot[3] + ':' + alot[4] + ':' + alot[5] + '.' + alot[6]  + '] ';
  tstamp = alot[0] + alot[1] + alot[2] + 'T' + alot[3] +  alot[4] + alot[5];
  texa.value = timestamp + 'Ready.';
}

function addF(){
  let gNum;
  if (nts.length == 0){
    gNum = '0';
    nts.push(0);
  } else {
    gNum = String(nts[nts.length - 1] + 1);
    nts.push(nts[nts.length - 1] + 1);
  }

  var logbtn = dcEsA('button', [['type', 'button'], ['id', 'log'+gNum]]);
  logbtn.appendChild(document.createTextNode('［記録］'));
  var tdA = dcEsA('td', [['class', 'tcenter']]);
  tdA.appendChild(logbtn);

  var logtxt = dcEsA('input', [['id', 'lt'+gNum], ['type', 'text'], ['size', cTSize]]);
  var tdB = document.createElement('td');
  tdB.appendChild(logtxt);

  var delbtn = dcEsA('button', [['type', 'button'], ['id', 'del'+gNum]]);
  delbtn.appendChild(document.createTextNode('削除'));
  var tdC = dcEsA('td', [['class', 'tcenter']]);
  tdC.appendChild(delbtn);

  var tr = dcEsA('tr', [['id', 'tr'+gNum]]);
  tr.appendChild(tdA);
  tr.appendChild(tdB);
  tr.appendChild(tdC);
  tbd.appendChild(tr);
  logbtn.addEventListener('click', function () { addToLog(gNum) });
  delbtn.addEventListener('click', function () { delF(gNum) });
}

addbtn.addEventListener('click', addF);
clbtn.addEventListener('click', clearF);
txtbxwid.addEventListener('input', chboxwid);
savebtn.addEventListener('click', saveF);

clearF();