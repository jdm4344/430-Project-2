"use strict";

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
  $("#messageBox").animate({ width: 'toggle' }, 350);
};

var sendAjax = function sendAjax(action, data) {
  $.ajax({
    cache: false,
    type: "POST",
    url: action,
    data: data,
    dataType: "json",
    success: function success(result, status, xhr) {
      $("#messageBox").animate({ width: 'hide' }, 350);

      window.location = result.redirect;
    },
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);

      handleError(messageObj.error);
    }
  });
};

$(document).ready(function () {
  $("#signupForm").on("submit", function (e) {
    e.preventDefault();

    $("#messageBox").animate({ width: 'hide' }, 350);

    if ($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
      handleError("All fields are required");
      return false;
    }

    if ($("#pass").val() !== $("#pass2").val()) {
      handleError("Passwords do not match");
      return false;
    }

    sendAjax($("#signupForm").attr("action"), $("#signupForm").serialize());

    return false;
  });

  $("#loginForm").on("submit", function (e) {
    e.preventDefault();

    $("#messageBox").animate({ width: 'hide' }, 350);

    if ($("#user").val() == '' || $("#pass").val() == '') {
      handleError("Username or password is empty");
      return false;
    }

    sendAjax($("#loginForm").attr("action"), $("#loginForm").serialize());

    return false;
  });

  $("#postForm").on("submit", function (e) {
    e.preventDefault();

    $("#messageBox").animate({ width: 'hide' }, 350);

    if ($("#postTitle").val() == '' || $("#postContent").val() == '') {
      handleError("All fields are required");
      return false;
    }

    sendAjax($("#postForm").attr("action"), $("#postForm").serialize());

    return false;
  });
});