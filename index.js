const cron = require('node-cron')
const fs = require('fs')
var player = require('play-sound')(opts = {})

const dir = './bells/new_year/'

const lesson = [
    "8:00", "8:40",
    "8:50", "9:30",
    "9:40", "10:20",
    '10:30', "11:10",
    "11:20", "12:00",
    "12:10", "12:50",
    "13:00", "13:40",
    "13:10", "13:49",
    "14:00", "14:40",
    "14:50", "15:30",
    "15:40", "16:20",
    "16:30", "17:10",
    "17:20", "18:00",
    "18:05", "18:45",
]

for (i = 0; i < lesson.length; ++i) {
    cronStr = timeToCron(lesson[i])
    cron.schedule(cronStr, () =>{PlayBell()})
    console.log(cronStr, cron.validate(cronStr));
}
function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

function timeToCron(array){
    h = array.split(':')[0]
    m = array.split(':')[1];
    var cronStr = `${m} ${h} * * *`
    return cronStr
}

function PlayBell(){
    const mp3 = fs.readdirSync(dir)
    const mp3_count = mp3.length;
    i = randomInteger(1, mp3_count)
    player.play(`${dir}${i}.mp3`, function(err){
        if (err) return err
    })
    console.log(`${new Date()}, play-bell: ${dir}${i}.mp3`);
}