
const searchButton = document.querySelector('.search-button');
const cardParent = document.querySelector(".card-box");

// ############# Search Button click action ###############

searchButton.addEventListener('click', () => {
    const searchInput = document.querySelector('.search-input').value;
    const cardParent = document.querySelector(".card-box");
    const selectedArea = document.querySelector(".selected-area");
    removeAllChildNodes(cardParent);
    getData(searchInput);
    document.querySelector('.search-input').value = '';
    selectedArea.style.display = "none";
});


// ########################## Fetch a single data #######################
const getSelectedData = async (inputValue) => {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`);

    let food = await response.json();
    showSelectedItem(food.meals);

}

// ############################# Fetch search data from API ####################
const getData = async (inputValue) => {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`);

    let food = await response.json();
    if (food.meals === null) {
        document.querySelector('.card-wrapper').style.display = 'none';
        document.querySelector('.error').style.display = 'block';    ///////////////Error handler (Search not found!)

    } else {

        foodUpdate(food.meals);
    }
}

const foodUpdate = food => {
    food.forEach(meal => {   ///////////////////////// Get all items one by one.
        foodDisplay(meal);

    });
}

// ################ Dynamicly create card for all meal items ##################

const foodDisplay = meal => {
    document.querySelector('.card-wrapper').style.display = 'block';
    document.querySelector('.error').style.display = 'none';

    const cardParent = document.querySelector(".card-box")

    const card = document.createElement('div');
    card.className = "card border-0 col-lg-3 col-md-4 col-sm-12 m-3";
    card.style.width = '18rem';
    card.setAttribute('onClick', `getSelectedData('${meal.strMeal}')`);

    const img = document.createElement('img');
    img.className = "card-img-top card-image";
    img.setAttribute('src', `${meal.strMealThumb}`)

    const cardBody = document.createElement('div');
    cardBody.className = "card-body bg-light";


    const h4 = document.createElement('h4');
    h4.className = "card-title ";
    h4.innerText = `${meal.strMeal}`;
    h4.style.cursor = "pointer";

    cardParent.append(card);
    card.append(img);
    card.append(cardBody);
    cardBody.append(h4);
}


// ###########################  Display details of a selected Item #################

const showSelectedItem = (data) => {
    const selectedArea = document.querySelector(".selected-area");
    selectedArea.style.display = "block";
    const [selectedMeal] = data;

    const image = document.getElementById("item-image");
    const title = document.getElementById("item-title");
    image.setAttribute('src', `${selectedMeal.strMealThumb}`)
    title.innerText = `${selectedMeal.strMeal}`;

    const dataArray = Object.values(selectedMeal);
    const ingredientsArray = dataArray.slice(9, 29);
    const measurementArray = dataArray.slice(29, 49);
    const ingredients = ingredientsArray.filter(item => item.length > 2 && item); ////// take only items which have value;
    const mesurements = measurementArray.filter(item => item.length > 2 && item);  ////// take only items which have value;


    displayDetails(ingredients, mesurements)


    function displayDetails(ingredients, mesurements) {
        const ulParent = document.getElementById("list-group")
        ulParent.innerHTML = '';

        ingredients.forEach((ingredient) => {
            const li = `
            <li class="list-group-item"><i class="far fa-check-square"></i> <span id="Ingredient">${ingredient}</span></li>
            `
            ulParent.innerHTML += li;
        })

        mesurements.forEach((mesurement) => {
            const li = document.querySelector('.list-group-item');
            li.innerHTML += ` - (${mesurement})`
            ulParent.appendChild(li);
        })
    }

}

/////////////////////// Screen got refreshed after a new search the old items desapiers

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
