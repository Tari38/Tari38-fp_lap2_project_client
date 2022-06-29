//
// ─── MODAL RENDERING ────────────────────────────────────────────────────────────
//
document.getElementById("registration-form").addEventListener("submit", function(e) {
let checkForm = this;
    if(form.email.value == "") {
      alert("Please enter a valid Email address");
      form.email.focus();
      e.preventDefault();
    }
    else if(form.password1.value == "") {
      alert("Please enter a password");
      form.password1.focus();
      e.preventDefault();
    }
    else if(form.password2.value == "") {
      alert("Please retype your password");
      form.password2.focus();
      e.preventDefault();
    }
  }, false);

  document.addEventListener("DOMContentLoaded", function() {
    var modalWrapper = document.getElementById("modal_wrapper");
    var modalWindow  = document.getElementById("modal_window");
  
    var openModal = function(e)
    {
      modalWrapper.className = "overlay";
      modalWindow.style.marginTop = (-modalWindow.offsetHeight)/2 + "px";
      modalWindow.style.marginLeft = (-modalWindow.offsetWidth)/2 + "px";
      e.preventDefault();
    };
  
    var closeModal = function(e)
    {
      modalWrapper.className = "";
      e.preventDefault();
    };
  
    var clickHandler = function(e) {
      if(e.target.tagName == "DIV") {
        if(e.target.id != "modal_window") closeModal(e);
      }
    };
  
    var keyHandler = function(e) {
      if(e.keyCode == 27) closeModal(e);
    };
  
    document.getElementById("modal_open").addEventListener("click", openModal, false);
    document.getElementById("modal_close").addEventListener("click", closeModal, false);
    document.addEventListener("click", clickHandler, false);
    document.addEventListener("keydown", keyHandler, false);
  }, false);
