function readJSON('JSON/data.json') {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'JSON/data.json', true);
    xhr.responseType = 'blob';
    xhr.onload = function(e) {
      if (this.status == 200) {
          var file = new File([this.response], 'temp');
          var fileReader = new FileReader();
          fileReader.addEventListener('load', function(){
               //do stuff with fileReader.result
          });
          fileReader.readAsText(file);
      }
    }
    xhr.send();
}

console.log(data.title);
console.log(data.xaxis);
console.log(data.yaxis);
console.log(data.xvals[0]);
console.log(data.yvals[0]);


var title = null;
var xaxis = null;
var yaxis = null;
var xvals = new Array();
var yvals = new Array();

function getData() {
  title = document.getElementById("title").value;
  xaxis = document.getElementById("xaxis").value;
  yaxis = document.getElementById("yaxis").value;

  var temp = document.getElementById("xvals").value;
  var newVal = "";
  for(var i = 0; i < temp.length; i++){
    while(temp.charAt(i) != ',' && i < temp.length){
      newVal += (temp.charAt(i)).toString();
      i++;
    }
    xvals.push(Number(newVal));
    newVal = "";
  }

  temp = document.getElementById("yvals").value;
  newVal = "";
  for(var i = 0; i < temp.length; i++){
    while(temp.charAt(i) != ',' && i < temp.length){
      newVal += (temp.charAt(i)).toString();
      i++;
    }
    yvals.push(Number(newVal));
    newVal = "";
  }

var layout = {
title: title,
xaxis: {
  title: xaxis,
},
yaxis: {
  title: yaxis,
}
};

TESTER = document.getElementById('tester');
Plotly.newPlot(TESTER, [{
x: xvals,
y: yvals }], layout );
}

function resetData(){
Plotly.purge("tester");
}
