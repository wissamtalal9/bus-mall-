'use strict';
const local_Storag
if (localStorage.data) {
   local_Storag = JSON.parse(localStorage.data);

  for (let i = 0; i < local_Storag.length; i++) {
    new Rest (local_storage[i].name);
    Rest.name[i].render();
  }
}

got_form.addEventListener('submit', handleCatSubmit);