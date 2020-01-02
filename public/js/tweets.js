// Update tweet
const tweetEditBtns = document.querySelectorAll(".tweet-header__edit-btn");
const tweetBody = document.querySelectorAll(".tweet-body__editable-content");
const tweetUpdateForm = document.querySelectorAll(".tweet-body__update-form");

tweetEditBtns.forEach((btn, i) => {
    btn.onclick = e => {
        e.preventDefault();

        if (tweetBody[i].style.display !== "none") {
            tweetUpdateForm[i].style.display = "block";
            tweetBody[i].style.display = "none";
        } else {
            tweetUpdateForm[i].style.display = "none";
            tweetBody[i].style.display = "block";
        }
    };
});
