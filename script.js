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
let editInfoBtn = document.getElementById('editInfo');

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
let editbtn = false;
function checkBtn() {
    if (editbtn) {
        addInfoBtn.style.display = 'none';
        editInfoBtn.style.display = 'flex';
    } else {
        addInfoBtn.style.display = 'flex';
        editInfoBtn.style.display = 'none';
    }
}
checkBtn();
//using map() function with callback arrow function passing one parameter 
//and return name and income 
users = users.map((user) => {
    //return as object
    return {
        name: user.name,
        //return Income random number between o and 1000000
        incomeKyat: Math.floor(Math.random() * 1000000)
    }
});

//to update DOM and get name and income using foreach function according to userData Array
function updateDom(userData) {
    mainUserContainer.innerHTML = `
        <div class="d-flex justify-content-between mb-2">
            <div class="font-weight-bold ml-3">Users</div>
            <div class="font-weight-bold ml-auto">Income(MMK)</div> 
              
        </div>
        `;
    //with callback arrow function
    userData.forEach((user,i) => {
        //console.log(user.name);
        const element = document.createElement('div');
        element.classList.add('d-flex', 'justify-content-between', 'mb-2');
        element.innerHTML = `
            <div>${user.name}</div>
            <div class="pr-3">${formatNumberMMK(user.incomeKyat)}</div> 
            <div class="label label-default">
                <button type="submit" class="btn btn-primary" onclick="editUser(this)" id="btnEdit"
                data-status="${user.name}" data-index='${i}'>Edit</button>
            </div>
            <div class="label label-default">
                <button type="button" class="btn btn-danger" onclick="deleteUser(${i})"
                data-status="${user.name}" data-index='${i}'>Delete</button>
            </div>
        `;
        mainUserContainer.appendChild(element);
    });
};

//to format income with ',' MMK
function formatNumberMMK(num) {
    return Number(num).toLocaleString('mmk')
}

updateDom(users);

//convert JSON String to array
if (localStorage.getItem('users')) {
    users = JSON.parse(localStorage.getItem('users'));
}

updateDom(users);

function addUser(e) {
    if (e.value  === "AddInfo") {
        console.log(e.state);
        
        let newName = inpName.value;
        let newIncome = inpIncome.value;
        if (newName === '' || newIncome === '') {
            return alert("Please Fill the form.");
         }

        //new Data Object
        let newData = {
            name: newName,
            incomeKyat: newIncome
         }
        users.push(newData);
         updateDom(users);
         localStorage.setItem('users', JSON.stringify(users));
         inpName.value = '';
         inpIncome.value = '';
         e.value = "UpdateInfo"
         console.log(e.value);
     } else {
        console.log("Update")
     }
}

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
    if (dataKyat != 0) {
        const element = document.createElement('div');
        element.classList.add('d-flex', 'justify-content-between', 'mb-2');
        element.innerHTML = `
            <div class="font-weight-bold">Total</div>
            <div class="font-weight-bold">${formatNumberMMK(dataKyat)}</div>    
        `;
    mainUserContainer.appendChild(element);
    }
    
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

//To delete an object of array
function deleteUser(index) {
    //delete index number of data and only one number
    users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users));
    updateDom(users);
}


function editUser(e) {
    let index = e.dataset.index;
    let pointUser = users[index];
    let userName = pointUser.name;
    let userIncome = pointUser.incomeKyat;
    console.log(userName,userIncome)
    document.getElementById("txtName").value = userName;
    document.getElementById("txtIncome").value = userIncome;
    editbtn = true;
    checkBtn();
    //e.value = "UpdateInfo";
   // console.log(e.value);
    return e;
}

