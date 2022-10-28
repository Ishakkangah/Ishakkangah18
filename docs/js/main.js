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
const nav = document.getElementById("nav_menu");
humberger.addEventListener("click", function () {
  nav.classList.toggle("hidden");
  humberger.classList.toggle("humberger_active");
});

// 2. END ANIMATION NAVBAR

// 3. START NAVBAR SCROLL DOWN
// panggil dulu class header
const header = document.querySelector("header");

// ketika window di scroll down maka hapus display absolut ganti dengan display fixed
window.onscroll = function () {
  const btnToTop = document.getElementById("to_top");
  if (document.documentElement.scrollTop > 20) {
    btnToTop.classList.remove("hidden");
    btnToTop.classList.add("flex");
    header.classList.remove("absolute");
    header.classList.add("display_baru_header");
  } else {
    header.classList.add("absolute");
    header.classList.remove("display_baru_header");
    btnToTop.classList.remove("flex");
    btnToTop.classList.add("hidden");
  }
};
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
// const to_top = document.querySelector("#to_top");
// to_top.addEventListener("click", function () {
//   smoothscroll();
// });

// function smoothscroll() {
//   var currentScroll =
//     document.documentElement.scrollTop || document.body.scrollTop;
//   if (currentScroll > 0) {
//     window.requestAnimationFrame(smoothscroll);
//     window.scrollTo(0, currentScroll - currentScroll / 20);
//   }
// }
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
      localStorage.theme = "dark";
    } else {
      html.classList.remove("dark");
      mode.classList.add("hidden");
      malam.classList.remove("hidden");
      localStorage.theme = "light";
    }
  });
});
// 8. END DARK MODE

// GET API ARTICLE
const data_selengkapnya = document.getElementById("data_selengkapnya");
const searchArticles = document.getElementById("search");
const alertArticles = document.querySelector(".alertArticles");

searchArticles.addEventListener("keyup", function (e) {
  // jika element key adalah enter dan isi dari input searrch ada
  if (e.key === "Enter" && searchArticles.value != "") {
    const data = searchArticles.value;
    getSearchArticles(data);
  }
});

function getSearchArticles(data) {
  const api = `https://newsdata.io/api/1/news?apikey=pub_12793f8312d35521e2915beaf5408025fe4c9&q=${data}`;
  data = fetch(api).then((res) => {
    if (res.status == 200) {
      return res.json();
    } else {
      alertArticles.innerHTML = res.statusText;
    }
  });
  data.then((d) => {
    let UpdateUINewsIndonesia = "";
    values = d.results;
    values.forEach((value) => {
      const results = {
        title: value.title,
        description: value.description.substring(0, 100),
        url: value.link,
        thumbnail: value.image_url,
        category: value.category,
        published: value.pubDate,
      };
      console.log("result", results);
      UpdateUINewsIndonesia += UINewsIndonesia(results);
    });
    document.querySelector(".blogs").innerHTML = UpdateUINewsIndonesia;
  });
}

// tampilkan data article populer
(function getData() {
  fetchData();
})();

// pub_12793f8312d35521e2915beaf5408025fe4c9
// FETCH DATA API
function fetchData() {
  Promise.all([
    fetch(
      `https://newsdata.io/api/1/news?apikey=pub_12793f8312d35521e2915beaf5408025fe4c9&country=id,ca`
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
      getDataBlogs(data);
    });
}

function getDataBlogs(data) {
  const [NewsIndonesia] = data;
  const nIndonesia = NewsIndonesia;
  setNewsIndonesia(nIndonesia);
}

// Set Indonesia News
function setNewsIndonesia(data) {
  let UpdateUINewsIndonesia = "";
  dataNews = data.results;
  dataNews.forEach((data) => {
    const description = data.description.substring(0, 100);
    const results = {
      title: data.title,
      description: description,
      url: data.link,
      thumbnail: data.image_url,
      category: data.category,
      published: data.pubDate,
    };
    UpdateUINewsIndonesia += UINewsIndonesia(results);
  });
  document.querySelector(".blogs").innerHTML = UpdateUINewsIndonesia;
}

// UPDATE UI News Indonesia
function UINewsIndonesia(results) {
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
        ${results.category}
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
