import { elements } from './base';
import { Fraction } from 'fractional';

export const clearRecipe = () => {
    elements.recipe.innerHTML = '';
};

const formatCount = count => {
    if (count) {
        // count 2.5 --> 2 1/2
        // count 0.5 --> 1/2
        const newCount = Math.round(count * 10000) / 10000;
        const [int, dec] = newCount.toString().split('.').map(el => parseInt(el, 10));

        if (!dec) {
            return newCount;
        } else if (int === 0) {
            const fr = new Fraction(newCount);
            return `${fr.numerator}/${fr.denominator}`;
        } else {
            const fr = new Fraction(newCount - int);
            return `${int} ${fr.numerator}/${fr.denominator}`;
        }
    }
    return '?';
};

const createIngredient = ingredient => `
    <li class="recipe__item">
        <svg class="recipe__icon">
            <use xlink:href="img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__count">${formatCount(ingredient.count)}</div>
        <div class="recipe__ingredient">
            <span class="recipe__unit">${ingredient.unit}</span>
            ${ingredient.ingredient}
        </div>
    </li>
`;

export const renderRecipe = (recipe, isLiked) => {
    const markup = `
        <figure class="recipe__fig">
            <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img">
            <h1 class="heading-1 recipe__title">
                <span>${recipe.title}</span>
            </h1>
        </figure>

        <div class="recipe__details">
            <div class="recipe__time">
                <svg class="recipe__time-icon">
                    <use xlink:href="img/icons.svg#icon-stopwatch"></use>
                </svg>
                <span class="recipe__time-data">${recipe.time}</span>
                <span class="recipe__time-text">minutes</span>
            </div>
            <div class="recipe__people">
                <svg class="recipe__people-icon">
                    <use xlink:href="img/icons.svg#icon-man"></use>
                </svg>
                <span class="recipe__people-data">${recipe.servings}</span>
                <span class="recipe__people-text">servings</span>
                <div class="recipe__people-buttons">
                    <button class="btn-tiny btn-decrease">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-minus"></use>
                        </svg>
                    </button>
                    <button class="btn-tiny btn-increase">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-plus"></use>
                        </svg>
                    </button>
                </div>
            </div>
            <button class="recipe__love">
                <svg class="likes__icon">
                    <use href="img/icons.svg#icon-heart${isLiked ? '' : '-outlined'}"></use>
                </svg>
            </button>
        </div>

        <div class="recipe__ingredients">
            <ul class="recipe__ingredients-list">
                ${recipe.ingredients.map(el => createIngredient(el)).join('')}
            </ul>
            <button class="btn recipe__ingredients-btn">
                <svg class="search__icon">
                    <use xlink:href="img/icons.svg#icon-shopping-cart"></use>
                </svg>
                <span>Add to shop list</span>
            </button>
        </div>

        <div class="recipe__directions">
            <h2 class="heading-2">How to cook it</h2>
            <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__by">${recipe.author}</span>. Please check out directions at their website.
            </p>
            <a class="btn recipe__directions-btn" href="${recipe.url}" target="_blank">
                <span>Directions</span>
                <svg class="search__icon">
                    <use xlink:href="img/icons.svg#icon-triangle-right"></use>
                </svg>
            </a>
        </div>
    `;

    elements.recipe.insertAdjacentHTML('afterbegin', markup);
}

export const updateServingsIngredients = recipe => {
    // Update servings
    document.querySelector('.recipe__people-data').textContent = recipe.servings;

    // Update ingredients
    const countElements = Array.from(document.querySelectorAll('.recipe__count'));
    countElements.forEach((el, i) => {
        el.textContent = formatCount(recipe.ingredients[i].count);
    })
};