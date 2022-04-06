function changeAction() {
  var selectedAction = $("#action option:selected").text();
  $("#runEncryption").text(selectedAction);
}

function runEncryption() {
  var subject = $("#subject").val();
  var key = getKey();

  var result = '';

  var selectedAction = $("#action").val();

  switch (selectedAction) {
    case 'encrypt':
      result = CryptoJS.AES.encrypt(subject, key);
      break;
    case 'decrypt':
      var bytes = CryptoJS.AES.decrypt(subject, key);
      result = bytes.toString(CryptoJS.enc.Utf8);
      break;
    default:
      break;
  }

  $("#result").val(result);
  alert(selectedAction);
};

function getKey() {
  return 'questionOption:' + $("#question").val() + 'answer' + $("#answer").val() + $("#password").val();
}

function copyResult() {
	  /* Get the text field */
  var copyText = document.getElementById("result");

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  navigator.clipboard.writeText(copyText.value);
  
  /* Alert the copied text */
  alert("Copied");
}