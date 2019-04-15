const handleError = (message) => {
  $("#errorMessage").text(message);
  $("#messageBox").animate({width:'toggle'},350);
}

const sendAjax = (action, data) => {
  $.ajax({
    cache: false,
    type: "POST",
    url: action,
    data: data,
    dataType: "json",
    success: (result, status, xhr) => {
      $("#messageBox").animate({width:'hide'},350);

      window.location = result.redirect;
    },
    error: (xhr, status, error) => {
      const messageObj = JSON.parse(xhr.responseText);

      handleError(messageObj.error);
    }
  });        
}

$(document).ready(() => {
  $("#signupForm").on("submit", (e) => {
    e.preventDefault();

    $("#messageBox").animate({width:'hide'},350);

    if($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
      handleError("All fields are required");
      return false;
    }

    if($("#pass").val() !== $("#pass2").val()) {
      handleError("Passwords do not match");
      return false;           
    }

    sendAjax($("#signupForm").attr("action"), $("#signupForm").serialize());

    return false;
  });

  $("#loginForm").on("submit", (e) => {
    e.preventDefault();

    $("#messageBox").animate({width:'hide'},350);

    if($("#user").val() == '' || $("#pass").val() == '') {
      handleError("Username or password is empty");
      return false;
    }

    sendAjax($("#loginForm").attr("action"), $("#loginForm").serialize());

    return false;
  });
  
  $("#postForm").on("submit", (e) => {
    e.preventDefault();

    if($("#postTitle").val() == '' || $("#postContent").val() == '') {
      handleError("All fields are required");
      return false;
    }

    sendAjax($("#postForm").attr("action"), $("#postForm").serialize());

    return false;
  });

  $("#changeForm").on("submit", (e) => {
    e.preventDefault();

    if($("#pass").val() == '' || $("#newPass").val() == '' || $("#newPass2").val() == '') {
      handleError("All fields are required");
      return false;
    }

    sendAjax($("#changeForm").attr("action"), $("#changeForm").serialize());

    return false;
  });

  $("#deleteForm").on("submit", (e) => {
    e.preventDefault();

    sendAjax($("#deleteForm").attr("action"), $("#deleteForm").serialize());

    return false;
  });

  $("#editForm").on("submit", (e) => {
    e.preventDefault();

    sendAjax($("#editForm").attr("action"), $("#editForm").serialize());

    return false;
  });
});