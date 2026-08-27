let phones = [];


// تحميل قاعدة البيانات

fetch("phones.json")
.then(response => response.json())
.then(data => {

    phones = data;

    displayPhones(phones);

});



// عرض الهواتف

function displayPhones(list){

    const container = document.getElementById("phones");

    if(!container) return;


    container.innerHTML="";


    if(list.length === 0){

        container.innerHTML = `
        <h2>
        لا يوجد هاتف بهذه المواصفات ❌
        </h2>
        `;

        return;
    }



    list.forEach(phone => {


        container.innerHTML += `

        <div class="phone-card">


        <img src="${phone.image}">


        <h3>
        ${phone.name}
        </h3>


        <div class="price">
        ${phone.price}$ 
        </div>


        <p>
        ${phone.category}
        </p>


        <div>

        ${phone.uses.map(use=>`
        <span class="tag">
        ${use}
        </span>
        `).join("")}

        </div>



        <button onclick="openDetails(${phone.id})">

        التفاصيل 📱

        </button>


        <button 
        class="favorite-btn"
        onclick="addFavorite(${phone.id})">

        ❤️ إضافة للمفضلة

        </button>


        </div>

        `;


    });


}




// البحث والفلترة

function filterPhones(){


let search = 
document.getElementById("search").value
.toLowerCase();


let category =
document.getElementById("category").value;


let usage =
document.getElementById("usage").value;


let price =
Number(document.getElementById("price").value);



let result = phones.filter(phone=>{


let checkName =
phone.name.toLowerCase()
.includes(search);



let checkCategory =
category==="all" ||
phone.category===category;



let checkUsage =
usage==="all" ||
phone.uses.includes(usage);



let checkPrice =
!price ||
phone.price <= price;



return 
checkName &&
checkCategory &&
checkUsage &&
checkPrice;


});



displayPhones(result);


}




// فتح صفحة التفاصيل

function openDetails(id){

localStorage.setItem(
"selectedPhone",
id
);


window.location.href="details.html";

}




// إضافة للمفضلة

function addFavorite(id){


let fav =
JSON.parse(
localStorage.getItem("favorites")
) || [];



if(!fav.includes(id)){

fav.push(id);

}


localStorage.setItem(
"favorites",
JSON.stringify(fav)
);


alert("تمت الإضافة للمفضلة ❤️");


}




// عرض المفضلة

function loadFavorites(){


let fav =
JSON.parse(
localStorage.getItem("favorites")
) || [];



let favoritePhones =
phones.filter(phone =>
fav.includes(phone.id)
);



displayPhones(favoritePhones);


}
