class FullscreenSlider {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.prevNumber = document.querySelector('.prev-number span');
        this.currentNumber = document.querySelector('.current-number span');
        
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        this.isAnimating = false;
        
        this.init();
    }
    
    init() {
        // Добавляем обработчики событий
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Добавляем обработчики для клавиатуры
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
        
        // Добавляем свайпы для мобильных устройств
        this.addSwipeSupport();
        
        // Обновляем навигацию
        this.updateNavigation();
    }
    
    nextSlide() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        const nextSlide = (this.currentSlide + 1) % this.totalSlides;
        this.changeSlide(nextSlide);
    }
    
    prevSlide() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        const prevSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.changeSlide(prevSlide);
    }
    
    changeSlide(newIndex) {
        // Убираем активный класс с текущего слайда
        this.slides[this.currentSlide].classList.remove('active');
        
        // Устанавливаем новый текущий слайд
        this.currentSlide = newIndex;
        
        // Добавляем активный класс к новому слайду
        setTimeout(() => {
            this.slides[this.currentSlide].classList.add('active');
            this.updateNavigation();
            this.isAnimating = false;
        }, 50);
    }
    
    updateNavigation() {
        // Обновляем номера слайдов
        const prevSlideIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        const currentSlideIndex = this.currentSlide;
        
        this.prevNumber.textContent = String(prevSlideIndex + 1).padStart(2);
        this.currentNumber.textContent = String(currentSlideIndex + 1).padStart(2);
    }
    
    addSwipeSupport() {
        let startX = 0;
        let endX = 0;
        
        const sliderElement = document.querySelector('.slider');
        
        sliderElement.addEventListener('touchstart', (e) => {
            startX = e.changedTouches[0].screenX;
        });
        
        sliderElement.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].screenX;
            this.handleSwipe(startX, endX);
        });
    }
    
    handleSwipe(startX, endX) {
        const swipeThreshold = 50;
        
        if (startX - endX > swipeThreshold) {
            // Свайп влево - следующий слайд
            this.nextSlide();
        } else if (endX - startX > swipeThreshold) {
            // Свайп вправо - предыдущий слайд
            this.prevSlide();
        }
    }
}

// Автопрокрутка слайдера (опционально)
class AutoSlider extends FullscreenSlider {
    constructor() {
        super();
        this.autoPlayInterval = null;
        this.autoPlayDelay = 5000; // 5 секунд
        
        this.startAutoPlay();
        
        // Останавливаем автопрокрутку при наведении
        document.querySelector('.slider-container').addEventListener('mouseenter', () => {
            this.stopAutoPlay();
        });
        
        // Возобновляем автопрокрутку когда курсор убран
        document.querySelector('.slider-container').addEventListener('mouseleave', () => {
            this.startAutoPlay();
        });
    }
    
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// Инициализация слайдера
document.addEventListener('DOMContentLoaded', () => {
    // Для автопрокрутки используйте new AutoSlider();
    new FullscreenSlider();
});



document.getElementById('poolBillingToggle').addEventListener('change', function() {
    const monthlyPrices = document.querySelectorAll('.pool-pricing__monthly');
    const yearlyPrices = document.querySelectorAll('.pool-pricing__yearly');
    
    monthlyPrices.forEach(price => price.classList.toggle('hidden'));
    yearlyPrices.forEach(price => price.classList.toggle('hidden'));
});



document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const contactMethods = document.querySelectorAll('input[name="contactMethod"]');
    const contactInputs = document.querySelectorAll('.contact-inputs > div');
    
    // Обработка переключения способов связи
    contactMethods.forEach(method => {
        method.addEventListener('change', function() {
            // Скрываем все поля ввода
            contactInputs.forEach(input => {
                input.classList.remove('active');
            });
            
            // Показываем соответствующее поле
            const methodType = this.value;
            const targetInput = document.querySelector(`.${methodType}-input`);
            if (targetInput) {
                targetInput.classList.add('active');
            }
        });
    });
    
    // Маска для телефона
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.startsWith('7') || value.startsWith('8')) {
                value = value.substring(1);
            }
            
            if (value.length > 0) {
                value = '+7 (' + value;
                
                if (value.length > 7) {
                    value = value.substring(0, 7) + ') ' + value.substring(7);
                }
                if (value.length > 12) {
                    value = value.substring(0, 12) + '-' + value.substring(12);
                }
                if (value.length > 15) {
                    value = value.substring(0, 15) + '-' + value.substring(15, 17);
                }
            }
            
            e.target.value = value;
        });
    });
    
    // Обработка отправки формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Сбор данных формы
        const formData = {
            fullName: document.getElementById('fullName').value,
            contactMethod: document.querySelector('input[name="contactMethod"]:checked').value,
            contactValue: getContactValue(),
            email: document.getElementById('email').value,
            address: document.getElementById('address').value
        };
        
        // Валидация
        if (validateForm(formData)) {
            // Имитация отправки
            showSuccessMessage();
        }
    });
    
    function getContactValue() {
        const activeMethod = document.querySelector('input[name="contactMethod"]:checked').value;
        switch (activeMethod) {
            case 'phone':
                return document.getElementById('phone').value;
            case 'telegram':
                return document.getElementById('telegram').value;
            case 'whatsapp':
                return document.getElementById('whatsapp').value;
            case 'vk':
                return document.getElementById('vk').value;
        }
    }
    
    function validateForm(data) {
        // Удаляем предыдущие сообщения об ошибках
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Проверка ФИО
        if (!data.fullName.trim()) {
            showError('Пожалуйста, введите ФИО');
            return false;
        }
        
        // Проверка контактных данных
        if (!data.contactValue.trim()) {
            showError('Пожалуйста, введите контактные данные');
            return false;
        }
        
        // Проверка email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showError('Пожалуйста, введите корректный email');
            return false;
        }
        
        // Проверка адреса
        if (!data.address.trim()) {
            showError('Пожалуйста, введите адрес');
            return false;
        }
        
        return true;
    }
    
    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        form.insertBefore(errorDiv, form.firstChild);
        
        // Автоматическое удаление через 5 секунд
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    }
    
    function showSuccessMessage() {
        // Удаляем предыдущие сообщения об ошибках
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = 'Регистрация прошла успешно!';
        
        form.insertBefore(successDiv, form.firstChild);
        
        // Очистка формы через 3 секунды
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.remove();
            }
            form.reset();
            // Активируем поле телефона по умолчанию
            document.querySelector('.phone-input').classList.add('active');
        }, 3000);
    }
    
    // Инициализация - активируем поле телефона по умолчанию
    document.querySelector('.phone-input').classList.add('active');
});





