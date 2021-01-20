function SelectSex(sexId) {
    let selectCategory = document.getElementById('id_category');
    selectCategory.options.length = 0;
    let selSubCategory = document.getElementById('id_subCategory');
    selSubCategory.options.length = 0;

    if (sexId === 0) {
        return;
    }
    let products = obj[sexId - 1];
    let option = new Option('Выберите категорию', 0);
    try {
        selectCategory.add(option, null);
    } catch (e) {
        selectCategory.add(option);
    }

    let categories = products.categories;
    let length = categories.length;

    for (let i = 0; i < length; ++i) {
        option = new Option(categories[i].category, i + 1);
        try {
            selectCategory.add(option, null);
        } catch (e) {
            selectCategory.add(option);
        }
    }
}

function SelectCategory(category_id) {
    let selSubCategory = document.getElementById('id_subCategory');
    selSubCategory.options.length = 0;

    if (category_id === 0) {
        return;
    }
    let sexId = document.getElementById('id_sex').value;
    let products = obj[sexId - 1].categories[category_id - 1];
    let option = new Option('Выберите подкатегорию', 0);

    try {
        selSubCategory.add(option, null);
    } catch (e) {
        selSubCategory.add(option);
    }

    let subCategories = products.subcategories;
    let length = subCategories.length;

    for (let i = 0; i < length; ++i) {
        option = new Option(subCategories[i].subcategory, i + 1);
        try {
            selSubCategory.add(option, null);
        } catch (e) {
            selSubCategory.add(option);
        }
    }
}

function Change(select, id) {
    if (select === 'sex') {
        SelectSex(id);
    } else if (select === 'category') {
        SelectCategory(id);
    }

    GetProductsList();
}

function cleanExistingTable() {
    let table = document.getElementById('_table');

    let rowLength = table.rows.length;
    for (let i = rowLength - 1; i >= 0; --i) {
        let hLen = table.rows[i].cells.length;
        for (let j = hLen - 1; j >= hLen; --j) {
            table.rows[i].deleteCell(j);
        }
        table.deleteRow(i);
    }

    return table;
}

function initializeTableColumns(table) {
    table.insertRow(0);

    table = introduceNewColumn(table, "Код товара");
    table = introduceNewColumn(table, "Название товара");
    table = introduceNewColumn(table, "Вес (гр.)");
    table = introduceNewColumn(table, "Стоимость (в рублях)");

    if (document.getElementById('productRating').checked) {
        table = introduceNewColumn(table, "Оценка товара (на 5)");
    }
    if (document.getElementById('productSex').checked) {
        table = introduceNewColumn(table, "Род товара");
    }
    if (document.getElementById('productSubCategory').checked) {
        introduceNewColumn(table, "Подкатегория товара");
    }
}

function GetProductsList() {

    let table = cleanExistingTable();

    initializeTableColumns(table);

    let sex_id = document.getElementById('id_sex').value;
    let category_id = document.getElementById('id_category').value;
    let subCategory_id = document.getElementById('id_subCategory').value;

    if (sex_id == 0) {
        let count_sex = obj.length;

        for (let i = 0; i < count_sex; ++i) {
            let count_category = obj[i].categories.length;

            for (let j = 0; j < count_category; ++j) {
                let count_subCategory = obj[i].categories[j].subcategories.length;

                for (let k = 0; k < count_subCategory; ++k) {
                    let count_products = obj[i].categories[j].subcategories[k].products.length;

                    for (let p = 0; p < count_products; p++) {

                        AddSubCategory(i, j, k, p);
                    }
                }
            }
        }
    } else if (category_id == 0) {
        let count_category = obj[sex_id - 1].categories.length;
        for (let j = 0; j < count_category; ++j) {
            let count_subCategory = obj[sex_id - 1].categories[j].subcategories.length;
            for (let k = 0; k < count_subCategory; ++k) {
                let count_products = obj[sex_id - 1].categories[j].subcategories[k].products.length;
                for (let p = 0; p < count_products; p++) {
                    AddSubCategory(sex_id - 1, j, k, p);
                }
            }
        }
    } else if (subCategory_id == 0) {
        let count_subCategory = obj[sex_id - 1].categories[category_id - 1].subcategories.length;
        for (let k = 0; k < count_subCategory; ++k) {
            let count_products = obj[sex_id - 1].categories[category_id - 1].subcategories[k].products.length;
            for (let p = 0; p < count_products; p++) {
                AddSubCategory(sex_id - 1, category_id - 1, k, p);
            }
        }
    } else {
        let count_products = obj[sex_id - 1].categories[category_id - 1].subcategories[subCategory_id - 1].products.length;
        for (let p = 0; p < count_products; p++) {
            AddSubCategory(sex_id - 1, category_id - 1, subCategory_id - 1, p);
        }
    }
}

function introduceNewColumn(table, columnName) {
    let tableHead = document.createElement('TH');
    tableHead.innerHTML = columnName;
    tableHead.className = 'caption';
    table.rows[0].appendChild(tableHead);
    return table;
}

function AddSubCategory(_sex, _category, _subcategory, _product) {
    let Table = document.getElementById('_table');
    let len = Table.rows.length;
    let num = 0;

    Table.insertRow(len);
    Table.rows[len].insertCell(num);
    Table.rows[len].cells[num].innerHTML = obj[_sex].categories[_category].subcategories[_subcategory].products[_product].Code;
    num++;

    Table.rows[len].insertCell(num);
    Table.rows[len].cells[num].innerHTML = obj[_sex].categories[_category].subcategories[_subcategory].products[_product].Name;
    num++;

    Table.rows[len].insertCell(num);
    Table.rows[len].cells[num].innerHTML = obj[_sex].categories[_category].subcategories[_subcategory].products[_product].Weight;
    num++;

    Table.rows[len].insertCell(num);
    Table.rows[len].cells[num].innerHTML = obj[_sex].categories[_category].subcategories[_subcategory].products[_product].Cost;
    num++;

    if (document.getElementById('productRating').checked) {
        Table.rows[len].insertCell(num);
        Table.rows[len].cells[num].innerHTML = obj[_sex].categories[_category].subcategories[_subcategory].products[_product].Rating;
        num += 1;
    }
    if (document.getElementById('productSex').checked) {
        Table.rows[len].insertCell(num);
        Table.rows[len].cells[num].innerHTML = obj[_sex].sex;
        num += 1;
    }
    if (document.getElementById('productSubCategory').checked) {
        Table.rows[len].insertCell(num);
        Table.rows[len].cells[num].innerHTML = obj[_sex].categories[_category].subcategories[_subcategory].subcategory;
    }
}
