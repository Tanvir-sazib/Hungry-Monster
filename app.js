
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
    console.log(selectedMeal);
    const image = document.getElementById("item-image");
    const title = document.getElementById("item-title");

    const ingredient1 = document.getElementById("ingr-1");
    const ingredient2 = document.getElementById("ingr-2");
    const ingredient3 = document.getElementById("ingr-3");
    const ingredient4 = document.getElementById("ingr-4");
    const ingredient5 = document.getElementById("ingr-5");
    const ingredient6 = document.getElementById("ingr-6");
    const ingredient7 = document.getElementById("ingr-7");
    const ingredient8 = document.getElementById("ingr-8");
    const ingredient9 = document.getElementById("ingr-9");
    const ingredient10 = document.getElementById("ingr-10");


    image.setAttribute('src', `${selectedMeal.strMealThumb}`)
    title.innerText = `${selectedMeal.strMeal}`;
    ingredient1.innerText = `${selectedMeal.strMeasure1} ${selectedMeal.strIngredient1}`;
    ingredient2.innerText = `${selectedMeal.strMeasure2} ${selectedMeal.strIngredient2}`;
    ingredient3.innerText = `${selectedMeal.strMeasure3} ${selectedMeal.strIngredient3}`;
    ingredient4.innerText = `${selectedMeal.strMeasure4} ${selectedMeal.strIngredient4}`;
    ingredient5.innerText = `${selectedMeal.strMeasure5} ${selectedMeal.strIngredient5}`;
    ingredient6.innerText = `${selectedMeal.strMeasure6} ${selectedMeal.strIngredient6}`;
    ingredient7.innerText = `${selectedMeal.strMeasure7} ${selectedMeal.strIngredient7}`;
    ingredient8.innerText = `${selectedMeal.strMeasure8} ${selectedMeal.strIngredient8}`;
    ingredient9.innerText = `${selectedMeal.strMeasure9} ${selectedMeal.strIngredient9}`;
    ingredient10.innerText = `${selectedMeal.strMeasure10} ${selectedMeal.strIngredient10}`;



}

/////////////////////// Screen got refreshed after a new search the old items desapiers

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
