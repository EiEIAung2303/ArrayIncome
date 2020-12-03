//get div as id mainUsers
let mainUserContainer = document.getElementById('mainUsers');
let doubleIncomeBtn = document.getElementById('doubleIncome');
let showOnlyMillionariesBtn = document.getElementById('millionaries');
let showOnlyIncompleteBtn = document.getElementById('incomplete');
let richesBtn = document.getElementById('riches');
let totalBtn = document.getElementById('total');
let searchEl = document.getElementById('search');
let sortbyLowIncome = document.getElementById('sortfromlowincome'); // added by Nandar 

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
        income: Math.floor(Math.random() * 1000000)
    }
});

//to update DOM and get name and income using foreach function according to userData Array
function updateDom(userData) {
    mainUserContainer.innerHTML = `
        <div class="d-flex justify-content-between mb-2 ">
            <div class="font-weight-bold">Users</div>
            <div class="font-weight-bold pr-3">Income(MMK)</div>
        </div>
        `;
    //with callback arrow function
    userData.forEach((user) => {
        //console.log(user.name);
        const element = document.createElement('div');
        element.classList.add('d-flex', 'justify-content-between', 'mb-2');
        element.innerHTML = `
            <div>${user.name}</div>
            <div class="pr-5">${formatNumber(user.income)}</div>   
        `;
        mainUserContainer.appendChild(element);
    });

};

//to format income with ','
function formatNumber(num) {
    return Number(num).toLocaleString('mmk')
}

updateDom(users);

doubleIncomeBtn.addEventListener('click', () => {
    //map() function
    users = users.map((user) => {
        //return as object
        return {
            name: user.name,
            income: user.income * 2
        }
    });
    updateDom(users);
});

showOnlyMillionariesBtn.addEventListener('click', () => {
    let data = users.filter((user) => {
        return user.income > 1000000
    });
    updateDom(data);
})

showOnlyIncompleteBtn.addEventListener('click', () => {
    let data = users.filter((user) => {
        return user.income < 1000000
    });
    updateDom(data);
})

richesBtn.addEventListener('click', () => {
    let data = users.sort((a, b) => {
        return b.income - a.income
    });
    updateDom(data);
})

sortbyLowIncome.addEventListener('click',()=>{      //added by Nandar 
    let data = users.sort((a, b) => {
        return a.income - b.income;
    });
    updateDom(data);
})

totalBtn.addEventListener('click', () => {
    // 0 is starting point
    let data = users.reduce((total, user) => (total += user.income), 0);
    const element = document.createElement('div');
    element.classList.add('d-flex', 'justify-content-between', 'mb-2');
    element.innerHTML = `
            <div>Total</div>
            <div class="pr-5">${formatNumber(data)}</div>   
        `;
    mainUserContainer.appendChild(element);
});

searchEl.addEventListener('input', search);

function search(e) {
    let data = users;
    //there is element(s) when type input value(s) 
    let search = e.target.value.toLowerCase();
    if (search) {
        data = data.filter(v => v.name.toLowerCase().indexOf(search) > -1)
    }
    updateDom(data);
}