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
    
    // Переключение режима расчёта
    const modeButtons = document.querySelectorAll('.mode-btn');
    const calculatorContainer = document.querySelector('.calculator-container');
    const modeDescription = document.getElementById('mode-description');
    
    const descriptions = {
        quick: '8–12 ключевых параметров для быстрой оценки водного следа',
        detailed: 'Полный набор параметров для детального анализа водного следа'
    };
    
    if (modeButtons.length > 0 && calculatorContainer) {
        modeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const mode = this.getAttribute('data-mode');
                
                // Переключение активной кнопки
                modeButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Переключение класса контейнера
                calculatorContainer.classList.remove('mode-quick', 'mode-detailed');
                calculatorContainer.classList.add('mode-' + mode);
                
                // Обновление описания
                modeDescription.textContent = descriptions[mode];
            });
        });
    }
});

// Обновление значений слайдеров и числовых полей
document.addEventListener('DOMContentLoaded', function() {
    const sliders = document.querySelectorAll('.slider');
    const numberInputs = document.querySelectorAll('.number-input');
    
    // Функция определения единицы измерения
    function getUnit(sliderId) {
        if (sliderId === 'shower-time' || sliderId === 'dishwashing') return ' мин';
        if (sliderId === 'baths' || sliderId === 'laundry') return ' раз';
        if (sliderId === 'toilet-flush') return ' раз';
        if (sliderId.includes('clothes')) return ' вещ';
        if (sliderId.includes('electronics') || sliderId.includes('books')) return ' покупок';
        if (sliderId.includes('toiletries')) return ' покупок';
        if (sliderId.includes('coffee') || sliderId.includes('tea') || sliderId.includes('juice') || 
            sliderId.includes('soft-drinks') || sliderId.includes('beer') || sliderId.includes('wine')) return ' мл';
        if (sliderId === 'eggs') return ' шт';
        return ' г';
    }
    
    // Функция для синхронизации слайдера и числового поля
    function syncSliderAndNumber(slider, numberInput) {
        if (!slider || !numberInput) return;
        
        const unit = getUnit(slider.id);
        
        // При изменении слайдера - обновляем числовое поле
        slider.addEventListener('input', function() {
            numberInput.value = this.value;
        });
        
        // При изменении числа - обновляем слайдер
        numberInput.addEventListener('input', function() {
            let value = parseFloat(this.value);
            const min = parseFloat(this.min);
            const max = parseFloat(this.max);
            
            // Ограничение диапазоном
            if (isNaN(value)) value = min;
            if (value < min) value = min;
            if (value > max) value = max;
            
            this.value = value;
            slider.value = value;
        });
        
        // Синхронизация при потере фокуса
        numberInput.addEventListener('blur', function() {
            let value = parseFloat(this.value);
            const min = parseFloat(this.min);
            const max = parseFloat(this.max);
            const step = parseFloat(this.step) || 1;
            
            if (isNaN(value)) value = min;
            if (value < min) value = min;
            if (value > max) value = max;
            
            // Округление до шага
            value = Math.round(value / step) * step;
            
            this.value = value;
            slider.value = value;
        });
    }
    
    // Обновление для старых ползунков с value-display
    sliders.forEach(slider => {
        const valueDisplay = slider.parentNode.querySelector('.value-display');
        
        if (valueDisplay) {
            // Обновление при изменении
            slider.addEventListener('input', function() {
                const value = this.value;
                const unit = getUnit(this.id);
                valueDisplay.textContent = value + unit;
            });
            
            // Инициализация отображения
            const initialValue = slider.value;
            const unit = getUnit(slider.id);
            valueDisplay.textContent = initialValue + unit;
        }
    });
    
    // Синхронизация для новых комбинированных полей
    numberInputs.forEach(numberInput => {
        const sliderId = numberInput.id.replace('-number', '');
        const slider = document.getElementById(sliderId);
        syncSliderAndNumber(slider, numberInput);
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
    
    // ===== РАСЧЁТ ПОДКАТЕГОРИЯМ ДЛЯ ДИАГРАММ =====
    
    // Бытовое потребление по категориям
    const showerWater = showerTime * 12;
    const bathWater = baths * 150 / 7;
    const dishwasherWater = dishwashing * 8;
    const laundryWater = laundry * 50 / 7;
    const toiletWater = toiletFlush * 6;
    
    const domesticWater = showerWater + bathWater + dishwasherWater + laundryWater + toiletWater;
    
    // Питание по подкатегориям
    const meatFishWater = 
        (beef / 1000 * 15415) +
        (pork / 1000 * 5988) +
        (lamb / 1000 * 10412) +
        (goatMeat / 1000 * 5521) +
        (chicken / 1000 * 4325) +
        (fish / 1000 * 5000);
    
    const dairyWater = 
        (milk / 1000 * 1020) +
        (cheese / 1000 * 5553) +
        (yogurt / 1000 * 1020) +
        (butter / 1000 * 5553) +
        (cream / 1000 * 1020) +
        (eggs * 50 / 1000 * 3265);
    
    const grainsWater = 
        (bread / 1000 * 1608) +
        (rice / 1000 * 1673) +
        (wheat / 1000 * 1827) +
        (oats / 1000 * 1788) +
        (potatoes / 1000 * 287);
    
    const vegetablesFruitsWater = 
        (vegetables / 1000 * 322) +
        (tomatoes / 1000 * 214) +
        (carrots / 1000 * 195) +
        (onions / 1000 * 345) +
        (fruits / 1000 * 967) +
        (apples / 1000 * 822) +
        (bananas / 1000 * 790) +
        (oranges / 1000 * 560);
    
    const beveragesWater = 
        (coffee / 1000 * 130) +
        (tea / 1000 * 27) +
        (juice / 1000 * 1000) +
        (softDrinks / 1000 * 300) +
        (beer / 1000 * 300) +
        (wine / 1000 * 870);
    
    const oilsWater = 
        (vegetableOil / 1000 * 2575) +
        (oliveOil / 1000 * 14431) +
        (mayonnaise / 1000 * 3000);
    
    const legumesNutsWater = 
        (beans / 1000 * 5053) +
        (lentils / 1000 * 5874) +
        (peas / 1000 * 1979) +
        (nuts / 1000 * 9063) +
        (peanuts / 1000 * 3974);
    
    const sweetsWater = 
        (sugar / 1000 * 197) +
        (chocolate / 1000 * 17196) +
        (honey / 1000 * 1000);
    
    const foodWater = meatFishWater + dairyWater + grainsWater + vegetablesFruitsWater + 
                      beveragesWater + oilsWater + legumesNutsWater + sweetsWater;
    
    // Товары по категориям
    const clothesWater = clothes * 2700 / 30;
    const electronicsWater = electronics * 1600 / 365;
    const booksWater = books * 1000 / 365;
    const toiletriesWater = toiletries * 200 / 30;
    
    const goodsWater = clothesWater + electronicsWater + booksWater + toiletriesWater;
    
    // Общий водный след
    const totalWater = domesticWater + foodWater + goodsWater;
    
    // ===== ОТОБРАЖЕНИЕ РЕЗУЛЬТАТОВ =====
    
    // Основные значения
    document.getElementById('domestic-result').textContent = Math.round(domesticWater) + ' л/день';
    document.getElementById('food-result').textContent = Math.round(foodWater) + ' л/день';
    document.getElementById('goods-result').textContent = Math.round(goodsWater) + ' л/день';
    document.getElementById('total-result').textContent = Math.round(totalWater) + ' л/день';
    
    // Проценты
    const domesticPercent = totalWater > 0 ? Math.round((domesticWater / totalWater) * 100) : 0;
    const foodPercent = totalWater > 0 ? Math.round((foodWater / totalWater) * 100) : 0;
    const goodsPercent = totalWater > 0 ? Math.round((goodsWater / totalWater) * 100) : 0;
    
    document.getElementById('domestic-percent').textContent = domesticPercent + '% от общего';
    document.getElementById('food-percent').textContent = foodPercent + '% от общего';
    document.getElementById('goods-percent').textContent = goodsPercent + '% от общего';
    
    // Сравнение с средними показателями
    const comparisonText = getComparisonText(totalWater);
    document.getElementById('comparison-text').textContent = comparisonText;
    
    // ===== СОЗДАНИЕ ДИАГРАММ =====
    
    // Удаляем старые диаграммы, если есть
    if (window.pieChartInstance) {
        window.pieChartInstance.destroy();
    }
    if (window.barChartInstance) {
        window.barChartInstance.destroy();
    }
    
    // Круговая диаграмма (Pie Chart)
    const pieCtx = document.getElementById('pieChart').getContext('2d');
    window.pieChartInstance = new Chart(pieCtx, {
        type: 'doughnut',
        data: {
            labels: ['Бытовое потребление', 'Питание', 'Скрытая вода в товарах'],
            datasets: [{
                data: [domesticWater, foodWater, goodsWater],
                backgroundColor: [
                    '#0ea5e9', // Быт - голубой
                    '#22c55e', // Питание - зелёный
                    '#f59e0b'  // Товары - жёлтый
                ],
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        font: {
                            size: 13,
                            family: 'Inter'
                        },
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = Math.round(context.raw);
                            const percent = Math.round((context.raw / totalWater) * 100);
                            return ` ${value} л/день (${percent}%)`;
                        }
                    }
                }
            },
            cutout: '60%'
        }
    });
    
    // Сбор данных для столбчатой диаграммы (топ категорий)
    const categoryData = [
        { name: 'Душ', value: showerWater, category: 'domestic' },
        { name: 'Ванна', value: bathWater, category: 'domestic' },
        { name: 'Посуда', value: dishwasherWater, category: 'domestic' },
        { name: 'Стирка', value: laundryWater, category: 'domestic' },
        { name: 'Туалет', value: toiletWater, category: 'domestic' },
        { name: 'Мясо и рыба', value: meatFishWater, category: 'food' },
        { name: 'Молочные', value: dairyWater, category: 'food' },
        { name: 'Злаки и крупы', value: grainsWater, category: 'food' },
        { name: 'Овощи и фрукты', value: vegetablesFruitsWater, category: 'food' },
        { name: 'Напитки', value: beveragesWater, category: 'food' },
        { name: 'Масла и жиры', value: oilsWater, category: 'food' },
        { name: 'Бобовые и орехи', value: legumesNutsWater, category: 'food' },
        { name: 'Сладости', value: sweetsWater, category: 'food' },
        { name: 'Одежда', value: clothesWater, category: 'goods' },
        { name: 'Электроника', value: electronicsWater, category: 'goods' },
        { name: 'Книги', value: booksWater, category: 'goods' },
        { name: 'Гигиена', value: toiletriesWater, category: 'goods' }
    ];
    
    // Сортируем и берём топ-8
    const topCategories = categoryData
        .filter(c => c.value > 0)
        .sort((a, b) => b.value - a.value)
        .slice(0, 8);
    
    // Цвета для столбчатой диаграммы
    const categoryColors = {
        domestic: '#0ea5e9',
        food: '#22c55e',
        goods: '#f59e0b'
    };
    
    // Столбчатая диаграмма (Bar Chart)
    const barCtx = document.getElementById('barChart').getContext('2d');
    window.barChartInstance = new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: topCategories.map(c => c.name),
            datasets: [{
                label: 'Водный след (л/день)',
                data: topCategories.map(c => Math.round(c.value)),
                backgroundColor: topCategories.map(c => categoryColors[c.category]),
                borderRadius: 6,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.raw;
                            const percent = totalWater > 0 ? Math.round((value / totalWater) * 100) : 0;
                            return ` ${value} л/день (${percent}%)`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 11,
                            family: 'Inter'
                        },
                        callback: function(value) {
                            return value + ' л';
                        }
                    }
                },
                y: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 12,
                            family: 'Inter'
                        }
                    }
                }
            }
        }
    });
    
    // ===== БЛОК "ГЛАВНЫЕ ИСТОЧНИКИ" =====
    const sourcesList = document.getElementById('sources-list');
    const sourcesAdvice = document.getElementById('sources-advice');
    
    // Определяем топ-3 источника
    const top3Sources = categoryData
        .filter(c => c.value > 0)
        .sort((a, b) => b.value - a.value)
        .slice(0, 3);
    
    let sourcesHTML = '';
    top3Sources.forEach((source, index) => {
        const percent = totalWater > 0 ? Math.round((source.value / totalWater) * 100) : 0;
        sourcesHTML += `
            <div class="source-item ${source.category}">
                <div class="source-rank">${index + 1}</div>
                <div class="source-info">
                    <div class="source-name">${source.name}</div>
                    <div class="source-value">${Math.round(source.value)} л/день</div>
                </div>
                <div class="source-percent">${percent}%</div>
            </div>
        `;
    });
    sourcesList.innerHTML = sourcesHTML;
    
    // Рекомендации на основе главных источников
    let adviceHTML = '<h5>💡 Рекомендации:</h5><p>';
    
    if (top3Sources.length > 0) {
        const mainCategory = top3Sources[0].category;
        
        if (mainCategory === 'food') {
            if (meatFishWater > foodWater * 0.3) {
                adviceHTML += 'Мясные продукты — основной источник вашего водного следа. Попробуйте сократить потребление красного мяса и увеличить долю растительной пищи. Замена говядины на курицу или рыбу может снизить водный след питания на 30-50%.';
            } else if (dairyWater > foodWater * 0.2) {
                adviceHTML += 'Молочные продукты значительно влияют на ваш водный след. Рассмотрите возможность замены некоторых молочных продуктов на растительные альтернативы (молоко из овса, сои или миндаля).';
            } else {
                adviceHTML += 'Питание — основная составляющая вашего водного следа. Сбалансированная диета с меньшим количеством животных продуктов поможет снизить водный след.';
            }
        } else if (mainCategory === 'domestic') {
            if (showerWater > domesticWater * 0.4) {
                adviceHTML += 'Душ — основной источник бытового водопотребления. Сократите время в душе на 2-3 минуты или установите водосберегающую насадку. Каждая минута экономит около 12 литров воды.';
            } else if (laundryWater > domesticWater * 0.3) {
                adviceHTML += 'Стирка занимает значительную долю в бытовом потреблении. Используйте полную загрузку стиральной машины и выбирайте экономичные режимы.';
            } else {
                adviceHTML += 'Бытовые привычки значительно влияют на водный след. Простые изменения — например, более короткий душ или экономичная стирка — могут существенно сократить потребление.';
            }
        } else if (mainCategory === 'goods') {
            adviceHTML += 'Покупка товаров — основной источник вашего водного следа. Старайтесь выбирать качественные вещи с длительным сроком службы, избегайте импульсивных покупок и отдавайте предпочтение экологичным брендам.';
        }
    }
    
    adviceHTML += '</p>';
    sourcesAdvice.innerHTML = adviceHTML;
    
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

