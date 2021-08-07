import { guns } from "./guns.json";

const createGun = (gun) => {
  const div = document.createElement("div");
  div.className = "weapon";
  div.innerHTML = `<h3>${gun.name}</h3><img src="${gun.src}" alt="">`;
  return div;
};

const createHead = (src) => {
   const meta = document.createElement('meta')
   meta.setAttribute('name', 'og:image')
   meta.setAttribute('content', src)
   document.querySelector('head').appendChild(meta)
}

guns.forEach((gun) =>
  document.querySelector(".weapons").appendChild(createGun(gun))
);

const overlayElement = document.querySelector("#overlay");
const image = overlayElement.querySelector("img");

const urlParams = new URLSearchParams(window.location.search);
const activeWeapon = decodeURIComponent(urlParams.get("gun"));

if (activeWeapon !== "null" && !!activeWeapon) {
  try {
    overlayElement.removeAttribute("hidden");
    const { src } = guns.find((x) => x.name === activeWeapon);
    image.setAttribute("src", src);
    createHead(src)
  } catch (e) {
    console.error(e);
  }
} else {
    createHead('https://i.imgur.com/mpVR7I9.jpg')
}

document.querySelectorAll(".weapons img").forEach((el) =>
  el.addEventListener("click", (ev) => {
    overlayElement.removeAttribute("hidden");
    image.setAttribute("src", ev.currentTarget.src);
    const weaponName = ev.currentTarget.parentNode.querySelector("h3")
      .textContent;
    window.history.pushState(
      null,
      null,
      `?gun=${encodeURIComponent(weaponName)}`
    );
  })
);

document.querySelector("#close-overlay").addEventListener("click", () => {
  overlayElement.setAttribute("hidden", true);
  window.history.replaceState(
    {},
    document.title,
    window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname
  );
});

document.addEventListener("keydown", (ev) => {
  if (ev.code !== "Escape") return;

  overlayElement.setAttribute("hidden", true);
  window.history.replaceState(
    {},
    document.title,
    window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname
  );
});
