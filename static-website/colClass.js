function colSize() {

    console.log('width: ' + document.body.scrollWidth);

    const gallery1 = document.getElementById('gallery-1');
    const gallery2 = document.getElementById('gallery-2');

    console.log(gallery1);
    console.log(gallery2);

    if (document.body.scrollWidth < 780) {
        gallery1.classList.remove('row-cols-2');
        gallery1.classList.add('row-cols-1');

        gallery2.classList.remove('row-cols-2');
        gallery2.classList.add('row-cols-1');
    } else {
        gallery1.classList.remove('row-cols-1');
        gallery1.classList.add('row-cols-2');

        gallery2.classList.remove('row-cols-1');
        gallery2.classList.add('row-cols-2');
    }
}