// Переключение таблиц
document.addEventListener('DOMContentLoaded', function() {
    const tableToggles = document.querySelectorAll('.table-toggle');
    console.log('Найдено переключателей таблиц:', tableToggles.length);

    tableToggles.forEach(toggle => {
        // Удаляем старые обработчики событий, если есть
        const newToggle = toggle.cloneNode(true);
        toggle.parentNode.replaceChild(newToggle, toggle);

        newToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            const tableId = this.getAttribute('data-table');
            const tableContent = document.getElementById(tableId);

            console.log('Клик по кнопке, таблица:', tableId, 'Содержимое:', tableContent);

            if (tableContent) {
                this.classList.toggle('active');
                tableContent.classList.toggle('show');

                // Принудительное обновление стиля display
                if (tableContent.classList.contains('show')) {
                    tableContent.style.display = 'block';
                } else {
                    tableContent.style.display = 'none';
                }

                console.log('Классы после клика:', this.className, tableContent.className);
            } else {
                console.error('Таблица не найдена:', tableId);
            }
        });

        // Добавляем поддержку touch событий для мобильных
        newToggle.addEventListener('touchend', function(e) {
            e.preventDefault();
            const tableId = this.getAttribute('data-table');
            const tableContent = document.getElementById(tableId);

            if (tableContent) {
                this.classList.toggle('active');
                tableContent.classList.toggle('show');

                // Принудительное обновление стиля display
                if (tableContent.classList.contains('show')) {
                    tableContent.style.display = 'block';
                } else {
                    tableContent.style.display = 'none';
                }
            }
        });
    });

    // Дополнительные интерактивные элементы
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

    // Добавление эффекта ripple при клике на кнопки
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

    animateOnScroll();
});