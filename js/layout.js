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

            const completeBtn = document.createElement('i');
            if(habit.is_complete == true){
                completeBtn.className = "fa-solid fa-circle-check";
            }else{
                completeBtn.className = "fa-regular fa-circle-check";
            }
            completeBtn.dataset.id = habit.id;
            completeBtn.addEventListener('click', ()=>{
                const payload = [
                    {
                        id: parseInt(completeBtn.dataset.id), 
                        is_complete: true, 
                        time: habit.time, 
                        frequency: habit.frequency,
                        comment: habit.comment,
                        name: habit.name,
                        user_id: habit.user_id
                    }]
                markHabitComplete(payload);
            });
            container.append(completeBtn);

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
    displayHabitMetrics(userHabits);
  }

function displayHabitMetrics(data){
    let pass = 0;
    let fail = 0;

    data.forEach(habit => {
        if(habit.is_complete == true){
            pass++;
        }else if(habit.is_complete == false){
            fail++;
        }
    });

    const total = pass + fail;

    document.querySelector("#metric-data-pass").textContent =
        `Number of habits you have accomplished: ${pass}`;
    document.querySelector("#metric-data-fail").textContent = 
        `Number of habits to complete: ${fail}`;

    const progresBar = document.querySelector("#metric-progress");
    progresBar.textContent = `${pass}%`;
    progresBar.max = total;
    progresBar.value = pass;
}