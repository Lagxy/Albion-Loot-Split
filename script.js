const addBtn = document.querySelector("#addbtn");
const calcBtn = document.querySelector("#calculate");
const table = document.querySelector("#data");

let counter = 1;
let playerTimes = [];

addBtn.addEventListener('click', () => {
    const name = document.querySelector("#name").value;
    const start = document.querySelector("#tstart").value;
    const end = document.querySelector("#tend").value;

    if(name == '' || start == '' || end == ''){
        alert('enter proper data');
    } else {
        const row = table.insertRow(-1);
        const data_number = row.insertCell(0);
        const data_name = row.insertCell(1);
        const data_start = row.insertCell(2);
        const data_end = row.insertCell(3);
        const data_percentage = row.insertCell(4);
        const data_loot = row.insertCell(5);

        data_number.innerText = counter;
        data_name.innerText = name;
        data_start.innerText = start;
        data_end.innerText = end;

        counter++;

        let start_arr = [parseInt(start.split(':')[0]), parseInt(start.split(':')[1])];
        let end_arr = [parseInt(end.split(':')[0]), parseInt(end.split(':')[1])];
        if(start_arr[0] > end_arr[0]){
            end_arr[0] += 24;
        }
        let curr_player_time = (end_arr[0] - start_arr[0]) * 60 - start_arr[1] + end_arr[1];
        playerTimes.push(curr_player_time);
}});

calcBtn.addEventListener('click', () => {
    const totalLoot = document.querySelector("#loot").value;
    if (totalLoot != '' && !isNaN(totalLoot)){
        const lootCut = cuts();
        for(let i = 1; i < table.rows.length; i++){
            let row = table.rows[i];

            row.cells[4].innerText = lootCut[i-1].percentageShare + '%';
            row.cells[5].innerText = lootCut[i-1].lootShare;
        }
    } else {
        alert("enter your loot");
    }
});

function cuts() {
    const totalLoot = document.querySelector("#loot").value;
    const totalPlayerTime = playerTimes.reduce((acc, time) => acc + time, 0);

    return playerTimes.map(time => ({
        lootShare: new Intl.NumberFormat().format(((time / totalPlayerTime) * totalLoot)),
        percentageShare: ((time / totalPlayerTime) * 100).toFixed(2)
    }));
}



