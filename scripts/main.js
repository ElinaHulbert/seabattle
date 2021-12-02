
document.getElementById("button").addEventListener("click", function () {
  document.querySelector(".bg-popContainer").style.display = "flex";
  });
  
  document.getElementById("closer").addEventListener("click", function () {
    document.querySelector(".bg-popContainer").style.display = "none";
  });
  
  let id = document.getElementById("bg-popContainer");



  window.onload = function () {
    document.onclick = function (e) {
      if (e.target.id == "bg-popContainer") {
        id.style.display = "none";
      }
    };
  };