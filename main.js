let form = document.querySelector("form");
const list = document.querySelector("#image-list");
const nextPageBtn = document.querySelector("#nextPageBtn");
const prePageBtn = document.querySelector("#prePageBtn");
let currentpage = 1;
let perpage = 10;
let url  = ""
let query = form.search.value;
let colors = form.colors.value;
let run = false;

checkingPages();
buttonVisibility(run);


form.onsubmit = async event => {
  if (event) {
    event.preventDefault();
  }
  list.textContent = "";
  run = true;

  //Get the values entered by the user.
  query = form.search.value;
  colors = form.colors.value;
  
  await setURL();
  let result = await resultJson(url);
  createListElements(result);
  buttonVisibility(run);
}

// It sets all parameters and then save them into a string
async function setURL(){
  const APIKEY = "33324322-8eee52f582e68b2e31576e70f";
  url = "https://pixabay.com/api/?key=" + APIKEY + "&q=" + query + "&colors=" + colors + "&image_type=photo&page=" + currentpage + "&per_page=" + perpage;
}

// It takes a string and fetch from pixabay then return objects
async function resultJson(url){
  let response = await fetch(url);
  let json = await response.json(response);
  return json;
}

// It loops in returned objects and implent them into below elements
function createListElements(results) {
  results.hits.forEach(item => {
    let li = document.createElement("li");
    let div = document.createElement("div");
    div.className = "discription";

    let img = document.createElement("img");
    let nextline = document.createElement("br");
    let tags = document.createElement("p");
    let user = document.createElement("p");
    let comment = "Taken by:  ";
    user = item.user;
    img.src = item.webformatURL;
    tags = item.tags;

    li.appendChild(img);
    li.appendChild(div);
    div.append(tags);
    div.append(nextline);
    div.append(comment);
    div.append(user);
    list.appendChild(li);
  });
}

nextPageBtn.addEventListener("click",async function (event) {
  //Add up currentpage by 1 when clicking.
  currentpage++;
  //Run form.onsubmit and it will shows remaining images in the list.
  list.textContent = "";
  await setURL();
  let result = await resultJson(url);
  createListElements(result);
  checkingPages();
})

prePageBtn.addEventListener("click",async function (event) {
  //Reduce currentpage by 1 when clicking.
  currentpage--;
  list.textContent = "";
  await setURL();
  let result = await resultJson(url);
  createListElements(result);  
  checkingPages();
})

function checkingPages() {
  //if user is on first page, previous button will get disabled and hover gets removed.
    if (currentpage == 1) {
      prePageBtn.disabled = true;
      prePageBtn.classList.remove("pre-hover");
    } else if (currentpage > 1) {
      prePageBtn.disabled = false;
      prePageBtn.classList.add("pre-hover");
    }
}

function buttonVisibility(run){
  //if run bool is equal to true then pre- next buttons are visible.
  if (run == true){
    prePageBtn.style.visibility = 'visible';
    nextPageBtn.style.visibility = 'visible';
  } else {
    prePageBtn.style.visibility = 'hidden';
    nextPageBtn.style.visibility = 'hidden';
  }
}