//get div as id mainUsers
let mainUserContainer = document.getElementById('mainUsers');
let doubleIncomeBtn = document.getElementById('doubleIncome');
let showOnlyMillionariesBtn = document.getElementById('millionaries');
let showOnlyIncompleteBtn = document.getElementById('incomplete');
let richesBtn = document.getElementById('riches');
let totalBtn = document.getElementById('total');
let searchEl = document.getElementById('search');
let sortbyLowIncome = document.getElementById('sortfromlowincome'); // added by Nandar 
let inpName = document.getElementById('txtName');
let inpIncome = document.getElementById('txtIncome');
let addInfoBtn = document.getElementById('addInfo');

//users array with objects
let users = [{
        "name": "Kyaw Kyaw"
    },
    {
        "name": "Su Su Aye Aung"
    },
    {
        "name": "Zaw Myo Tun"
    },
    {
        "name": "Thuzar Phyo"
    },
    {
        "name": "Kalayar Htun"
    },
    {
        "name": "Chan Chan"
    },
    {
        "name": "Aung Aung Oo"
    },
    {
        "name": "Hsu Mon Aung"
    },
    {
        "name": "Kyaw Ye Lwin"
    },
    {
        "name": "Wai Phyoe Aung"
    }
]

//using map() function with callback arrow function passing one parameter 
//and return name and income 
users = users.map((user) => {
    //return as object
    return {
        name: user.name,
        //return Income random number between o and 1000000
        incomeKyat: Math.floor(Math.random() * 1000000),
    }
});

//to update DOM and get name and income using foreach function according to userData Array
function updateDom(userData) {
    mainUserContainer.innerHTML = `
        <div class="d-flex justify-content-between mb-2">
            <div class="font-weight-bold">Users</div>
            <div class="font-weight-bold">Income(MMK)</div>  
        </div>
        `;
    //with callback arrow function
    userData.forEach((user) => {
        //console.log(user.name);
        const element = document.createElement('div');
        element.classList.add('d-flex', 'justify-content-between', 'mb-2');
        element.innerHTML = `
            <div>${user.name}</div>
            <div class="pr-3">${formatNumberMMK(user.incomeKyat)}</div>   
        `;
        mainUserContainer.appendChild(element);
    });

};

//to format income with ',' MMK
function formatNumberMMK(num) {
    return Number(num).toLocaleString('mmk')
}

updateDom(users);


addInfoBtn.addEventListener('click', () => {
    let newName = inpName.value;
    let newIncome = inpIncome.value;

   //new Data Object
    let newData = {
        name: newName,
        incomeKyat: newIncome
    }
    
    users.push(newData);
    updateDom(users);
    inpName.value = '';
    inpIncome.value = '';
});

//show Double Income
doubleIncomeBtn.addEventListener('click', () => {
    //map() function
    users = users.map((user) => {
        //return as object
        return {
            name: user.name,
            incomeKyat: user.incomeKyat * 2
        }
    });
    updateDom(users);
});

//show Millionries
showOnlyMillionariesBtn.addEventListener('click', () => {
    let data = users.filter((user) => {
        return (user.incomeKyat > 1000000)
    });
    updateDom(data);
})

//show lower Income
showOnlyIncompleteBtn.addEventListener('click', () => {
    let data = users.filter((user) => {
        return user.incomeKyat < 1000000
    });
    updateDom(data);
})

//show sort Income from max to min
richesBtn.addEventListener('click', () => {
    let data = users.sort((a, b) => {
        return b.incomeKyat - a.incomeKyat
    });
    updateDom(data);
})

//show sort Income from min to max
sortbyLowIncome.addEventListener('click', () => { //added by Nandar 
    let data = users.sort((a, b) => {
        return a.incomeKyat - b.incomeKyat;
    });
    updateDom(data);
})

//show Total Income
totalBtn.addEventListener('click', () => {
    // 0 is starting point
    let dataKyat = users.reduce((total, user) => (total += Number(user.incomeKyat)), 0);

    const element = document.createElement('div');
    element.classList.add('d-flex', 'justify-content-between', 'mb-2');
    element.innerHTML = `
            <div class="font-weight-bold">Total</div>
            <div class="pr-3 font-weight-bold">${formatNumberMMK(dataKyat)}</div>    
        `;
    mainUserContainer.appendChild(element);
});

searchEl.addEventListener('input', search);

//for search name
function search(e) {
    let data = users;
    //there is element(s) when type input value(s) 
    let search = e.target.value.toLowerCase();
    if (search) {
        data = data.filter(v => v.name.toLowerCase().indexOf(search) > -1)
    }
    updateDom(data);
}