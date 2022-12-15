$(document).ready(function() {
  // --- our code goes here ---
  $("#tweet-text").on('input', function() {
   let countChar = $(this).val().length;
   let remainingChar = 140 - countChar;
   $(this).parent().find(".counter").val(remainingChar)
   if (remainingChar < 0) {
    $(this).parent().find(".counter").addClass("negative")
   }
   else {
    $(this).parent().find(".counter").removeClass("negative")
   }
  })
});