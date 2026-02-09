// Навигация
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Плавная прокрутка по клику на ссылки
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            // Закрыть мобильное меню
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
});

// Прокрутка к калькулятору
function scrollToCalculator() {
    document.getElementById('calculator').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Переключение вкладок калькулятора
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Убрать активный класс со всех кнопок и контентов
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Добавить активный класс к нажатой кнопке и соответствующему контенту
            this.classList.add('active');

            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
});

// Обновление значений слайдеров
document.addEventListener('DOMContentLoaded', function() {
    const sliders = document.querySelectorAll('.slider');
    
    sliders.forEach(slider => {
        const valueDisplay = slider.parentNode.querySelector('.value-display');
        
        // Обновление при изменении
        slider.addEventListener('input', function() {
            const value = this.value;
            const unit = this.id === 'shower-time' || this.id === 'dishwashing' ? ' мин' :
                        this.id === 'baths' || this.id === 'laundry' ? ' раз' :
                        this.id === 'toilet-flush' ? ' раз' :
                        this.id.includes('clothes') ? ' вещ' :
                        this.id.includes('electronics') || this.id.includes('books') ? ' покупк' :
                        this.id.includes('toiletries') ? ' покупк' :
                        this.id.includes('coffee') || this.id.includes('tea') || this.id.includes('juice') || 
                        this.id.includes('soft-drinks') || this.id.includes('beer') || this.id.includes('wine') ? ' мл' :
                        ' г';
            
            valueDisplay.textContent = value + unit;
        });
        
        // Инициализация отображения
        const initialValue = slider.value;
        const unit = slider.id === 'shower-time' || slider.id === 'dishwashing' ? ' мин' :
                    slider.id === 'baths' || slider.id === 'laundry' ? ' раз' :
                    slider.id === 'toilet-flush' ? ' раз' :
                    slider.id.includes('clothes') ? ' вещ' :
                    slider.id.includes('electronics') || slider.id.includes('books') ? ' покупк' :
                    slider.id.includes('toiletries') ? ' покупк' :
                    slider.id.includes('coffee') || slider.id.includes('tea') || slider.id.includes('juice') || 
                    slider.id.includes('soft-drinks') || slider.id.includes('beer') || slider.id.includes('wine') ? ' мл' :
                    ' г';
        
        valueDisplay.textContent = initialValue + unit;
    });
});

