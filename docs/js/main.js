// 1. START TYPING TEXT

const typingText = document.querySelector(".typing-text");
const quote = [
  "The most important days in your life are the day you are born and the day you find out why ~ Mark Twain ' ",
];
const runningTxt = quote;
let currentTxt = "";
let count = 0;
let textIndex = 0;
let words = "";

function typing() {
  if (count == runningTxt.length) {
    count = 0;
  }

  currentTxt = runningTxt[count];
  words = currentTxt.slice(0, ++textIndex);
  typingText.innerHTML = words;

  if (words.length == currentTxt.length) {
    ++count;
    textIndex = 0;
  }

  setTimeout(typing, 100);
}

typing();
// 1. END TYPING TEXT

// 2. START ANIMATION NAVBAR
const humberger = document.getElementById("humberger");
const nav = document.querySelector("nav");
humberger.addEventListener("click", function () {
  humberger.classList.toggle("humberger_active");
  nav.classList.toggle("hidden");
});
// 2. END ANIMATION NAVBAR

// 3. START NAVBAR SCROLL DOWN
// panggil dulu class header
const header = document.querySelector("header");

// ketika window di scroll down maka hapus display absolut ganti dengan display fixed
window.onscroll = function () {
  if (document.documentElement.scrollTop > 20) {
    header.classList.remove("absolute");
    header.classList.add("display_baru_header");
  } else {
    header.classList.add("absolute");
    header.classList.remove("display_baru_header");
  }
};
// kemudian tambahkan warna merah bg-200
// 3. END NAVBAR SCROLL DOWN

// 4. START NAV COLORS CLICK
// cari dulu elements nav ul li a
const nav_ul_li_a = document.querySelectorAll("nav ul li a");
// jika terdapat dark hapus class dark jika tidak ada tambahkan
nav_ul_li_a.forEach((nav) => {
  nav.addEventListener("click", function () {
    nav_ul_li_a.forEach((link) => {
      link.classList.remove("active");
    });
    nav.classList.add("active");
  });
});
// 4. END NAV COLORS CLICK

// 5.COUROSEL START
const btns = Array.from(document.querySelectorAll("[data-carousel-button]"));
btns.forEach((btn) => {
  btn.addEventListener("click", function () {
    setCarousel(btn);
  });
});

function setCarousel(btn) {
  const offset = btn.dataset.carouselButton === "prev" ? -1 : 1;
  const slider = btn.closest("[data-carousel").querySelector("[data-slider");
  const activeSlider = slider.querySelector("[data-active]");
  console.log(activeSlider);
  let newIndex = [...slider.children].indexOf(activeSlider) + offset;

  if (newIndex < 0) newIndex = slider.children.length - 1;
  if (newIndex >= slider.children.length) newIndex = 0;

  slider.children[newIndex].dataset.active = true;
  delete activeSlider.dataset.active;
}
// 5.COUROSEL END

// 6. SCROOL TO TOP
const to_top = document.querySelector("#to_top");
to_top.addEventListener("click", function () {
  smoothscroll();
});

function smoothscroll() {
  var currentScroll =
    document.documentElement.scrollTop || document.body.scrollTop;
  if (currentScroll > 0) {
    window.requestAnimationFrame(smoothscroll);
    window.scrollTo(0, currentScroll - currentScroll / 20);
  }
}
// 6. SCROOL TO TOP

// 7. SEND MESSSAGE START
const btnSendMessage = document.getElementById("sendMessage");
const alertMessage = document.getElementById("alert");
const nameCostumer = document.getElementById("name");
const emailCostumer = document.getElementById("email");
const messageCostumer = document.getElementById("textMessage");
btnSendMessage.addEventListener("click", function () {
  setMessage();
});

function setMessage() {
  if (nameCostumer.value === "") {
    alertMessage.classList.add("alertEroor");
    return (alertMessage.innerHTML = "The field name is required");
  }
  if (nameCostumer.value.length >= 42) {
    alertMessage.classList.add("alertEroor");
    return (alertMessage.innerHTML = "The name is too long!");
  }

  if (emailCostumer.value === "") {
    alertMessage.classList.add("alertEroor");
    return (alertMessage.innerHTML = "The field email is required ");
  }
  if (messageCostumer.value === "") {
    alertMessage.classList.add("alertEroor");
    return (alertMessage.innerHTML = "The field message is required ");
  }
  const data = {
    name: nameCostumer.value,
    email: emailCostumer.value,
    message: messageCostumer.value,
  };
  saveMessage(data);
}

