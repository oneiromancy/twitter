// Update profile image
const editProfileImg = document.querySelector("#profile-card__edit-btn");
const imgUploaderContainer = document.querySelector(
    ".image-uploader__container"
);
const confirmProfilePicture = document.querySelector(
    ".profile-picture__confirmation-btn"
);

editProfileImg.onchange = e => {
    imgUploaderContainer.style.display = "none";
    confirmProfilePicture.style.display = "block";
};
