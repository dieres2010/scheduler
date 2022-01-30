const m = moment();

$("#currentDay").append(m.format('dddd, MMMM Do'));

// hour Type: P: Past, C: Current, F: Future
var hourType = "";

var task = [
    { Hr: 9, HrText: "9AM", Text:"a" },
    { Hr: 10, HrText: "10AM", Text:"b" },
    { Hr: 11, HrText: "11AM", Text:"c" },
    { Hr: 12, HrText: "12PM", Text:"d" },
    { Hr: 13, HrText: "1PM", Text:"e" },
    { Hr: 14, HrText: "2PM", Text:"f" },
    { Hr: 15, HrText: "3PM", Text:"g" },
    { Hr: 16, HrText: "4PM", Text:"h" },
    { Hr: 17, HrText: "5PM", Text:"i" }
];


var auditTask = function(hourTask) {

    
    // get the current hour
    var hour = moment().hour();

    console.log(hour);
    console.log(hourTask);

    if (hourTask < hour) {
        hourType = "P";
    } 
    else if ((hourTask) == hour) {
        hourType = "C";
    } else {
        hourType = "F";

    };

};

  
var createTasks = function(id, taskHr, taskHrText, taskText) {

    // check hour
    auditTask(taskHr);
    var hourId = "hour"+id;
    var descId ="description"+id;
    var btnId = "btn"+id;

    console.log (hourId, descId, btnId);

    var taskP = $("<p>").addClass("hour "+hourId).text(taskHrText);
    if (hourType == "P") {
        var taskSpan = $("<textarea>").addClass("description past "+descId).text(taskText);
    }
    else if (hourType == "C") {
        var taskSpan = $("<textarea>").addClass("description present "+descId).text(taskText);
    } else {
        var taskSpan = $("<textarea>").addClass("description future "+descId).text(taskText);
    }
      
    var taskBtn = $("<button>").addClass("saveBtn oi oi-file "+btnId);
    var taskBr = $("</br>");
  
    // append span and p element to parent li
    $(".time-block").append(taskP, taskSpan, taskBtn, taskBr);
  
  };


var loadTasks = function() {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  
    // if nothing in localStorage, create a new object to track all task status arrays

    if (!tasks) {
      
        for (var i=0; i<9; i++) {
            createTasks(i, task[i].Hr, task[i].HrText, task[i].Text);
        };
 
    } else {
        var i =0;
        // then loop over sub-array
        $.each(tasks, function() {
            console.log(tasks)
            createTasks(i,tasks[i].Hr, tasks[i].HrText, tasks[i].Text);
            i++;
        });

    };
  

  };

// save button for task was clicked

$('.time-block').on('click', '.saveBtn', function () {

    // get form values

    var rowId = $(this)[0].className;
    var lengId = rowId.length;
    rowId = rowId.substring(lengId-1,lengId);

    var nameText = ".description"+rowId;
    var nameHr = ".hour"+rowId;

    task[rowId].Text = $(nameText).val();
    console.log(task[rowId]);    
  
 
    saveTasks();
 
  });

  
  var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(task));
  };

  loadTasks ();
