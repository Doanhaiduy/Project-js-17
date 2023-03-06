let i = JSON.parse(localStorage.getItem("counter")) || 1;

const list = document.querySelector(".movies");
const next = document.querySelector(".btn.next");
const pre = document.querySelector(".btn.pre");
const pages = document.querySelectorAll(".btn.btn-page");
function render() {
    let API_URL =
        "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=" +
        i;
    const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
    const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';
    fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
            data.results.forEach((element) => {
                let movie = document.createElement("div");
                movie.className = "movie-item";
                movie.innerHTML = `<img src="${IMG_PATH}${element.poster_path}" alt="" />
                    <div class="info info-1">
                        <h2 class="heading">${element.title}</h2>
                        <span>${element.vote_average}</span>
                    </div>
                    <div class="info-2">
                        <span>Overview</span>
                        <p class="desc">
                            ${element.overview}
                        </p>
                    </div>`;
                list.appendChild(movie);
                if (i <= 1) {
                    pre.classList.add("active");
                    // return;
                } else {
                    pre.classList.remove("active");
                }
                if (i >= 10) {
                    next.classList.add("active");
                } else {
                    next.classList.remove("active");
                }
            });
        })
        .then(() => {
            const search = document.querySelector(".search");
            const list_movies = document.querySelectorAll(".movie-item");
            search.addEventListener("input", () => {
                let ok = false;
                let error = document.querySelector(".no-find");
                const name = search.value.toLowerCase();
                list_movies.forEach((item) => {
                    if (item.querySelector("h2").innerText.toLowerCase().includes(name)) {
                        item.style.display = "block";
                        ok = true;
                    } else {
                        item.style.display = "none";
                    }
                });
                if (ok) {
                    error.classList.remove("active");
                } else {
                    error.classList.add("active");
                    error.querySelector("strong").innerText = name;
                }
            });
        })
        .catch((error) => {
            console.log("Error");
        });
}

render();
document.querySelector(".btn.btn-page.active").classList.remove("active");
pages[i - 1].classList.add("active");
next.addEventListener("click", () => {
    if (i >= 10) {
        next.classList.add("active");
    } else {
        i++;
        list.innerHTML = "";
        next.classList.remove("active");
        render();
        pages[i - 1].classList.add("active");
        document.querySelector(".btn.btn-page.active").classList.remove("active");
        localStorage.setItem("counter", i);
    }
});

pre.addEventListener("click", (event) => {
    if (i == 1) {
        pre.classList.add("active");
    } else {
        i--;
        list.innerHTML = "";
        render();
        document.querySelector(".btn.btn-page.active").classList.remove("active");
        pages[i - 1].classList.add("active");
        localStorage.setItem("counter", i);
    }
});

pages.forEach((item) => {
    item.addEventListener("click", () => {
        if (!item.classList.contains("active")) {
            document.querySelector(".btn.btn-page.active").classList.remove("active");
            item.classList.add("active");
            localStorage.setItem("counter", parseInt(item.getAttribute("data-set")));
            window.location = "index.html";
        } else {
            return;
        }
    });
});