document.addEventListener('DOMContentLoaded', function() {
    // Установка минимальной даты (сегодня)
    const dateInput = document.getElementById('trainingDate');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;

    // Элементы модальных окон
    const timeConfirmationModal = document.getElementById('timeConfirmationModal');
    const successModal = document.getElementById('successModal');
    
    // Кнопки модальных окон
    const confirmTimeBtn = document.getElementById('confirmTime');
    const changeTimeBtn = document.getElementById('changeTime');
    const closeSuccessBtn = document.getElementById('closeSuccess');
    
    // Обработка выбора времени тренировки
    const timeSelect = document.getElementById('trainingTime');
    timeSelect.addEventListener('change', function() {
        if (dateInput.value && timeSelect.value) {
            timeConfirmationModal.classList.add('active');
        }
    });
    
    // Подтверждение времени
    confirmTimeBtn.addEventListener('click', function() {
        timeConfirmationModal.classList.remove('active');
    });
    
    // Изменение времени
    changeTimeBtn.addEventListener('click', function() {
        timeConfirmationModal.classList.remove('active');
        timeSelect.value = '';
        timeSelect.focus();
    });
    
    // Форматирование номера карты
    const cardNumberInput = document.getElementById('cardNumber');
    cardNumberInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        let formattedValue = '';
        
        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += ' ';
            }
            formattedValue += value[i];
        }
        
        e.target.value = formattedValue;
    });
    
    // Форматирование срока действия карты
    const cardExpiryInput = document.getElementById('cardExpiry');
    cardExpiryInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        
        e.target.value = value;
    });
    
    // Только цифры для CVC
    const cardCVCInput = document.getElementById('cardCVC');
    cardCVCInput.addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/\D/g, '');
    });
    
    // Только цифры для телефона
    const phoneInput = document.getElementById('paymentPhone');
    phoneInput.addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/\D/g, '');
    });
    
    // Обработка отправки формы
    const bookingForm = document.getElementById('bookingForm');
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Проверка всех обязательных полей
        const trainingType = document.querySelector('input[name="trainingType"]:checked');
        const trainingDate = document.getElementById('trainingDate').value;
        const trainingTime = document.getElementById('trainingTime').value;
        const paymentPhone = document.getElementById('paymentPhone').value;
        const cardNumber = document.getElementById('cardNumber').value;
        const cardExpiry = document.getElementById('cardExpiry').value;
        const cardCVC = document.getElementById('cardCVC').value;
        
        // Валидация
        if (!trainingType) {
            showError('Пожалуйста, выберите тип тренировки.');
            return;
        }
        
        if (!trainingDate) {
            showError('Пожалуйста, выберите дату тренировки.');
            return;
        }
        
        if (!trainingTime) {
            showError('Пожалуйста, выберите время тренировки.');
            return;
        }
        
        if (!paymentPhone) {
            showError('Пожалуйста, введите номер телефона.');
            return;
        }
        
        if (!cardNumber) {
            showError('Пожалуйста, введите номер карты.');
            return;
        }
        
        if (!cardExpiry) {
            showError('Пожалуйста, введите срок действия карты.');
            return;
        }
        
        if (!cardCVC) {
            showError('Пожалуйста, введите CVC код.');
            return;
        }
        
        // Валидация номера карты
        const cleanCardNumber = cardNumber.replace(/\s/g, '');
        if (cleanCardNumber.length !== 16) {
            showError('Номер карты должен содержать 16 цифр.');
            cardNumberInput.focus();
            return;
        }
        
        // Валидация срока действия карты
        if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) {
            showError('Срок действия карты должен быть в формате ММ/ГГ.');
            cardExpiryInput.focus();
            return;
        }
        
        // Валидация CVC
        if (!/^\d{3}$/.test(cardCVC)) {
            showError('CVC код должен содержать 3 цифры.');
            cardCVCInput.focus();
            return;
        }
        
        // Валидация телефона
        if (paymentPhone.length < 10) {
            showError('Номер телефона должен содержать не менее 10 цифр.');
            phoneInput.focus();
            return;
        }
        
        // Если все проверки пройдены, показать модальное окно успеха
        successModal.classList.add('active');
    });
    
    // Закрытие модального окна успеха
    closeSuccessBtn.addEventListener('click', function() {
        successModal.classList.remove('active');
        // Очистка формы после успешной отправки
        bookingForm.reset();
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('trainingDate').min = today;
    });
    
    // Функция показа ошибки
    function showError(message) {
        // Удаляем предыдущие сообщения об ошибках
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Создаем новое сообщение об ошибке
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        // Вставляем сообщение перед формой
        bookingForm.insertBefore(errorDiv, bookingForm.firstChild);
        
        // Автоматически удаляем сообщение через 5 секунд
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    }
});
