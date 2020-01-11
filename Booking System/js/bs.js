
//saves booking
function save(bookingId, data) {
      localStorage.setItem(bookingId, data); // saves booking
}

// retrieves booking for user to view
function findBookings() {
      var key = document.getElementById('findBooking').value;
      var text = localStorage.getItem(key);
      if (text == null) {
          document.getElementById("findMessage").innerHTML = "Your booking was not found!!!";
      } else {
          document.getElementById("findMessage").innerHTML = text;
}}

//deletes booking
function deleteBookings() {
      var key = document.getElementById('deleteBooking').value;
      check = localStorage.getItem(key);
      if (check == null) {
          document.getElementById("delMessage").innerHTML = "Your booking was not found!!!";
      } else {
        localStorage.removeItem(key);
        document.getElementById("delMessage").innerHTML = "Booking has been deleted!!!"
      }
}

//displays booking
function viewBooking(){
      displayList = [];
      num = 0;
      localStorageData = [];
    	for (var item in localStorage) {
    		localStorageData.push(localStorage[item]);
        data = localStorageData[num];
        data = data.toString().split(",");
        num++;
        for(i in data){
          res = data[i].split(":").pop();
          displayList.push(res);
}}

      var body = document.getElementById("bookingTable");
      var table = document.createElement("table");
      table.className = "table table-bordered"
      var tableBody = document.createElement("tbody");

      num = 0;
      for (var r = 0; r < localStorage.length - 2; r++) {
        var row = document.createElement("tr");
        for(var i = 0; i < 8; i++){

          var cell = document.createElement("td");
          var cellText = document.createTextNode(displayList[num]);
          num++;
          cell.appendChild(cellText);
          row.appendChild(cell);
        }
        tableBody.appendChild(row);}
        table.appendChild(tableBody);
        body.appendChild(table);

}

//check if textboxes or dropdown menus are empty
function emptyValueCheck(firstname, surname, status, reason, dateOfUse, roomName, period){
  var empty = false;
  var textboxArr = [firstname, surname, status, reason, dateOfUse];
  for(var item in textboxArr){
    if (textboxArr[item] == null || textboxArr[item] == ""){
        document.getElementById('text' + item).innerHTML = "You cannot leave this empty";
        empty = true;
    }
    if(roomName == "Choose..."){
        document.getElementById('text5').innerHTML = "You cannot leave this empty";
        empty = true;
    }if(period == "Choose..."){
        document.getElementById('text6').innerHTML = "You cannot leave this empty";
        empty = true;
      }}

    return empty
}

//checks if the user's booking is available
function bookingAvailability(dateOfUse, roomName, period){
  var availability = true;
  for (var item in localStorage){
    if ((localStorage[item].toString().includes(dateOfUse) == true) && (localStorage[item].toString().includes(roomName) == true) && (localStorage[item].toString().includes(period) == true)) {
      document.getElementById('textDiv').innerHTML = "This booking already exists!!!";
      availability = false;
      break;
    }}
    return availability
}

function dayValidation(dateOfUse){
  var daysCheckArray = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  dayCheck = true;
  if( daysCheckArray.indexOf(dateOfUse) == -1){
			document.getElementById("text4").innerHTML = "Please enter a valid day of the week!!";
      dayCheck = false;
		}

		return dayCheck
}

//edits booking
function editBooking(){

  var key = document.getElementById('boookingId').value;
  var valueList = document.getElementById('value_list');
  valueList = valueList.options[valueList.selectedIndex].text;
  value = localStorage.getItem(key).toString().split(",");

  if (key == null) {
      document.getElementById("msg").innerHTML = "Your booking was not found!!!";
  } else {

    if (valueList == "Firstname"){
        value[1] = document.getElementById('newData').value;
        localStorage.removeItem(key);
        localStorage.setItem(key, value.toString());
        document.getElementById("msg").innerHTML = "Changes has been made!!!";
    }else if (valueList == "Surname"){
        value[2] = document.getElementById('newData').value;
        localStorage.removeItem(key);
        localStorage.setItem(key, value.toString());
        document.getElementById("msg").innerHTML = "Changes has been made!!!";
    }else if (valueList == "Status"){
        value[3] = document.getElementById('newData').value;
        localStorage.removeItem(key);
        localStorage.setItem(key, value.toString());
        document.getElementById("msg").innerHTML = "Changes has been made!!!";
    }else if (valueList == "Reason for booking"){
        value[4] = document.getElementById('newData').value;
        localStorage.removeItem(key);
        localStorage.setItem(key, value.toString());
        document.getElementById("msg").innerHTML = "Changes has been made!!!";
    }else if (valueList == "Date of use"){
        value[5] = document.getElementById('newData').value;
        localStorage.removeItem(key);
        localStorage.setItem(key, value.toString());
        document.getElementById("msg").innerHTML = "Changes has been made!!!";
    }else if (valueList == "Room"){
        value[6] = document.getElementById('newData').value;
        localStorage.removeItem(key);
        localStorage.setItem(key, value.toString());
        document.getElementById("msg").innerHTML = "Changes has been made!!!";
    }else if (valueList == "Period"){
        value[7] = document.getElementById('newData').value;
        localStorage.removeItem(key);
        localStorage.setItem(key, value.toString());
        document.getElementById("msg").innerHTML = "Changes has been made!!!";
    }
}}

