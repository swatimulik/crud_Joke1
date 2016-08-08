
// /public/main.js



var index;

var del = document.getElementById('delet');
var up = document.getElementById('updat');


del.addEventListener('click', function () {
	//console.log("javascript delete main.js");
	var del_text1 = document.getElementById("del_text").value;
	//console.log("del_text1"+del_text1);
	fetch('jokes', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'setup': del_text1})
  }).then(function (response) {
	  //console.log("successful fetch");
 window.location.reload();
 })
	
});


up.addEventListener('click', function () {
	//console.log("javascript update main.js");
	var old_text1 = document.getElementById("old_text").value;
	var new_set= document.getElementById("new_setup").value;
	var new_punch = document.getElementById("new_punchline").value;
	//console.log("del_text1"+old_text1+"new_set"+new_set+"nre_punch"+new_punch);
	fetch('jokes', {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'setup': old_text1,
	  'setup1': new_set,
	  'punchline1': new_punch
	  
	  })
  }).then(function (response) {
	  //console.log("successful fetch");
 window.location.reload();
  })
	
});
	
