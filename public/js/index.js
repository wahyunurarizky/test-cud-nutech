import 'core-js/stable';
import 'regenerator-runtime/runtime';
// import '@babel/polyfill';
import 'bootstrap';
import { login, logout } from './login';
import { createItem, editItem, fillForm, deleteItem } from './items';

const loginForm = document.querySelector('.form-login');
const btnLogout = document.querySelector('.btn-logout');
const deleteItemBtn = document.querySelectorAll('.delete-item');
const editItemBtn = document.querySelectorAll('.edit-item');
const formAdd = document.querySelector('.form-add-item');
const formEdit = document.querySelector('.form-edit-item');

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    login(username, password);
  });
}

if (btnLogout) {
  btnLogout.addEventListener('click', logout);
}

if (deleteItemBtn) {
  deleteItemBtn.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      deleteItem(button.dataset['id']);
    });
  });
}

if (formAdd) {
  formAdd.addEventListener('submit', (e) => {
    e.preventDefault();
    // sama aja buat multipar/form-data
    const form = new FormData();
    // const name = document.getElementById('name').value;
    // const shortName = document.getElementById('shortName').value;

    form.append('name', document.getElementById('name').value);
    form.append('buy_price', document.getElementById('buy_price').value);
    form.append('sell_price', document.getElementById('sell_price').value);
    form.append('stock', document.getElementById('stock').value);
    form.append('photo', document.getElementById('photo').files[0]);
    createItem(form);
  });
}

if (editItemBtn) {
  editItemBtn.forEach((button) => {
    // console.log(button);
    button.addEventListener('click', (e) => {
      e.preventDefault();
      fillForm(button.dataset['id']);
    });
  });
}

if (formEdit) {
  formEdit.addEventListener('submit', (e) => {
    e.preventDefault();
    // sama aja buat multipar/form-data
    const formU = new FormData();
    // const name = document.getElementById('name').value;
    // const shortName = document.getElementById('shortName').value;

    formU.append('name', document.getElementById('name_u').value);
    formU.append('buy_price', document.getElementById('buy_price_u').value);
    formU.append('sell_price', document.getElementById('sell_price_u').value);
    formU.append('stock', document.getElementById('stock_u').value);

    // alert(document.getElementById('photo_u').value);
    if (document.getElementById('photo_u') !== undefined) {
      formU.append('photo', document.getElementById('photo_u').files[0]);
    }
    // console.log(document.getElementById('logo').files[0]);
    editItem(formU, document.getElementById('itemId').value);
  });
}
