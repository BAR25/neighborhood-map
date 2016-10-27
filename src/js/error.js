var text = 'Many apologies... it appears Google has not loaded.';
var errorDiv = document.createElement('div');
var list = document.getElementById('place-list');

if (typeof google === 'undefined') {
  errorDiv.classList.add('alert');
  errorDiv.classList.add('alert-danger');
  errorDiv.style.margin = '20px';
  errorDiv.innerHTML = text;
  list.appendChild(errorDiv);
} else {
  console.log("No Google error");
}


