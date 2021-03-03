import { cold, mw } from "./guns.json";

const createGun = (gun) => {
  const div = document.createElement("div");
  div.className = "weapon";
  div.innerHTML = `<h3>${gun.name}</h3><img src="${gun.src}" alt="">`;
  return div;
};

cold.forEach((gun) =>
  document.querySelector(".cold-war").appendChild(createGun(gun))
);
mw.forEach((gun) =>
  document.querySelector(".warfare").appendChild(createGun(gun))
);

const overlayElement = document.querySelector("#overlay");
const image = overlayElement.querySelector("img");

const urlParams = new URLSearchParams(window.location.search);
const activeWeapon = decodeURIComponent(urlParams.get("gun"));

if (activeWeapon !== "null" && !!activeWeapon) {
  try {
    overlayElement.removeAttribute("hidden");
    const activeElement = Array.from(document.querySelectorAll("h3")).filter(
      (x) => x.textContent === activeWeapon
    );
    const { src } = activeElement[0].parentNode.querySelector("img");
    image.setAttribute("src", src);
    document.querySelector('meta[name="og:image"]').setAttribute('content', src)
  } catch (e) {
    console.error(e);
  }
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
