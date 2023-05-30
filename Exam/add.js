let id = new URLSearchParams(window.location.search).get("id");
let BASE_URL = " http://localhost:8000/users";
let addProducts = document.querySelector(".add");
let userForm = document.querySelector(".userForm");
let btnAdd = document.querySelector(".btn-primary");
let itemName = document.querySelector(".item-name");
let itemBody = document.querySelector(".item-about");
let itemImg = document.querySelector(".item-photo");


async function getAllData() {
    axios.get(`${BASE_URL}/${id}`);
    console.log(data);
    console.log(id);
    elementName.value = element.name;
    elementAbout.value = element.about;
    elementPhoto.value = element.photo;
}
getAllData()


function addForm() {
    axios.post(BASE_URL);
    window.location.href = "index.html";
    
}
addForm();


userForm.addEventListener("submit",  function (e) {
        e.preventDefault();
        let obj = {
            name: itemName.value,
            about: itemAbout.value,
            photo: itemPhoto.value,
        };
        if (id) {
         axios.patch(`${BASE_URL}/${id}`, obj);
            window.location.href = "index.html";
            console.log('edit');
        } else {
            axios.post(`${BASE_URL}/${id}`, obj);
            window.location.href = "index.html";
            console.log('add');

        }
    });
