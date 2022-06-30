//
// ─── SITE CONSTRUCTION ──────────────────────────────────────────────────────────
//

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
            time.innerText = `${habit.freq}, ${habit.time}`;

            const comment = document.createElement('h4')
            comment.innerText = `${habit.comment}`;

            container.append(title, time, comment);
            listItem.append(container);
            habitList.append(listItem);
        }
    }
  }
  
// TEST FUNCTION INVOKING //
populateHabitList([{name: "Habit test 1", freq:"Everyday", time:"1:30pm", comment:"test comment"}, {name: "Habit test 2", freq:"Everyday", time:"1:30pm", comment:"test comment"}, {name: "Habit test 3", freq:"Everyday", time:"1:30pm", comment:"test comment"}]);

// -------------------------------------------------------------------------//

  