//
// ─── SITE CONSTRUCTION ──────────────────────────────────────────────────────────
//
const publicRoutes = ['#', '#login', '#register'];
const privateRoutes = ['#feed', '#profile'];

// function updateMain(path) {
//     main.innerHTML = '';
//     if (path) {
//         switch(path){
//             case '#login':
//                 renderLoginForm(); break;
//             case '#register':
//                 renderRegisterForm(); break;
//             case '#profile':
//                 renderProfile(); break;
//             default:
//                 render404(); break;
//         }
//     } else {
//         return("../index.html");
//     }
// }


//Creates html list items containing habit data to populate habits-list
//expects an array of objects, each object a habbit of the current user
function populateHabitList(userHabits){
    const habitList = document.querySelector('#habits-list');
    if(habitList != null){
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
            let freq;
            switch (habit.frequency) {
                case 1:
                    freq = "Every hour";
                    break;
                case 2:
                    freq = "Every day";
                    break;
                case 3:
                    freq = "Every week";
                    break;
                default:
                    freq = "Every day";
                    break;
            }

            let timeSplit = habit.time.slice(0, 5);
            time.innerText = `${freq}, ${timeSplit}`;

            container.append(title, time);
           
            const comment = document.createElement('h4')
            if(habit.comment != undefined || habit.comment != null){
                comment.innerText = `${habit.comment}`;
                container.append(comment);
            }

            listItem.append(container);
            habitList.append(listItem);
        }
    }
  }


// datepicker

// const picker = datepicker('#dateselect', {
//     // Event callbacks.
//     onSelect: instance => {
//       // Show which date was selected.
//       console.log(instance.dateSelected)
//     },
//     onShow: instance => {
//       console.log('Calendar showing.')
//     },
//     onHide: instance => {
//       console.log('Calendar hidden.')
//     },
//     onMonthChange: instance => {
//       // Show the month of the selected date.
//       console.log(instance.currentMonthName)
//     },
  
//     // Customizations.
//     formatter: (input, date, instance) => {
//       // This will display the date as `1/1/2019`.
//       input.value = date.toDateString()
//     },
//     position: 'tr', // Top right.

//     // Settings.
//     alwaysShow: true, // Never hide the calendar.
//     dateSelected: new Date(), // Today is selected.
//     startDate: new Date(), // This month.
//     showAllDates: true, // Numbers for leading & trailing days outside the current month will show.
// });
// -------------------------------------------------------------------------//

  