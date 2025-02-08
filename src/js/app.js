function generate_password() 
{
  try {
    let charBuff = "";

    if (document.getElementById("chbx-ucase").checked)   charBuff += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (document.getElementById("chbx-lcase").checked)   charBuff += "abcdefghijklmnopqrstuvwxyz";
    if (document.getElementById("chbx-nums").checked)    charBuff += "1234567890";
    if (document.getElementById("chbx-spchars").checked) charBuff += document.getElementById("spchars").value;

    if (charBuff === "") {
      throw new Error("Select char types!");
    }

    const poolArray = charBuff.split("");
    const passArray = new Uint8Array(document.getElementById("pass-len").value);

    crypto.getRandomValues(passArray);

    const pass = Array.from(passArray, (value) =>
      poolArray[value % poolArray.length]
    );

    document.getElementById("output").value = pass.join('');
  } catch (error) {
    document.getElementById("output").value = (error.message)
  }
}

function increment() {
  const lbl_len = document.getElementById("pass-len");
  if(lbl_len.value < 100) {
    lbl_len.value++;
  }
}

function decrement() {
  const lbl_len = document.getElementById("pass-len");
  if(lbl_len.value > 0) {
    lbl_len.value--;
  }
}

// theme
function toggleTheme() {
  setTheme((document.documentElement.getAttribute('data-theme') === 'light') ? "dark" : "light");
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem("theme", theme);
}

function init() {
  setTheme(localStorage.getItem("theme") ?? "light");
}

init();