function main() {
      var firstname = document.getElementById('firstname').value;
      var surname = document.getElementById('surname').value;
      var status = document.getElementById('status').value;
      var reason = document.getElementById('reason').value;
      var dateOfUse = document.getElementById('dateOfUse').value;

      //clears textbox after booking has been submited
      textboxValues = ['firstname', 'surname', 'status', 'reason', 'dateOfUse'];
      for(var value in textboxValues){
        document.getElementById(textboxValues[value]).value = "";
      }

      //gets drop down menu's value
      var roomName = document.getElementById('room');
      roomName = roomName.options[roomName.selectedIndex].text;
      var period = document.getElementById('period');
      period = period.options[period.selectedIndex].text;

      var res = {
          Firstname: "Firstname: " + firstname,
          Surname: " Surname:" + surname,
          Status: " Status: " + status,
          Reason: " Reason: " + reason,
          Date_Of_Use: " Day: " + dateOfUse,
          Room_Name: " Room: " + roomName,
          Period: " Period: " + period,
          BookingId: ""
      };

      var valueCheck = emptyValueCheck(firstname, surname, status, reason, dateOfUse, roomName, period);
      var availability = bookingAvailability(dateOfUse, roomName, period)
      var dayValidation1 = dayValidation(dateOfUse)

      if(valueCheck == false && availability == true && dayValidation1 == true){

            localData = [];
            for (var item in localStorage) {
                    localData.push(item);
                    }
            localData = localData.join("");

            if(localData.search("bookingId") == -1){

              localStorage.setItem("bookingId", 0);
              localStorage.setItem('bookingId', parseInt(localStorage.getItem("bookingId")) + 1);
              bookingID = localStorage.getItem("bookingId");
              res.BookingId = "Booking" + bookingID;
              display = [res.Firstname + '<br>', res.Surname + '<br>', res.Status + '<br>', res.Reason + '<br>', res.Date_Of_Use + '<br>', res.Room_Name + '<br>' + res.Period + '<br>'];
              result = [res.BookingId, res.Firstname, res.Surname, res.Status, res.Reason, res.Date_Of_Use, res.Room_Name, res.Period];
              localStorage.setItem("booking" + bookingID, result);
              frontText = "Your boooking was scucessful!!! <br> Your booking ID is " + res.BookingId + "<br> Booking Details displayed below <br>"
              document.getElementById("result").innerHTML = frontText + "\n" + display.join("");
              save(res.BookingId, result);
          }else{

              localStorage.setItem('bookingId', parseInt(localStorage.getItem("bookingId")) + 1);
              bookingID = localStorage.getItem("bookingId");
              res.BookingId = "Booking" + bookingID;
              display = [res.Firstname + '<br>', res.Surname + '<br>', res.Status + '<br>', res.Reason + '<br>', res.Date_Of_Use + '<br>', res.Room_Name + '<br>' + res.Period + '<br>'];
              result = [res.BookingId, res.Firstname, res.Surname, res.Status, res.Reason, res.Date_Of_Use, res.Room_Name, res.Period];
              localStorage.setItem("Booking" + bookingID, result);
              frontText = "Your boooking was scucessful!!! <br> Your booking ID is " + res.BookingId + "<br> Booking Details displayed below <br>"
              document.getElementById("result").innerHTML = frontText + "\n" + display.join("");
              save(res.BookingId, result);
    }}
  }
