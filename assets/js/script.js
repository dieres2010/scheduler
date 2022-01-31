
const m = moment();

// today's date to control no showing activities of past days on localStorage
todayDate = (m.format('MM/DD/YYYY'));

$("#currentDay").append(m.format('dddd, MMMM Do'));

// hour Type: P: Past, C: Current, F: Future
var hourType = "";


var task = [
    { Hr: 9, HrText: "9AM", Text:"", Date: todayDate },
    { Hr: 10, HrText: "10AM", Text:"", Date: todayDate },
    { Hr: 11, HrText: "11AM", Text:"", Date: todayDate },
    { Hr: 12, HrText: "12PM", Text:"", Date: todayDate },
    { Hr: 13, HrText: "1PM", Text:"", Date: todayDate },
    { Hr: 14, HrText: "2PM", Text:"", Date: todayDate },
    { Hr: 15, HrText: "3PM", Text:"", Date: todayDate },
    { Hr: 16, HrText: "4PM", Text:"", Date: todayDate },
    { Hr: 17, HrText: "5PM", Text:"", Date: todayDate }
];


var auditTask = function(hourTask) {

    
    // get the current hour
    var hour = moment().hour();

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

    var taskRow = $("<div>").addClass("row");
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
      
    // append div, p, textarea and button element to parent time-block
    $(".time-block").append(taskRow, taskP, taskSpan, taskBtn);


    
  };


var loadTasks = function() {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  
    // if nothing in localStorage, or tasks in localStorage from a diferent day
    //create a new object to track all task status arrays

    if ((!tasks) || (tasks[0].Date != todayDate )) {
        // if tasks, tasks in localStorage from a diferent date, clear localStorage
        if(tasks) {
            localStorage.clear();
            console.log("hay LS de otra fecha");
        }        
        // load tasks
        console.log("no hay LS o de diferente dia");
        for (var i=0; i<9; i++) {
            createTasks(i, task[i].Hr, task[i].HrText, task[i].Text);
        };
    } else {
        var i =0;
        console.log ("hay localstorage info")
        // then loop over array to load tasks
        $.each(tasks, function() {
            // asign values from local storage to task array
            task[i].Text = tasks[i].Text;
            console.log(task[i]);
            console.log(tasks[i]);

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
    console.log(rowId);
    var nameText = ".description"+rowId;
    var nameHr = ".hour"+rowId;

    task[rowId].Text = $(nameText).val();
    console.log(task[rowId]);    
  
 
    saveTasks();
 
  });

  // save tasks information to localStorage  
  var saveTasks = function() {
    console.log(task);
    localStorage.setItem("tasks", JSON.stringify(task));
  };

  loadTasks ();
