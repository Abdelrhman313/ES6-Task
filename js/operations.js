let counter= (id) => {
    console.log(id);
    let userTime = document.querySelector('#eventTime')?.value,
        setIntervalEventTime = setInterval(() => {
            let userTimeValue = Date.parse(userTime),
                eventTime = document?.getElementById(id),
                currentTime = Date.parse(new Date),
                reminderTime = userTimeValue - currentTime,
                seconds, minutes, hours, days;
            
            [seconds, minutes, hours, days] = [Math.floor( (reminderTime/1000) % 60 )
            ,Math.floor( (reminderTime/1000/60) % 60)
            ,Math.floor( (reminderTime/(1000*60*60)) % 24)
            ,Math.floor( reminderTime/(1000*60*60*24) )]

            if (seconds === 0 && minutes === 0 && hours === 0 && days === 0){
                alert(`Event: starts now! Go ahead.`)
                clearInterval(setIntervalEventTime);
                if(eventTime){
                    eventTime.innerHTML = `Event: starts now! Go ahead.`;
                }
            }else if (seconds < 0) {
                if(eventTime){
                    eventTime.innerHTML = `The event has already started.`;
                }
            }
            else {
                if(eventTime){
                    eventTime.innerHTML = `Started in ${days} days, ${hours} h, ${minutes} m, and ${seconds} s.`;
                }
            }
        }, 1000);
}

export function addNewEvent(){

    let eventTitle = document.getElementById('eventName').value,
        eventTime = document.getElementById('eventTime').value,
        eventValues = {
        title : eventTitle,
        dateTime: eventTime 
        },
        x = 1,
        events = document.getElementById('events');
        
        
    if(eventValues.title != '' && eventValues.dateTime != ''){
        let event = document.createElement('div'),
        eventH3 = document.createElement('h3'),
        eventH3Icon = document.createElement('i'),
        eventH3Value = document.createElement('span'),
        eventP = document.createElement('p'),
        eventPIcon = document.createElement('i'),
        eventPValue = document.createElement('span'),
        eventDeleteBtn = document.createElement('button'),
        btnValue = document.createElement('i');

        event.className = "event";
        event.id = `event${x}`;

        eventH3.className = "eventName";
        eventH3Icon.className = "fas fa-calendar-alt";
        eventH3Value.id = `eventNameValue`;

        eventP.className = "eventTime";
        eventPIcon.className = "fas fa-bell";
        eventPValue.id = `eventTimeValue${x}`;

        eventDeleteBtn.id = `deleteBtn`;
        btnValue.className = "fas fa-times";

        eventDeleteBtn.setAttribute('onclick', 'document.getElementById("deleteBtn").parentElement.remove()');

        eventH3Value.textContent = `${eventValues.title}`;
        eventPValue.textContent = `${eventValues.dateTime}`;

        eventH3.append(eventH3Icon);
        eventH3.append(eventH3Value);
        
        eventP.append(eventPIcon);
        eventP.append(eventPValue);
        
        eventDeleteBtn.append(btnValue);

        event.append(eventH3);
        event.append(eventP);
        event.append(eventDeleteBtn);

        events.append(event);

        setTimeout(() => {
            document.getElementById('eventName').value = '';
            document.getElementById('eventTime').value = '';
        }, 600);
        x++;
        counter(eventPValue.id);
    }else{
        alert('Please Enter Valid Data');
    }
}
