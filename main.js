import galleryItemsArr from "./gallery-items.js";
const ulGallery = document.querySelector("ul.js-gallery");
const galleryItems = galleryItemsArr.map(
  (x) => `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${x.original}"
  >
    <img
      class="gallery__image"
      src="${x.preview}"
      data-source="${x.original}"
      alt="${x.description}"
    />
  </a>
</li>`
);
ulGallery.innerHTML = galleryItems.join("");

const modalWindow = document.querySelector("div.js-lightbox");
const modalImage = document.querySelector("img.lightbox__image");
const closeButton = document.querySelector('button[data-action="close-lightbox"]');
const lightboxOverlay = document.querySelector("div.lightbox__overlay");

let currentImg = null;

function showOnModal(img) {
  if(img && img.nodeName === "IMG") {
    modalImage.src = img.dataset["source"];
    modalImage.alt = img.alt;
    currentImg = img;
  }
}

function сloseModal() {
  modalImage.src = "";
  modalImage.alt = "";
  modalWindow.classList.remove("is-open");
  currentImg = null;
}

function getImgOfLi(li)
{
  if(li) {
    return li.querySelector('a>img');
  }
  return null;
}
function getCurrentLi()
{
  if(currentImg){
    return currentImg.parentNode.parentNode;
    //         ^          ^          ^
    //        img         a          li
  }
  return null;
}

function getPreviousImg() {
  const curLi = getCurrentLi();
  if(curLi) {
    return getImgOfLi(curLi.previousElementSibling);
  }
  return null;
}

function getNextImg() {
  const curLi = getCurrentLi();
  if(curLi) {
    return getImgOfLi(curLi.nextElementSibling);
  }
  return null;
}

function onGalleryClick(e){
 e.preventDefault();
 if(e.target.nodeName === "IMG") {
    showOnModal(e.target);
    modalWindow.classList.add("is-open");
 }
}

ulGallery.addEventListener('click',onGalleryClick);

function onClose() {
  сloseModal();
}

closeButton.addEventListener("click",onClose);
lightboxOverlay.addEventListener("click",onClose);

function onKeyPush(e) {
  switch(e.code) {
    case "Escape":
      сloseModal();
      break;
    case "ArrowLeft":
      showOnModal(getPreviousImg());
      break;
    case "ArrowRight":
      showOnModal(getNextImg());
      break;
  }
}
window.addEventListener("keydown", onKeyPush);