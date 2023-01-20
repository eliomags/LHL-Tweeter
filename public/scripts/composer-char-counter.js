$(document).ready(function () {
  // --- our code goes here ---
  $("#tweet-text").on("input", function () {
    let countChar = $(this).val().length;
    let remainingChar = 140 - countChar;
    $(this).parent().find(".counter").val(remainingChar);
    if (remainingChar < 0) {
      $(this).parent().find(".counter").addClass("negative");
      $("#error-msg").text(
        "Your tweet is too long. Please limit it to 140 characters."
      );
      $("#error-msg").slideDown();
    } else {
      $(this).parent().find(".counter").removeClass("negative");
      $("#error-msg").slideUp();
    }
  });
});