function saveMessage(data) {
  if (alertMessage.classList.contains("alertEroor")) {
    alertMessage.classList.remove("alertEroor");
  }
  alertMessage.classList.add("alertSuccess");
  alertMessage.innerHTML = `Thankyou ${nameCostumer.value}  Your message was added`;
  nameCostumer.value = "";
  emailCostumer.value = "";
  messageCostumer.value = "";
  nameCostumer.setAttribute("disabled", true);
  emailCostumer.setAttribute("disabled", true);
  messageCostumer.setAttribute("disabled", true);
  btnSendMessage.classList.add("hidden");
}
// 7. SEND MESSSAGE END

// 8. DARK MODE
const mode = document.querySelector(".mode");
const btnMode = Array.from(document.querySelectorAll("[data-mode]"));
const malam = btnMode[0];
const siang = btnMode[1];
const html = document.querySelector("html");

btnMode.forEach((mode) => {
  mode.addEventListener("click", function () {
    if (mode.dataset.mode == "malam") {
      html.classList.add("dark");
      mode.classList.add("hidden");
      siang.classList.remove("hidden");
    } else {
      html.classList.remove("dark");
      mode.classList.add("hidden");
      malam.classList.remove("hidden");
    }
  });
});
// 8. END DARK MODE

// GET API ARTICLE
const data_selengkapnya = document.getElementById("data_selengkapnya");
const blogs = document.querySelector(".blogs");
let api, values, dataNewsPopular, allDataBlogs;

// tampilkan data article populer
(function getData() {
  fetchData();
})();

// FETCH DATA API
function fetchData() {
  Promise.all([
    fetch(
      `https://newsapi.org/v2/everything?q=apple&from=2022-10-24&to=2022-10-24&sortBy=popularity&apiKey=baaca9b7278b43b89e07b1bfea6ad85b`
    ),
    fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=baaca9b7278b43b89e07b1bfea6ad85b`
    ),
    fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=baaca9b7278b43b89e07b1bfea6ad85b`
    ),
  ])
    .then((responses) => {
      return Promise.all(
        responses.map((response) => {
          return response.json();
        })
      );
    })
    .then((data) => {
      allDataBlogs = data;
      getDataBlogs(data);
    });
}
let x = 1;
data_selengkapnya.addEventListener("click", function () {
  console.log("x", x);
  x += 1;
  if (x > 3) return (x = 0);
  getDataBlogs(allDataBlogs);
});

function getDataBlogs(data) {
  const [popular, topHeadLine, topNews] = data;
  const dataPopuler = Array.from(popular.articles);
  const dataTopHeadLine = Array.from(topHeadLine.articles);
  const dataTopNews = Array.from(topNews.articles);
  setDataPopuler(dataPopuler);
  setTopHeadLine(dataTopHeadLine);
  setTopNews(dataTopNews);
}

// Set data populer
function setDataPopuler(data) {
  if (x == 1) {
    window.location.href = "#blogs";
    dataNewsPopular = data.slice(0, 8);
    data_selengkapnya.innerHTML = `<div class="flex flex-col dark:bg-primary dark:text-white">
                                        <span class="text-sm font-base md:text-xl">NEXT</span>
                                        <i class="fa fa-arrow-down" aria-hidden="true"></i>
                                      </div>`;
  } else if (x == 2) {
    dataNewsPopular = data.slice(8, 16);
  } else if (x == 3) {
    window.location.href = "#blogs";
    dataNewsPopular = data;
    data_selengkapnya.innerHTML = ` <div class="flex flex-col">
                                      <span class="text-sm font-base">PREVIOUS</span>
                                       <i class="fa fa-arrow-up" aria-hidden="true"></i
                                    </div>`;
  }

  let UpdateUINewsPopular = "";
  dataNewsPopular.forEach((data) => {
    const decription = data.description.substring(0, 100);
    const results = {
      name: data.source.name,
      author: data.author,
      title: data.title,
      description: decription,
      thumbnail: data.urlToImage,
      url: data.url,
      published: data.publishedAt,
    };
    UpdateUINewsPopular += UIPopular(results);
  });
  document.querySelector(".blogs").innerHTML = UpdateUINewsPopular;
}

