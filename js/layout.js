//
// ─── SITE CONSTRUCTION ──────────────────────────────────────────────────────────
//
const publicRoutes = ['#', '#login', '#register'];
const privateRoutes = ['#feed', '#profile'];

// function updateNav(){
//     nav.innerHTML = '';
//     let links;
//     let logoutBtn;
//     if (currentUser()){
//         links = privateRoutes.map(createNavLink);
//         logoutBtn = document.createElement('button');
//         logoutBtn.textContent = 'Logout';
//         logoutBtn.onclick = logout;
//         nav.appendChild(logoutBtn);
//     } else {
//         links = publicRoutes.map(createNavLink);
//     }
//     links.forEach(l => nav.insertBefore(l, logoutBtn))
// }

function updateMain(path) {
    main.innerHTML = '';
    if (path) {
        switch(path){
            case '#login':
                renderLoginForm(); break;
            case '#register':
                renderRegisterForm(); break;
            case '#profile':
                renderProfile(); break;
            default:
                render404(); break;
        }
    } else {
        return("../index.html");
    }
}

// function updateContent(){
//     const path = window.location.hash;
//     if (privateRoutes.includes(path) && !currentUser()){
//         window.location.hash = '#';
//     } else {
//         updateNav();
//     }
// }

// updateContent();


//Creates html list items containing habit data to populate habits-list
//expects an array of objects, each object a habbit of the current user
function populateHabitList(userHabits){
    const habitList = document.querySelector('#habits-list');

    //loop through all of a users habits and create a html instance to display
    userHabits.forEach(habit => {
        createHabitInstance(habit);
    });

    function createHabitInstance(habit){ 
        const listItem = document.createElement('li')
        listItem.className = 'habit';
        const container = document.createElement('div');

        const title = document.createElement('h2')
        title.innerText = `${habit.name}`;

        const time = document.createElement('h3')
        time.innerText = `${habit.freq}, ${habit.time}`;

        const comment = document.createElement('h4')
        comment.innerText = `${habit.comment}`;

        container.append(title, time, comment);
        listItem.append(container);
        habitList.append(listItem);
    }
}

// TEST FUNCTION INVOKING //
populateHabitList([{name: "Habit test 1", freq:"Everyday", time:"1:30pm", comment:"test comment"}, {name: "Habit test 2", freq:"Everyday", time:"1:30pm", comment:"test comment"}, {name: "Habit test 3", freq:"Everyday", time:"1:30pm", comment:"test comment"}]);

// datepicker

const picker = datepicker('#dateselect', {
    // Event callbacks.
    onSelect: instance => {
      // Show which date was selected.
      console.log(instance.dateSelected)
    },
    onShow: instance => {
      console.log('Calendar showing.')
    },
    onHide: instance => {
      console.log('Calendar hidden.')
    },
    onMonthChange: instance => {
      // Show the month of the selected date.
      console.log(instance.currentMonthName)
    },
  
    // Customizations.
    formatter: (input, date, instance) => {
      // This will display the date as `1/1/2019`.
      input.value = date.toDateString()
    },
    position: 'tr', // Top right.

    // Settings.
    alwaysShow: true, // Never hide the calendar.
    dateSelected: new Date(), // Today is selected.
    startDate: new Date(), // This month.
    showAllDates: true, // Numbers for leading & trailing days outside the current month will show.
});
// -------------------------------------------------------------------------//

  