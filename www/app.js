const currentWeek = [{},{},{},{},{},{},{}];
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const titles = ['Chef Executif','Chef de Cuisine','Sous Chef','Chef de Partie','Commis Chef'];
for(let i = 0;i < 7;i++){currentWeek[i].dateCode = new Date();
    currentWeek[i].dateCode.setHours(0,0,0,0)}
let today = new Date();
let db;
today.setHours(0,0,0,0);

let butts = document.getElementsByClassName('butt');
let butts2 =document.getElementsByClassName('butt2');
window.onload = () =>
{
    let request = indexedDB.open("data");

    request.onupgradeneeded = function()
        {
            const db = request.result;
            const store = db.createObjectStore("shifts", {keyPath: "dateCode"});
            const morningIndex = store.createIndex('byMorning', 'morning',{multiEntry: true});
            const eveningIndex = store.createIndex('byEvening', 'evening',{multiEntry: true});
        }
    request.onsuccess = function()
    {
        console.log("Database Established");
        db = request.result;
    }
   
}
function sync() 
    {
        const tx = db.transaction('shifts', 'readonly');
        const store = tx.objectStore('shifts');
        
        const request = store.openCursor();
        request.onsuccess = (event) => {
            const cursor = event.target.result;
            if(cursor)
            {
                for(let x = 0;x<7;x++)
                {
                    let check = currentWeek[x].dateCode.toString();
                    if(cursor.value.dateCode == check){
                        currentWeek[x].morning = cursor.value.morning;
                        currentWeek[x].evening = cursor.value.evening;
                        console.log(currentWeek[x]);
                    }
                    
                }
                cursor.continue();
            }
            else{console.log("all data complete");setter();}
        }
    }
