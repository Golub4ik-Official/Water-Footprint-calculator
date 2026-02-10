// Конфигурация коэффициентов водного следа
const WATER_FOOTPRINT_RATES = {
    domestic: { shower: 12, bath: 150 / 7, dishwashing: 8, laundry: 50 / 7, toilet: 6 },
    food: {
        beef: 15415, pork: 5988, lamb: 10412, goatMeat: 5521, chicken: 4325, fish: 5000,
        milk: 1020, cheese: 5553, yogurt: 1020, butter: 5553, cream: 1020, eggs: 3265,
        bread: 1608, rice: 1673, wheat: 1827, oats: 1788, potatoes: 287,
        vegetables: 322, tomatoes: 214, carrots: 195, onions: 345, fruits: 967,
        apples: 822, bananas: 790, oranges: 560,
        coffee: 130, tea: 27, juice: 1000, softDrinks: 300, beer: 300, wine: 870,
        vegetableOil: 2575, oliveOil: 14431, mayonnaise: 3000,
        beans: 5053, lentils: 5874, peas: 1979, nuts: 9063, peanuts: 3974,
        sugar: 197, chocolate: 17196, honey: 1000
    },
    goods: { clothes: 2700 / 30, electronics: 1600 / 365, books: 1000 / 365, toiletries: 200 / 30 }
};

// Получение единицы измерения для слайдера
function getSliderUnit(sliderId) {
    const timeIds = ['shower-time', 'dishwashing'];
    const countIds = ['baths', 'laundry', 'toilet-flush'];
    const itemIds = ['clothes', 'electronics', 'books', 'toiletries'];
    const drinkIds = ['coffee', 'tea', 'juice', 'soft-drinks', 'beer', 'wine'];

    if (timeIds.includes(sliderId)) return ' мин';
    if (countIds.includes(sliderId)) return ' раз';
    if (itemIds.includes(sliderId)) return sliderId === 'clothes' ? ' вещ' : ' покупк';
    if (drinkIds.some(id => sliderId.includes(id))) return ' мл';
    return ' г';
}

// Прокрутка к калькулятору
function scrollToCalculator() {
    document.getElementById('calculator').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Получение значения из элемента
function getInputValue(id) {
    return parseFloat(document.getElementById(id)?.value) || 0;
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', function() {
    // Навигация
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetSection = document.getElementById(this.getAttribute('href').substring(1));
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // Переключение вкладок калькулятора
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            const targetContent = document.getElementById(targetTab);

            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            this.classList.add('active');
            if (targetContent) targetContent.classList.add('active');
        });
    });

    // Обновление значений слайдеров
    document.querySelectorAll('.slider').forEach(slider => {
        const valueDisplay = slider.parentNode.querySelector('.value-display');
        const updateDisplay = (value) => {
            valueDisplay.textContent = value + getSliderUnit(slider.id);
        };
        
        slider.addEventListener('input', function() { updateDisplay(this.value); });
        updateDisplay(slider.value);
    });

    // Переключение таблиц
    document.querySelectorAll('.table-toggle').forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const tableContent = document.getElementById(this.getAttribute('data-table'));
            if (tableContent) {
                this.classList.toggle('active');
                tableContent.classList.toggle('show');
            }
        });
    });

    // Эффект наведения на карточки
    document.querySelectorAll('.info-card, .recommendation-card, .result-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Эффект ripple на кнопках
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function() {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    animateOnScroll();
});

// Расчёт водного следа
function calculateWaterFootprint() {
    // Бытовое потребление
    const domesticWater = 
        getInputValue('shower-time') * WATER_FOOTPRINT_RATES.domestic.shower +
        getInputValue('baths') * WATER_FOOTPRINT_RATES.domestic.bath +
        getInputValue('dishwashing') * WATER_FOOTPRINT_RATES.domestic.dishwashing +
        getInputValue('laundry') * WATER_FOOTPRINT_RATES.domestic.laundry +
        getInputValue('toilet-flush') * WATER_FOOTPRINT_RATES.domestic.toilet;

    // Пищевые продукты
    const foodWater = Object.entries(WATER_FOOTPRINT_RATES.food).reduce((sum, [key, rate]) => {
        const value = getInputValue(key);
        // Яйца учитываются поштучно (50г = 1 штука)
        const multiplier = key === 'eggs' ? value * 50 / 1000 : value / 1000;
        return sum + multiplier * rate;
    }, 0);

    // Товары
    const goodsWater = 
        getInputValue('clothes') * WATER_FOOTPRINT_RATES.goods.clothes +
        getInputValue('electronics') * WATER_FOOTPRINT_RATES.goods.electronics +
        getInputValue('books') * WATER_FOOTPRINT_RATES.goods.books +
        getInputValue('toiletries') * WATER_FOOTPRINT_RATES.goods.toiletries;

    const totalWater = domesticWater + foodWater + goodsWater;
    
    // Отображение результатов
    const setResult = (id, value) => {
        document.getElementById(id).textContent = Math.round(value) + ' л/день';
    };

    setResult('domestic-result', domesticWater);
    setResult('food-result', foodWater);
    setResult('goods-result', goodsWater);
    setResult('total-result', totalWater);

    document.getElementById('comparison-text').textContent = getComparisonText(totalWater);
    document.getElementById('results').style.display = 'block';
    
    document.getElementById('results').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Функция для сравнения с средними показателями
function getComparisonText(totalWater) {
    const AVERAGE_WATER = 4000;
    const ratio = totalWater / AVERAGE_WATER;
    const belowAverage = Math.round((1 - ratio) * 100);
    const aboveAverage = Math.round((ratio - 1) * 100);

    if (ratio < 0.7) {
        return `🎉 Отличный результат! Ваш водный след на ${belowAverage}% ниже среднего. Вы заботитесь о водных ресурсах!`;
    }
    if (ratio < 1) {
        return `👍 Хорошо! Ваш водный след на ${belowAverage}% ниже среднего. Есть потенциал для улучшения.`;
    }
    if (ratio < 1.3) {
        return `⚠️ Ваш водный след близок к среднему значению. Попробуйте следовать нашим рекомендациям для снижения.`;
    }
    if (ratio < 1.6) {
        return `🔴 Ваш водный след выше среднего на ${aboveAverage}%. Рекомендуем обратить внимание на рекомендации.`;
    }
    return `🚨 Значительно выше среднего! Ваш водный след в ${ratio.toFixed(1)} раза больше среднего. Обязательно изучите способы снижения потребления воды.`;
}

// Анимация появления элементов при скролле
function animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.info-card, .recommendation-card, .result-card').forEach(element => {
        Object.assign(element.style, {
            opacity: '0',
            transform: 'translateY(30px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease'
        });
        observer.observe(element);
    });
}

// Эффект параллакса для фона
window.addEventListener('scroll', function() {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.transform = `translateY(${window.pageYOffset * -0.5}px)`;
    }
});