// Расчёт водного следа
function calculateWaterFootprint() {
    // Получение значений бытового потребления
    const showerTime = parseFloat(document.getElementById('shower-time').value);
    const baths = parseFloat(document.getElementById('baths').value);
    const dishwashing = parseFloat(document.getElementById('dishwashing').value);
    const laundry = parseFloat(document.getElementById('laundry').value);
    const toiletFlush = parseFloat(document.getElementById('toilet-flush').value);
    
    // Получение значений мяса и рыбы (граммы)
    const beef = parseFloat(document.getElementById('beef').value);
    const pork = parseFloat(document.getElementById('pork').value);
    const lamb = parseFloat(document.getElementById('lamb').value);
    const goatMeat = parseFloat(document.getElementById('goat-meat').value);
    const chicken = parseFloat(document.getElementById('chicken').value);
    const fish = parseFloat(document.getElementById('fish').value);
    
    // Получение значений молочных продуктов (граммы)
    const milk = parseFloat(document.getElementById('milk').value);
    const cheese = parseFloat(document.getElementById('cheese').value);
    const yogurt = parseFloat(document.getElementById('yogurt').value);
    const butter = parseFloat(document.getElementById('butter').value);
    const cream = parseFloat(document.getElementById('cream').value);
    const eggs = parseFloat(document.getElementById('eggs').value);
    
    // Получение значений злаков и круп (граммы)
    const bread = parseFloat(document.getElementById('bread').value);
    const rice = parseFloat(document.getElementById('rice').value);
    const wheat = parseFloat(document.getElementById('wheat').value);
    const oats = parseFloat(document.getElementById('oats').value);
    const potatoes = parseFloat(document.getElementById('potatoes').value);
    
    // Получение значений овощей и фруктов (граммы)
    const vegetables = parseFloat(document.getElementById('vegetables').value);
    const tomatoes = parseFloat(document.getElementById('tomatoes').value);
    const carrots = parseFloat(document.getElementById('carrots').value);
    const onions = parseFloat(document.getElementById('onions').value);
    const fruits = parseFloat(document.getElementById('fruits').value);
    const apples = parseFloat(document.getElementById('apples').value);
    const bananas = parseFloat(document.getElementById('bananas').value);
    const oranges = parseFloat(document.getElementById('oranges').value);
    
    // Получение значений напитков (мл)
    const coffee = parseFloat(document.getElementById('coffee').value);
    const tea = parseFloat(document.getElementById('tea').value);
    const juice = parseFloat(document.getElementById('juice').value);
    const softDrinks = parseFloat(document.getElementById('soft-drinks').value);
    const beer = parseFloat(document.getElementById('beer').value);
    const wine = parseFloat(document.getElementById('wine').value);
    
    // Получение значений масел и жиров (граммы)
    const vegetableOil = parseFloat(document.getElementById('vegetable-oil').value);
    const oliveOil = parseFloat(document.getElementById('olive-oil').value);
    const mayonnaise = parseFloat(document.getElementById('mayonnaise').value);
    
    // Получение значений бобовых и орехов (граммы)
    const beans = parseFloat(document.getElementById('beans').value);
    const lentils = parseFloat(document.getElementById('lentils').value);
    const peas = parseFloat(document.getElementById('peas').value);
    const nuts = parseFloat(document.getElementById('nuts').value);
    const peanuts = parseFloat(document.getElementById('peanuts').value);
    
    // Получение значений сладостей (граммы)
    const sugar = parseFloat(document.getElementById('sugar').value);
    const chocolate = parseFloat(document.getElementById('chocolate').value);
    const honey = parseFloat(document.getElementById('honey').value);
    
    // Получение значений товаров
    const clothes = parseFloat(document.getElementById('clothes').value);
    const electronics = parseFloat(document.getElementById('electronics').value);
    const books = parseFloat(document.getElementById('books').value);
    const toiletries = parseFloat(document.getElementById('toiletries').value);
    
    // Расчёт бытового потребления (литров в день)
    const domesticWater = 
        (showerTime * 12) + // 12 литров в минуту в душе
        (baths * 150 / 7) + // 150 литров за ванну, делим на 7 дней
        (dishwashing * 8) + // 8 литров в минуту при мытье посуды
        (laundry * 50 / 7) + // 50 литров за стирку, делим на 7 дней
        (toiletFlush * 6); // 6 литров за смыв
    
    // Расчёт водного следа питания (литров в день)
    const foodWater = 
        // Мясо и рыба (граммы → килограммы)
        (beef / 1000 * 15415) + // говядина: 15,415 л/кг
        (pork / 1000 * 5988) + // свинина: 5,988 л/кг
        (lamb / 1000 * 10412) + // баранина: 10,412 л/кг
        (goatMeat / 1000 * 5521) + // козье мясо: 5,521 л/кг
        (chicken / 1000 * 4325) + // курица: 4,325 л/кг
        (fish / 1000 * 5000) + // рыба: 5,000 л/кг
        // Молочные продукты (граммы → килограммы)
        (milk / 1000 * 1020) + // молоко: 1,020 л/кг
        (cheese / 1000 * 5553) + // сыр: 5,553 л/кг
        (yogurt / 1000 * 1020) + // йогурт: 1,020 л/кг
        (butter / 1000 * 5553) + // масло: 5,553 л/кг
        (cream / 1000 * 1020) + // сливки: 1,020 л/кг
        (eggs * 50 / 1000 * 3265) + // яйца: 3,265 л/кг (50г за штуку)
        // Злаки и крупы (граммы → килограммы)
        (bread / 1000 * 1608) + // хлеб: 1,608 л/кг
        (rice / 1000 * 1673) + // рис: 1,673 л/кг
        (wheat / 1000 * 1827) + // пшеница: 1,827 л/кг
        (oats / 1000 * 1788) + // овсянка: 1,788 л/кг
        (potatoes / 1000 * 287) + // картофель: 287 л/кг
        // Овощи и фрукты (граммы → килограммы)
        (vegetables / 1000 * 322) + // овощи общие: 322 л/кг
        (tomatoes / 1000 * 214) + // помидоры: 214 л/кг
        (carrots / 1000 * 195) + // морковь: 195 л/кг
        (onions / 1000 * 345) + // лук: 345 л/кг
        (fruits / 1000 * 967) + // фрукты общие: 967 л/кг
        (apples / 1000 * 822) + // яблоки: 822 л/кг
        (bananas / 1000 * 790) + // бананы: 790 л/кг
        (oranges / 1000 * 560) + // апельсины: 560 л/кг
        // Напитки (мл → литры)
        (coffee / 1000 * 130) + // кофе: 130 л/литр (7г на чашку)
        (tea / 1000 * 27) + // чай: 27 л/литр (3г на чашку)
        (juice / 1000 * 1000) + // сок: 1,000 л/литр
        (softDrinks / 1000 * 300) + // газировка: 300 л/литр (приблизительно)
        (beer / 1000 * 300) + // пиво: 300 л/литр
        (wine / 1000 * 870) + // вино: 870 л/литр
        // Масла и жиры (граммы → килограммы)
        (vegetableOil / 1000 * 2575) + // растительное масло: 2,575 л/кг
        (oliveOil / 1000 * 14431) + // оливковое масло: 14,431 л/кг
        (mayonnaise / 1000 * 3000) + // майонез: 3,000 л/кг (приблизительно)
        // Бобовые и орехи (граммы → килограммы)
        (beans / 1000 * 5053) + // фасоль: 5,053 л/кг
        (lentils / 1000 * 5874) + // чечевица: 5,874 л/кг
        (peas / 1000 * 1979) + // горох: 1,979 л/кг
        (nuts / 1000 * 9063) + // орехи: 9,063 л/кг
        (peanuts / 1000 * 3974) + // арахис: 3,974 л/кг
        // Сладости (граммы → килограммы)
        (sugar / 1000 * 197) + // сахар: 197 л/кг
        (chocolate / 1000 * 17196) + // шоколад: 17,196 л/кг
        (honey / 1000 * 1000); // мёд: 1,000 л/кг (приблизительно)
    
    // Расчёт водного следа товаров (литров в день)
    const goodsWater = 
        (clothes * 2700 / 30) + // одежда: 2700 л/вещь, делим на 30 дней
        (electronics * 1600 / 365) + // электроника: 1600 л/покупка, делим на 365 дней
        (books * 1000 / 365) + // книги: 1000 л/книга, делим на 365 дней
        (toiletries * 200 / 30); // средства гигиены: 200 л/покупка, делим на 30 дней
    
    // Общий водный след
    const totalWater = domesticWater + foodWater + goodsWater;
    
    // Отображение результатов
    document.getElementById('domestic-result').textContent = Math.round(domesticWater) + ' л/день';
    document.getElementById('food-result').textContent = Math.round(foodWater) + ' л/день';
    document.getElementById('goods-result').textContent = Math.round(goodsWater) + ' л/день';
    document.getElementById('total-result').textContent = Math.round(totalWater) + ' л/день';
    
    // Сравнение с средними показателями
    const comparisonText = getComparisonText(totalWater);
    document.getElementById('comparison-text').textContent = comparisonText;
    
    // Показать результаты
    document.getElementById('results').style.display = 'block';
    
    // Плавная прокрутка к результатам
    document.getElementById('results').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Функция для сравнения с средними показателями
function getComparisonText(totalWater) {
    const averageWater = 4000; // Средний водный след человека в день (литров)
    
    if (totalWater < averageWater * 0.7) {
        return `🎉 Отличный результат! Ваш водный след на ${Math.round((1 - totalWater/averageWater) * 100)}% ниже среднего. Вы заботитесь о водных ресурсах!`;
    } else if (totalWater < averageWater) {
        return `👍 Хорошо! Ваш водный след на ${Math.round((1 - totalWater/averageWater) * 100)}% ниже среднего. Есть потенциал для улучшения.`;
    } else if (totalWater < averageWater * 1.3) {
        return `⚠️ Ваш водный след близок к среднему значению. Попробуйте следовать нашим рекомендациям для снижения.`;
    } else if (totalWater < averageWater * 1.6) {
        return `🔴 Ваш водный след выше среднего на ${Math.round((totalWater/averageWater - 1) * 100)}%. Рекомендуем обратить внимание на рекомендации.`;
    } else {
        return `🚨 Значительно выше среднего! Ваш водный след в ${(totalWater/averageWater).toFixed(1)} раза больше среднего. Обязательно изучите способы снижения потребления воды.`;
    }
}

// Анимация появления элементов при скролле
function animateOnScroll() {
    const elements = document.querySelectorAll('.info-card, .recommendation-card, .result-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Инициализация анимаций
document.addEventListener('DOMContentLoaded', function() {
    animateOnScroll();
});

// Эффект параллакса для фона
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.transform = `translateY(${rate}px)`;
    }
});

// Дополнительные интерактивные элементы
document.addEventListener('DOMContentLoaded', function() {
    // Добавление эффекта наведения на карточки
    const cards = document.querySelectorAll('.info-card, .recommendation-card, .result-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Добавление звукового эффекта при клике на кнопки
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Создаём визуальный эффект
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Добавление CSS для эффекта ripple
const style = document.createElement('style');
style.textContent = `
    button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Переключение таблиц
document.addEventListener('DOMContentLoaded', function() {
    const tableToggles = document.querySelectorAll('.table-toggle');
    tableToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const tableId = this.getAttribute('data-table');
            const tableContent = document.getElementById(tableId);

            if (tableContent) {
                this.classList.toggle('active');
                tableContent.classList.toggle('show');
            }
        });
    });
});