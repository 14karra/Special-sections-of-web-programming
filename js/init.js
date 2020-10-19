const urls = {
    albums: 'http://jsonplaceholder.typicode.com/albums/',
    users: 'http://jsonplaceholder.typicode.com/users/'
};

const hide = document.getElementsByClassName('hide');

const section = document.querySelector('section');

const select = document.querySelector('select');
select.addEventListener('change', e => {
    updateList();
}, false);