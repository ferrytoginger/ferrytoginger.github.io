var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if(xhr.readyState === 4 && xhr.status === 200) {
    var employees = JSON.parse(xhr.responseText);
    var statusHTML = '<ul class="bulleted">';
    for (var i=0; i<employees.length; i += 1) {
      if (employees[i].inoffice === true) {
        statusHTML += '<li class="in">';
      } else {
        statusHTML += '<li class="out">';
      }
      statusHTML += employees[i].name;
      statusHTML += '</li>';
    }
    statusHTML += '</ul>';
    document.getElementById('employeeList').innerHTML = statusHTML;
  }
};
xhr.open('GET', '../data/employees.json');
xhr.send();


var roomXHR = new XMLHttpRequest();
roomXHR.onreadystatechange = function () {
  if(roomXHR.readyState === 4 && roomXHR.status === 200) {
    var rooms = JSON.parse(roomXHR.responseText);
    console.log(typeof rooms);
    var availabilityHTML = '<ul class="rooms">';
    for (var i=0; i<rooms.length; i += 1){
      if(rooms[i].available === true){
        availabilityHTML += '<li class="empty">';
      } else {
        availabilityHTML += '<li class="full">';
      }
    availabilityHTML += rooms[i].room;
    availabilityHTML += '</li>';
    }
    availabilityHTML += '</ul>';
    document.getElementById('roomList').innerHTML = availabilityHTML;
  }

}
roomXHR.open('GET', '../data/rooms.json');
roomXHR.send();