function uWeek() {
    const todayDay = today.getDay();
switch(todayDay){
case 0: 
    currentWeek[6].dateCode.setDate(today.getDate());
    currentWeek[5].dateCode.setDate(today.getDate() - 1);
    currentWeek[4].dateCode.setDate(today.getDate() - 2);
    currentWeek[3].dateCode.setDate(today.getDate() - 3);
    currentWeek[2].dateCode.setDate(today.getDate() - 4);
    currentWeek[1].dateCode.setDate(today.getDate() - 5);
    currentWeek[0].dateCode.setDate(today.getDate() - 6);
    break;
case 1:
    currentWeek[0].dateCode.setDate(today.getDate());
    currentWeek[1].dateCode.setDate(today.getDate() + 1);
    currentWeek[2].dateCode.setDate(today.getDate() + 2);
    currentWeek[3].dateCode.setDate(today.getDate() + 3);
    currentWeek[4].dateCode.setDate(today.getDate() + 4);
    currentWeek[5].dateCode.setDate(today.getDate() + 5);
    currentWeek[6].dateCode.setDate(today.getDate() + 6);
    break;
case 2:
    currentWeek[1].dateCode.setDate(today.getDate());
    currentWeek[2].dateCode.setDate(today.getDate() + 1);
    currentWeek[3].dateCode.setDate(today.getDate() + 2);
    currentWeek[4].dateCode.setDate(today.getDate() + 3);
    currentWeek[5].dateCode.setDate(today.getDate() + 4);
    currentWeek[6].dateCode.setDate(today.getDate() + 5);
    currentWeek[0].dateCode.setDate(today.getDate() - 1);
    break;
case 3:
    currentWeek[2].dateCode.setDate(today.getDate());
    currentWeek[3].dateCode.setDate(today.getDate() + 1);
    currentWeek[4].dateCode.setDate(today.getDate() + 2);
    currentWeek[5].dateCode.setDate(today.getDate() + 3);
    currentWeek[6].dateCode.setDate(today.getDate() + 4);
    currentWeek[0].dateCode.setDate(today.getDate() - 2);
    currentWeek[1].dateCode.setDate(today.getDate() - 1);
    break;
case 4:
    currentWeek[3].dateCode.setDate(today.getDate());
    currentWeek[4].dateCode.setDate(today.getDate() + 1);
    currentWeek[5].dateCode.setDate(today.getDate() + 2);
    currentWeek[6].dateCode.setDate(today.getDate() + 3);
    currentWeek[0].dateCode.setDate(today.getDate() - 3);
    currentWeek[1].dateCode.setDate(today.getDate() - 2);
    currentWeek[2].dateCode.setDate(today.getDate() - 1);
    break;
case 5:
    currentWeek[4].dateCode.setDate(today.getDate());
    currentWeek[5].dateCode.setDate(today.getDate() + 1);
    currentWeek[6].dateCode.setDate(today.getDate() + 2);
    currentWeek[0].dateCode.setDate(today.getDate() - 4);
    currentWeek[1].dateCode.setDate(today.getDate() - 3);
    currentWeek[2].dateCode.setDate(today.getDate() - 2);
    currentWeek[3].dateCode.setDate(today.getDate() - 1);
    break;
case 6:
    currentWeek[5].dateCode.setDate(today.getDate());
    currentWeek[6].dateCode.setDate(today.getDate() + 1);
    currentWeek[0].dateCode.setDate(today.getDate() - 5);
    currentWeek[1].dateCode.setDate(today.getDate() - 4);
    currentWeek[2].dateCode.setDate(today.getDate() - 3);
    currentWeek[3].dateCode.setDate(today.getDate() - 2);
    currentWeek[4].dateCode.setDate(today.getDate() - 1);
    break;

}
}
function populate() {
    //This fills out the current week with the proper dates for each day of the week.
    document.getElementById('mondayNum').innerHTML = currentWeek[0].dateCode.getDate();
    document.getElementById('tuesdayNum').innerHTML = currentWeek[1].dateCode.getDate();
    document.getElementById('wednesdayNum').innerHTML = currentWeek[2].dateCode.getDate();
    document.getElementById('thursdayNum').innerHTML = currentWeek[3].dateCode.getDate();
    document.getElementById('fridayNum').innerHTML = currentWeek[4].dateCode.getDate();
    document.getElementById('saturdayNum').innerHTML = currentWeek[5].dateCode.getDate();
    document.getElementById('sundayNum').innerHTML = currentWeek[6].dateCode.getDate();
    let weekbuild = months[currentWeek[0].dateCode.getMonth()]+" "+currentWeek[0].dateCode.getDate()+
    "-"+months[currentWeek[6].dateCode.getMonth()]+" "+currentWeek[6].dateCode.getDate();
    document.getElementById('tagline').innerHTML = weekbuild;
}
for(let i = 0;i<butts.length;i++){
//event handler for update buttons
    butts[i].addEventListener('click', 
    function(e){
        let forms = document.forms;
        let formsIndex;
        let dayIndex = e.target.parentElement.parentElement.id;
        let shiftIndex = e.target.parentElement.classList;
        if(dayIndex == '0'&&shiftIndex == 'morning')
            {
                formsIndex = 0;
            }
        else if(dayIndex == '0'&&shiftIndex == 'evening')
            {
                formsIndex = 1;
            }
        else if(dayIndex == '1'&&shiftIndex == 'morning')
            {
                formsIndex = 2;
            }
        else if(dayIndex == '1'&&shiftIndex == 'evening')
            {
                formsIndex = 3;
            }
        else if(dayIndex == '2'&&shiftIndex == 'morning')
            {
                formsIndex = 4;
            }
        else if(dayIndex == '2'&&shiftIndex == 'evening')
            {
                formsIndex = 5;
            }
        else if(dayIndex == '3'&&shiftIndex == 'morning')
            {
                formsIndex = 6;
            }
        else if(dayIndex == '3'&&shiftIndex == 'evening')
            {
                formsIndex = 7;
            }
        else if(dayIndex == '4'&&shiftIndex == 'morning')
            {
                formsIndex = 8;
            }
        else if(dayIndex == '4'&&shiftIndex == 'evening')
            {
                formsIndex = 9;
            }
        else if(dayIndex == '5'&&shiftIndex == 'morning')
            {
                formsIndex = 10;
            }
        else if(dayIndex == '5'&&shiftIndex == 'evening')
            {
                formsIndex = 11;
            }
        else if(dayIndex == '6'&&shiftIndex == 'morning')
            {
                formsIndex = 12;
            }
        else if(dayIndex == '6'&&shiftIndex == 'evening')
            {
                formsIndex = 13;
            }
        currentWeek[dayIndex][shiftIndex] = [];
        for(let k = 0;k < 5;k++)
            {
                currentWeek[dayIndex][shiftIndex].push(forms[formsIndex][k].value)
            }
        setter();
        update();
    })
}
function listener(){for(let i = 0;i<butts2.length;i++){
//event handlers for the edit button
    butts2[i].addEventListener('click', 
    function(e){
        let forms = document.forms;
        let formsIndex;
        let dayIndex = e.target.parentElement.parentElement.parentElement.id;
        let shiftIndex = e.target.parentElement.parentElement.classList;
        if(dayIndex == '0'&&shiftIndex == 'morning')
            {
                formsIndex = 0;
            }
        else if(dayIndex == '0'&&shiftIndex == 'evening')
            {
                formsIndex = 1;
            }
        else if(dayIndex == '1'&&shiftIndex == 'morning')
            {
                formsIndex = 2;
            }
        else if(dayIndex == '1'&&shiftIndex == 'evening')
            {
                formsIndex = 3;
            }
        else if(dayIndex == '2'&&shiftIndex == 'morning')
            {
                formsIndex = 4;
            }
        else if(dayIndex == '2'&&shiftIndex == 'evening')
            {
                formsIndex = 5;
            }
        else if(dayIndex == '3'&&shiftIndex == 'morning')
            {
                formsIndex = 6;
            }
        else if(dayIndex == '3'&&shiftIndex == 'evening')
            {
                formsIndex = 7;
            }
        else if(dayIndex == '4'&&shiftIndex == 'morning')
            {
                formsIndex = 8;
            }
        else if(dayIndex == '4'&&shiftIndex == 'evening')
            {
                formsIndex = 9;
            }
        else if(dayIndex == '5'&&shiftIndex == 'morning')
            {
                formsIndex = 10;
            }
        else if(dayIndex == '5'&&shiftIndex == 'evening')
            {
                formsIndex = 11;
            }
        else if(dayIndex == '6'&&shiftIndex == 'morning')
            {
                formsIndex = 12;
            }
        else if(dayIndex == '6'&&shiftIndex == 'evening')
            {
                formsIndex = 13;
            }

        let current;
        if(shiftIndex == 'morning')
        {current = document.getElementById(dayIndex).children[1];}
        if(shiftIndex == 'evening')
        {current = document.getElementById(dayIndex).children[2];}
        current.children[1].hidden = false;
        current.children[2].hidden = false;
        current.children[3].hidden = true;
        for(let k = 0;k < 5;k++)
            {
                forms[formsIndex][k].value = currentWeek[dayIndex][shiftIndex][k]
            }
    })
}}
function setter() 
    {
        for(let j = 0;j < 7;j++)
            {
                if(currentWeek[j].morning)
                {
                    let current = document.getElementById(j).children[1];
                    current.children[1].hidden = true;
                    current.children[2].hidden = true;
                    current.children[3].hidden = false;
                    let list = '<ul>';
                    for(let x = 0;x <currentWeek[j].morning.length;x++)
                    {
                        list += "<span class='title'>"+titles[x]+"</span>"
                        list += "<li> 👨‍🍳 "+currentWeek[j].morning[x]+"</li>"
                    }
                    list += '</ul><div class="butt2" >Edit &#x1F6E0</div>'
                    current.children[3].innerHTML = list;
                }
                if(currentWeek[j].evening)
                {
                    let current = document.getElementById(j).children[2];
                    current.children[1].hidden = true;
                    current.children[2].hidden = true;
                    current.children[3].hidden = false;
                    let list = '<ul>';
                    for(let x = 0;x <currentWeek[j].evening.length;x++)
                    {
                        list += "<span class='title'>"+titles[x]+"</span>"
                        list += "<li> 👨‍🍳 "+currentWeek[j].evening[x]+"</li>"
                    }
                    list += '</ul><div class="butt2" >Edit &#x1F6E0</div>'
                    current.children[3].innerHTML = list;
                }
            }
            listener();
    }
