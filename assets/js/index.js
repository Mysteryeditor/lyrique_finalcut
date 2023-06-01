$num = $(".ui-card").length;
$even = $num / 2;
$odd = ($num + 1) / 2;

if ($num % 2 == 0) {
  $(".ui-card:nth-child(" + $even + ")").addClass("active");
  $(".ui-card:nth-child(" + $even + ")")
    .prev()
    .addClass("prev");
  $(".ui-card:nth-child(" + $even + ")")
    .next()
    .addClass("next");
} else {
  $(".ui-card:nth-child(" + $odd + ")").addClass("active");
  $(".ui-card:nth-child(" + $odd + ")")
    .prev()
    .addClass("prev");
  $(".ui-card:nth-child(" + $odd + ")")
    .next()
    .addClass("next");
}

$(".ui-card").click(function () {
  $slide = $(".active").width();
  console.log($(".active").position().left);

  if ($(this).hasClass("next")) {
    $(".container")
      .stop(false, true)
      .animate({ left: "-=" + $slide });
  } else if ($(this).hasClass("prev")) {
    $(".container")
      .stop(false, true)
      .animate({ left: "+=" + $slide });
  }

  $(this).removeClass("prev next");
  $(this).siblings().removeClass("prev active next");

  $(this).addClass("active");
  $(this).prev().addClass("prev");
  $(this).next().addClass("next");
});

// Keyboard nav
$("html body").keydown(function (e) {
  if (e.keyCode == 37) {
    // left
    $(".active").prev().trigger("click");
  } else if (e.keyCode == 39) {
    // right
    $(".active").next().trigger("click");
  }
});


// for the artist tabs
function openTab(evt, tabName) {
  var i, tabContent, tabLinks;

  tabContent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }

  tabLinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tabLinks.length; i++) {
    tabLinks[i].className = tabLinks[i].className.replace(" active", "");
  }

  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}