// Set data topHeadLine
function setTopHeadLine(dataTopHeadLine) {
  let updateUITopHeadline = "";
  dataTopHeadLine.slice(0, 5).forEach((data) => {
    const decription = data.description.substring(0, 100);
    const results = {
      name: data.source.name,
      title: data.title,
      description: decription,
      thumbnail: data.urlToImage,
      url: data.url,
    };
    updateUITopHeadline += UITopHeadLine(results);
  });
  document.getElementById("topHeadLine").innerHTML = updateUITopHeadline;
}

// Set data topNews
function setTopNews(dataTopNews) {
  let updateUITopNews = "";
  dataTopNews.slice(0, 9).forEach((data) => {
    const decription = data.description.substring(0, 100);
    const results = {
      title: data.title,
      description: decription,
      thumbnail: data.urlToImage,
      url: data.url,
    };
    updateUITopNews += UITopNews(results);
  });
  document.getElementById("TopNews").innerHTML = updateUITopNews;
}

function UIPopular(results) {
  return `
  <div
  class="bg-slate-200 pb-2 rounded-md overflow-hidden shadow-lg hover:scale-105  duration-200"
    >
      <div
        class="w-full bg-sky-300  overflow-hidden mb-3">
        <img
          src="${results.thumbnail}"
          alt="post1"
          class="w-full h-full sm:h-[210px] object-fit object-center"
        />
      </div>
      <a href="${results.url}" target="_blank">
      <div class="px-2 md:px-[10px] lg:px-[16px] cursor-pointer">
      <h2 class="text-lg font-bold text-dark  blogs_select">
        ${results.title}
      </h2>
      <p class="text-[12px] font-thin text-sky-400 mb-1">
        ${results.author}
      </p>
      <p class="text-[11px] font-thin text-secondary MB-2">
        ${results.published}
      </p>
      <p class="font-thin text-sm text-secondary md:text-base">
        ${results.description}
      </p>
      <a href="${results.url}" class="text-slate-200 text-sm md:text-bold cursor-pointer w-full bg-primary text-center rounded-lg shadow-md py-2 block my-4" target="_blank" 
          >Read more</a
        >
    </div>
      </a>
  </div>
  
  `;
}

// UI Topheadline
function UITopHeadLine(results) {
  return `
  <div
    class="bg-slate- active:opacity-50 bg-slate-200 rounded-sm overflow-hidden dark:bg-black dark:text-white"
  >
    <a href="${results.url}">
      <img
        src="${results.thumbnail}"
        alt="test"
        class="mb-2 rounded-sm shadow-sm"
      />
      <div class="px-2">
        <h3
          class="font-medium text-sm lg:truncate underline text-blue-500 mb-1"
        >
          ${results.title}
        </h3>
        <p class="text-[12px] font-thin hidden md:block">
          ${results.description}
        </p>
      </div>
    </a>
  </div>
    `;
}

// UI TopNews
function UITopNews(results) {
  return `
  <div
  class="bg-slate- active:opacity-50 bg-slate-200 rounded-sm overflow-hidden dark:bg-black dark:text-white"
>
  <a href="${results.url}">
    <img
      src="${results.thumbnail}"
      alt="${results.title}"
      class="mb-2 rounded-sm shadow-sm"
    />
    <div class="px-2 md:pb-2">
      <h3
        class="font-medium text-sm lg:truncate underline text-blue-500 md:text-lg mb-1 truncate"
      >${results.title}</h3>
      <p
        class="text-[12px] md:text-base font-thin md:block md:font-medium"
      >${results.description}
      </p>
      <a
        href="${results.url}"
        class="text-slate-200 text-sm md:text-bold cursor-pointer w-full bg-primary text-center rounded-lg shadow-md py-2 block my-4"
        target="_blank"
        >Read more</a
      >
    </div>
  </a>
</div>    `;
}

// GET API ARTICLE
