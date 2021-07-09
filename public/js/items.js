import axios from 'axios';

export const createItem = async (data) => {
  try {
    const url = '/api/v1/items';

    const res = await axios({
      method: 'post',
      url,
      data,
    });

    if (res.data.status === 'success') {
      alert('successfull');
      location.reload();
    }
  } catch (err) {
    alert(err.response.data.message);
  }
};

export const deleteItem = async (id) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `/api/v1/items/${id}`,
    });
    console.log(res);
    if (res.status === 204) {
      alert('item deleted successfully');
      location.assign('/');
    }
  } catch (err) {
    alert(err.response.data.message);
  }
};

export const fillForm = async (id) => {
  try {
    const url = `/api/v1/items/${id}`;

    const resGet = await axios({
      method: 'get',
      url,
    });

    const item = resGet.data.data.doc;

    document.getElementById('itemId').value = item._id;

    document.getElementById('name_u').value = item.name;
    document.getElementById('buy_price_u').value = item.buy_price;
    document.getElementById('sell_price_u').value = item.sell_price;
    document.getElementById('stock_u').value = item.stock;
    document
      .querySelector('.img-photo')
      .setAttribute('src', `/img/items/${item.photo}`);
  } catch (err) {
    alert(err);
  }
};

export const editItem = async (data, itemId) => {
  try {
    const url = `/api/v1/items/${itemId}`;

    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });
    console.log(res);
    if (res.data.status === 'success') {
      alert('successfull');
      location.reload();
    }
  } catch (err) {
    alert(err.response.data.message);
  }
};
