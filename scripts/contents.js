try {
  let account = $.map($("#nav-usernameMenu").find(".nav-elt-label").attr("title").split("@"), $.trim);
  let iam_user = account[0];
  let account_id = account[1];

  console.log("user: " + iam_user);
  console.log("aws-account-id: " + account_id);

  chrome.runtime.sendMessage({ method: "getItem", key: account_id }, function(response) {
    $("body #awsgnav #nav-menubar, body #awsgnav #nav-menubar .nav-menu, #nav-menu-right").css({
      'background-color': '#' + response.data
    });
  });
} catch(e) {
  console.log(e);
}