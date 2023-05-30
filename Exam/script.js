let BASE_URL = " http://localhost:8000/users";
let cards = document.querySelector(".cards")
let deleteProduct = document.querySelector(".delete")
let favProduct = document.querySelector(".fav")
let search = document.querySelector(".search")
let sort = document.querySelector(".sort")

axios(BASE_URL).then((res) => {
    console.log(res.data);
    getAllProduct(res.data);
})

function getAllProduct(arr) {
    cards.innerHTML = ''
    arr.forEach(element => {
        cards.innerHTML += `
    
     <div class="col-md-3 col_1">
                            <img src=".${element.photo}" class="m-3">
                            <h5 class="m-3">${element.name}</h5>
                            <p>${element.about}
                            </p>
                            <button class="btn-success">Edit</button>
                            <button class="btn-danger delete" onclick=deleteProducts(${element.id},this)>Delete</button>
                            <a href="fav.html" ><button class="btn-primary fav" onclick=favProducts(${element.id},this)>Favorite</button></a>
                        </div>
    `
    });
}

function deleteProducts(id, btn) {
    axios.delete(`${BASE_URL}/${id}`)
        btn.closest("cards").remove()
    }

sort.addEventListener("click", function () {
    if (this.innerHTML == "Ascending") {
        axios(BASE_URL).then((res) => {
            let Ascending = res.data.sort((a, b) => a.name.localeCompare(b.name));
            getAllProduct(Ascending);
        });
        this.innerHTML = "Descending";
    } else if (this.innerHTML == "Descending") {
        axios(BASE_URL).then((res) => {
            let Descending = res.data.sort((a, b) => b.name.localeCompare(a.name));
            getAllProduct(Descending);
        });
        this.innerHTML = "Default";
    } else {
        axios(BASE_URL).then((res) => {
            getAllProduct(res.data);
        });
        this.innerHTML = "Ascending";
    }
});




search.addEventListener("input", function (e) {
    axios(BASE_URL).then((res) => {
        let searchName = res.data.filter((element) => {
          return  element.name
                .toLocaleLowerCase()
                .includes(e.target.value.toLocaleLowerCase())
        }
        );
        console.log(searchName);
        getAllProduct(searchName)
    })
});

let id;
let favId;
function favProducts(favId) {
    console.log(favId);
    let res = axios.get(`${BASE_URL}/${favId}`);
    let obj = res.data;
    axios.post("http://localhost:8000/favs", obj);
}