function back(){
    today.setDate(today.getDate() - 7);
    reset();
    for(let x =0;x<7;x++){
        currentWeek[x].dateCode.setDate(currentWeek[x].dateCode.getDate() -7)
    }
    //uWeek();
    populate();
    sync();
    refresh();
    setter();

}
function forward(){
    today.setDate(today.getDate() + 7);
    reset();
    for(let x =0;x<7;x++){
        currentWeek[x].dateCode.setDate(currentWeek[x].dateCode.getDate() +7)
    }
   // uWeek();
    populate();
    sync();
    refresh();
    setter();

}
function reset()
    {
        for(let x = 0;x<7;x++)
        {
            currentWeek[x].morning = undefined;
            currentWeek[x].evening = undefined;
        }

    }
function refresh()
    {
        for(let j = 0;j < 7;j++)
            {
                if(currentWeek[j].morning === undefined)
                {
                    let current = document.getElementById(j).children[1];
                    current.children[1].hidden = false;
                    current.children[2].hidden = false;
                    current.children[3].hidden = true;
                    
                }
                if(currentWeek[j].evening === undefined)
                {
                    let current = document.getElementById(j).children[2];
                    current.children[1].hidden = false;
                    current.children[2].hidden = false;
                    current.children[3].hidden = true;
                    
                }
            }
    }
function update() 
    {
        const tx = db.transaction("shifts", "readwrite");
        const store = tx.objectStore("shifts");
        for(let x = 0;x <7;x++)
        {
            if(currentWeek[x].morning || currentWeek[x].evening)
            {
                store.put({morning: currentWeek[x].morning, 
                    evening: currentWeek[x].evening,
                    dateCode: currentWeek[x].dateCode});
            }

        }
        tx.oncomplete = () => {console.log('updated')}
    }


uWeek();
populate();
setTimeout(function(){sync()},300);