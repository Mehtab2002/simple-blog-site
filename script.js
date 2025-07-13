

document.getElementById("imageInput").addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      document.querySelector(".image-box img").src = e.target.result;
      imageurl = e.target.result;
    };

    reader.readAsDataURL(file);
  } else {

    document.querySelector(".image-box img").src = "defualt.jpg";


  }
});

if (!localStorage.getItem("Blogs")) {
  let array = []
  localStorage.setItem("Blogs", JSON.stringify(array));
}


function post() {
  let imageurl = document.querySelector(".image-box img").src;
  let title = document.getElementsByClassName("btitle")[0].value;
  let description = document.getElementsByClassName("bdescription")[0].value;

  if (document.querySelector(".image-box img").src.includes("default.jpg") ||
    document.querySelector(".btitle").value.trim().length < 1 ||
    document.querySelector(".bdescription").value.trim().length < 1) {
    alert("Please Fill the Fields to Generate the Blogs")
  } else {

    let blogpost = {

      imglocation: imageurl,
      btitle: title,
      desc: description
    };


    let blogposts = JSON.parse(localStorage.getItem("Blogs")) || [];
    blogposts.push(blogpost)
    localStorage.setItem("Blogs", JSON.stringify(blogposts))
    document.getElementsByClassName("cardcontainer")[0].innerHTML = "";
    fetchblogs()

 document.querySelector(".image-box img").src = "default.jpg"
 document.querySelector(".btitle").value = ""
 document.querySelector(".bdescription").value = ""

  }


}


function fetchblogs() {

  let array = JSON.parse(localStorage.getItem("Blogs")) || [];
  let card = document.querySelector(".cardcontainer")
  array.forEach(element => {
let checkdesc = element.desc;
console.log()

if (checkdesc.length>200) {
  card.insertAdjacentHTML("beforeend", ` <div class="card">

                <div class="image">

                    <div><img src="${element.imglocation}" alt=""></div>

                </div>

                <div class="description">
                    <div class="title">
                        <h1>${element.btitle}</h1>
                    </div>
                    <div class="desc">
                        <p>
<p class="desc-text">
  ${element.desc.slice(0, 200)}<span class="dots">...</span>
  <span class="more-text" style="display:none;">${element.desc.slice(200)}</span>
</p>
<span class="read-more-btn" onclick="toggleReadMore(this)">Read More</span>

                        </p>
                    </div>
                </div>

<div class="delete"><button onclick="dlt(this)">Delete</button></div>
            </div>`)
}else{

  card.insertAdjacentHTML("beforeend", ` <div class="card">

                <div class="image">

                    <div><img src="${element.imglocation}" alt=""></div>

                </div>

                <div class="description">
                    <div class="title">
                        <h1>${element.btitle}</h1>
                    </div>
                    <div class="desc">
                        <p>
<p class="desc-text"> ${element.desc}   </p>
                    </div>
                </div>

<div class="delete"><button onclick="dlt(this)">Delete</button></div>
            </div>`)

}
    



  });
}

fetchblogs()

// localStorage.clear(0)


function dlt(btn) {


  const card = btn.closest(".card"); // Replace ".card" with your actual card class or wrapper div

  // Then find the blog title inside that card
  const blogTitle = card.querySelector(".title h1").textContent;



  let arr = JSON.parse(localStorage.getItem("Blogs")) || [];
  
  arr = arr.filter(item => item.btitle !== blogTitle);
  
  localStorage.setItem("Blogs", JSON.stringify(arr))
  

document.getElementsByClassName("cardcontainer")[0].innerHTML = "";
    fetchblogs()
}

function toggleReadMore(btn) {
  const descText = btn.previousElementSibling;
  const dots = descText.querySelector(".dots");
  const moreText = descText.querySelector(".more-text");

  if (moreText.style.display === "none") {
    moreText.style.display = "inline";
    dots.style.display = "none";
    btn.textContent = "Read Less";
  } else {
    moreText.style.display = "none";
    dots.style.display = "inline";
    btn.textContent = "Read More";
  }
}
