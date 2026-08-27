let phones = [];



// تحميل بيانات الهواتف

fetch("data/phones.json")

.then(response => response.json())

.then(data => {

    phones = data;

    displayPhones(phones);

});





// عرض الهواتف

function displayPhones(list){


const box = document.getElementById("phones");


if(!box) return;



box.innerHTML = "";



list.forEach(phone => {



box.innerHTML += `


<div class="phone-card">


<img src="${phone.image}">



<h3>
${phone.name}
</h3>



<div class="phone-info">


<div class="rating">
⭐⭐⭐⭐⭐
</div>


<p>
${phone.brand}
</p>



<div class="price">

${phone.price}$

</div>



<p>

${phone.category}

</p>



</div>




<div class="phone-buttons">


<button onclick="openDetails(${phone.id})">

📱 تفاصيل

</button>



<button onclick="addFavorite(${phone.id})">

❤️

</button>



</div>



</div>


`;



});



}







// البحث الذكي

function smartSearch(){



let price =
document.getElementById("priceFilter").value;



let use =
document.getElementById("useFilter").value;



let result = phones.filter(phone=>{



let priceCheck =
price==="all" ||
phone.price <= Number(price);



let useCheck =
use==="all" ||
phone.uses.includes(use);



return priceCheck && useCheck;



});



displayPhones(result);



}







// البحث بالاسم


document
.getElementById("searchInput")
.addEventListener("input",function(){



let value =
this.value.toLowerCase();



let result =
phones.filter(phone =>


phone.name
.toLowerCase()
.includes(value)


);



displayPhones(result);



});









// فتح التفاصيل


function openDetails(id){



localStorage.setItem(
"phoneID",
id
);



window.location.href =
"details.html";



}








// المفضلة


function addFavorite(id){



let fav =

JSON.parse(
localStorage.getItem("favorites")
)

|| [];



if(!fav.includes(id)){


fav.push(id);


}



localStorage.setItem(

"favorites",

JSON.stringify(fav)

);



alert("تمت الإضافة للمفضلة ❤️");



}
