const search=document.getElementById('search');
const submit=document.getElementById('submit');
 const random=document.getElementById('random');
 const mealsE1=document.getElementById('meals');
 const resultHeading=document.getElementById('result-heading');
 const Single_mealE1=document.getElementById('single-meal');
 const fav =  document.getElementById('fav');
 const favoriteButton = document.createElement('button');
 const favoritesList = [];
 function searchMeal(e) {
   e.preventDefault();
   resultHeading.innerHTML = "";
   Single_mealE1.innerHTML="";
   const term = search.value;
   console.log(term);
   if (term.trim()) {
     fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
       .then((res) => res.json())
       .then((data) => {
         console.log(data);
         resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;
         if (data.meals === null) {
           resultHeading.innerHTML = `<p>There are no search results. Try again!</p>`;
         } else {
           mealsE1.innerHTML = data.meals
             .map(
               (meal) => `
             <div class="meal">
             <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
             <div class="meal-info" data-mealID="${meal.idMeal}">
             <h3>${meal.strMeal}</h3></div>
             </div>`
             )
             .join("");
         }
       });
     search.value = "";
   } else {
     alert("Please enter a search term");
   }
 }
 function getRandomMeal() {
   mealsE1.innerHTML = "";
   resultHeading.innerHTML = "";
   fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
     .then((res) => res.json())
     .then((data) => {
       const meal = data.meals[0];
       addMealToDOM(meal);
     });
 }
 submit.addEventListener("submit", searchMeal);
 random.addEventListener("click", getRandomMeal);
 function getmealById(mealId){
   fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
   .then((res)=>res.json())
   .then((data)=>{
      const meal = data.meals[0];
      addMealToDOM(meal);

   })
 }
 function addToFavorites(meal) {
  if (!favoritesList.includes(meal)) {
    favoritesList.push(meal);
    alert(`${meal.strMeal} has been added to your favorites.`);
  } else {
    alert(`${meal.strMeal} is already in your favorites.`);
  }
}
 function addMealToDOM(meal) {
   const ingredients = [];
   for (let i = 1; i <= 20; i++) {
     if (meal[`strIngredient${i}`]) {
       ingredients.push(
         `${meal[`strIngredient${i}`]}-${meal[`strMeasure${i}`]}`
       );
     } else {
       break;
     }
   }
   Single_mealE1.innerHTML = `

   <div class="single-meal">
  
     <h1>${meal.strMeal}</h1>
     <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
     <div class="single-meal-info">
         ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
         ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
     </div>
     div class="favourite-meal">
     favoriteButton.innerHTML = '<i class="fas fa-heart"></i> Add to Favorites'
     favoriteButton.addEventListener('click', () => {
      addToFavorites(meal);
   });
   </div>
     <div class="main">
         <p>${meal.strInstructions}</p>
         <h2>Ingredients</h2>
         <ul>
             ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
         </ul>
     </div>
   </div>`;
}
 
 mealsE1.addEventListener("click", (e) => {
   //for finding a dish from data;
   const mealInfo = e.composedPath().find((item) => {
     if (item.classList) {
       return item.classList.contains("meal-info");
     } else {
       return false;
     }
   });
   if (mealInfo) {
      const mealID = mealInfo.getAttribute("data-mealid");
      getmealById(mealID);
    }
 }); 

 function addToFavorites(meal) {
  if (!favoritesList.includes(meal)) {
    favoritesList.push(meal);
    alert(`${meal.strMeal} has been added to your favorites.`);
  } else {
    alert(`${meal.strMeal} is already in your favorites.`);
  }
}
fav.addEventListener('click', showFav);


// Define a function to show all fav meal which are in favr array
function showFav() {
  searchResults.innerHTML = '';
  
  if (favoritesList.length === 0) {
    const noFavMessage = document.createElement('p');
    noFavMessage.innerText = 'You have no favorite meals.';
    searchResults.appendChild(noFavMessage);
  } else {
    favoritesList.forEach(meal => {
      const mealElement = document.createElement('div');
      mealElement.classList.add('meal');

      const mealImage = document.createElement('img');
      mealImage.src = meal.strMealThumb;
      mealImage.alt = meal.strMeal;
      mealElement.appendChild(mealImage);

      const mealName = document.createElement('h2');
      mealName.innerText = meal.strMeal;
      mealElement.appendChild(mealName);

      const mealIngredients = document.createElement('ul');
      for (let i = 1; i <= 20; i++) {
          if (meal[`strIngredient${i}`]) {
              const ingredient = document.createElement('li');
              ingredient.innerText = `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`;
              mealIngredients.appendChild(ingredient);
          } else {
              break;
          }
      }
      mealElement.appendChild(mealIngredients);

      const removeButton = document.createElement('button');
      removeButton.innerHTML = '<i class="fas fa-trash"></i> Remove from Favorites';
      removeButton.addEventListener('click', () => {
          removeFromFavorites(meal);
      });
      mealElement.appendChild(removeButton);

      searchResults.appendChild(mealElement);
    });
  }
}

// Define a function to remove meal from fav
function removeFromFavorites(meal) {
  const mealIndex = favoritesList.findIndex(fav => fav.idMeal === meal.idMeal);
  if (mealIndex !== -1) {
    favoritesList.splice(mealIndex, 1);
    showFav();
    alert(`${meal.strMeal} has been removed from your favorites.`);
  }
}
