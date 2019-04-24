// Color Code Validate
var isColorCode = function() {
  let value = $(this).val();
  if (value.length > 0 && !value.match(/^[0-9a-fA-F]{6}$/g)) {
     $(this).css('color', 'red');
     return false;
  }
  $(this).css('color', 'black');
  return true;
}

// AWS Account ID Validate
var isAccountId = function() {
  let value = $(this).val();
  if (value.length > 0 && !value.match(/^[0-9a-z\-]{3,63}$/g)) {
     $(this).css('color', 'red');
     return false;
  }
  $(this).css('color', 'black');
  return true;
}

$("#account-id").on('blur',isAccountId);
$("#color-code").on('blur',isColorCode);

$("#save").on('click', function() {
  var account_id = $("#account-id").val();
  var color_code = $("#color-code").val();

  chrome.runtime.sendMessage({ method: "setItem", key: account_id, value: color_code }, function(response) {
    console.log("saved");
    addColumn(account_id, color_code);
    $("#account-id").val("");
    $("#color-code").val("");
  });
});

$(document).ready(function() {
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let val = localStorage.getItem(key);
    addColumn(key, val);
  }
});

function addColumn(key, val) {
  $(".container").append(
    $("<div>").attr({ class: "row", id: key }).append(
      $("<div>").attr({ class: "input-group" }).append(
        $("<div>").attr({
          class: "form-control account-id"
        }).text(key).css("background-color", "#" + val).css("color", "#FFFFFF")
      ).append(
        $("<div>").attr({ class: "input-group-append" }).append(
          $("<button>").attr({
            class: "btn btn-outline-secondary remove",
            type: "button"
          }).text("remove").css("width", "100px").on('click', removeAccount)
        )
      )
    )
  );
}

function removeColumn(key) {
  $("#" + key).remove();
}

function removeAccount() {
  let account_id = $(this).parent().parent().find(".account-id").text();
  chrome.runtime.sendMessage({ method: "removeItem", key: account_id }, function(response) {
    console.log("removed");
    removeColumn(account_id);
  });
}
