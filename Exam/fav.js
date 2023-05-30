let BASE_URL = " http://localhost:8000/favs";
let id = new URLSearchParams(window.location.search).get("id");
let cardsFav = document.querySelector(".cardsfav")
let deleteFav = document.querySelector(".delete")
let favProducts = document.querySelector(".fav")
let search = document.querySelector(".search")
let sort = document.querySelector(".sort")

axios(BASE_URL).then((res) => {
    console.log(res.data);
    getAllProduct(res.data);
})

function getAllProduct(arr) {
    cardsFav.innerHTML = ''
    arr.forEach(element => {
        cardsFav.innerHTML += `
     <div class="col-md-3 col_1">
                            <img src=".${element.photo}" class="m-3">
                            <h5 class="m-3">${element.name}</h5>
                            <p>${element.about}
                            </p>
                            <button class="btn-success">Edit</button>
                            <button class="btn-danger delete" onclick=deleteFavs(${element.id})>Delete</button>
                            <button class="btn-primary fav" onclick=favProducts(${element.id})>Favorite</button>
                        </div>
    `
    });
}
function deleteFavs(id, btn) {
    axios.delete(`${BASE_URL}/${id}`)
    btn.closest("cardsFav").remove()
}