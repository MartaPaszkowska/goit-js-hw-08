"use strict";
const images = [
	{
		preview:
			"https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg",
		original:
			"https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg",
		description: "Hokkaido Flower",
	},
	{
		preview:
			"https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
		original:
			"https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
		description: "Container Haulage Freight",
	},
	{
		preview:
			"https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
		original:
			"https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
		description: "Aerial Beach View",
	},
	{
		preview:
			"https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
		original:
			"https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
		description: "Flower Blooms",
	},
	{
		preview:
			"https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
		original:
			"https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
		description: "Alpine Mountains",
	},
	{
		preview:
			"https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
		original:
			"https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
		description: "Mountain Lake Sailing",
	},
	{
		preview:
			"https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
		original:
			"https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
		description: "Alpine Spring Meadows",
	},
	{
		preview:
			"https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
		original:
			"https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
		description: "Nature Landscape",
	},
	{
		preview:
			"https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
		original:
			"https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
		description: "Lighthouse Coast Sea",
	},
];
class Gallery {
	constructor({ images, galleryRoot, modalRoot }) {
		this.images = images;
		this.createGallery(galleryRoot);
		this.modal = this.createModal(modalRoot);
		this.buttonModal(galleryRoot);
	}

	createGallery(galleryRoot) {
		const imgs = this.images.map(this.createImage);
		galleryRoot.append(...imgs);
	}

	createImage({ description, original, preview }) {
		const container = document.createElement("li");
		container.classList.add("allery-item");

		const a = document.createElement("a");
		a.classList.add("gallery-link");
		a.href = original;

		const img = document.createElement("img");
		img.classList.add("gallery-image");
		img.src = preview;
		img.alt = description;
		img.dataset.source = original;

		container.appendChild(a);
		container.appendChild(img);
		return container;
	}
	createModal(modalRoot) {
		const onShow = this.renderModal.bind(this);
		return basicLightbox.create(modalRoot, { onShow });
	}
	renderModal(lightbox) {
		const currentImage = this.getCurrentImage();
		if (currentImage === null) return lightbox.close();

		const modal = lightbox.element();

		const img = modal.querySelector("img");
		img.alt = currentImage.description;
		img.src = currentImage.original;

		modal.querySelector("p").textContent = currentImage.description;
		modal.querySelector("button").onClick = lightbox.close;
	}
	buttonModal(galleryRoot) {
		if (!this.modal) return;
		galleryRoot.addEventListener("click", (event) => {
			if (
				event.target.tagName === "li" ||
				event.target.parentNode.tagName === "li"
			);
			this.currentImageIndex =
				event.target.id || event.target.parentNode.id;
			this.modal.show();
		});
	}

	//	document.addEventListener("keydown", () => {
	//		this.modal.close();
	//});
}
const gallery = new Gallery({
	images,
	galleryRoot: document.querySelector(".gallery"),
	modalRoot: document.querySelector("modal"),
});
