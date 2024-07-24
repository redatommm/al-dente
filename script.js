document.addEventListener('DOMContentLoaded', function() {
    let currentBlock = null;
    const buttons = document.querySelectorAll('.toggle-btn');
    const firstButton = buttons[0]; // Первая кнопка
    let observer;

    // Функция для удаления класса active у всех кнопок
    const removeActiveClass = () => {
        buttons.forEach(button => button.classList.remove('active'));
    };

    // Функция для добавления класса active
    const setActiveButton = (button) => {
        removeActiveClass();
        button.classList.add('active');
    };

    // Функция для управления отображением блока
    const showBlock = (block) => {
        if (currentBlock) {
            currentBlock.style.display = 'none';
        }
        block.style.display = 'block';
        currentBlock = block;
    };

    // Функция для наблюдения за выходом блока из viewport
    const observeBlock = (block) => {
        if (observer) {
            observer.disconnect();
        }

        observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    // Если текущий блок выходит из viewport
                    showBlock(document.getElementById(firstButton.getAttribute('data-target')));
                    setActiveButton(firstButton);
                }
            });
        });

        observer.observe(block);
    };

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetBlock = document.getElementById(targetId);

            if (currentBlock && currentBlock !== targetBlock) {
                currentBlock.style.display = 'none';
                observer.disconnect(); // Отключаем старый observer
            }

            if (targetBlock.style.display === 'none' || !targetBlock.style.display) {
                showBlock(targetBlock);
                setActiveButton(this);
                observeBlock(targetBlock); // Наблюдаем за новым блоком
            } else {
                targetBlock.style.display = 'none';
                removeActiveClass();
                observer.disconnect(); // Отключаем observer, если блок скрывается
                currentBlock = null;
            }
        });
    });

    // Устанавливаем начальный active класс первой кнопке и отображаем первый блок
    setActiveButton(firstButton);
    currentBlock = document.getElementById(firstButton.getAttribute('data-target'));
    showBlock(currentBlock);
    observeBlock(currentBlock);
});





// Access the Images
let slideImages = document.querySelectorAll('img');
// Access the next and prev buttons
let next = document.querySelector('.next');
let prev = document.querySelector('.prev');
// Access the indicators
let dots = document.querySelectorAll('.dot');

var counter = 0;

// Code for next button
next.addEventListener('click', slideNext);
function slideNext(){
slideImages[counter].style.animation = 'next1 0.5s ease-in forwards';
if(counter >= slideImages.length-1){
    counter = 0;
}
else{
    counter++;
}
slideImages[counter].style.animation = 'next2 0.5s ease-in forwards';
indicators();
}

// Code for prev button
prev.addEventListener('click', slidePrev);
function slidePrev(){
slideImages[counter].style.animation = 'prev1 0.5s ease-in forwards';
if(counter == 0){
    counter = slideImages.length-1;
}
else{
    counter--;
}
slideImages[counter].style.animation = 'prev2 0.5s ease-in forwards';
indicators();
}

// Auto slideing
function autoSliding(){
    deletInterval = setInterval(timer, 3000);
    function timer(){
        slideNext();
        indicators();
    }
}
autoSliding();

// Stop auto sliding when mouse is over
const container = document.querySelector('.slide-container');
container.addEventListener('mouseover', function(){
    clearInterval(deletInterval);
});

// Resume sliding when mouse is out
container.addEventListener('mouseout', autoSliding);

// Add and remove active class from the indicators
function indicators(){
    for(i = 0; i < dots.length; i++){
        dots[i].className = dots[i].className.replace(' active', '');
    }
    dots[counter].className += ' active';
}

// Add click event to the indicator
function switchImage(currentImage){
    currentImage.classList.add('active');
    var imageId = currentImage.getAttribute('attr');
    if(imageId > counter){
    slideImages[counter].style.animation = 'next1 0.5s ease-in forwards';
    counter = imageId;
    slideImages[counter].style.animation = 'next2 0.5s ease-in forwards';
    }
    else if(imageId == counter){
        return;
    }
    else{
    slideImages[counter].style.animation = 'prev1 0.5s ease-in forwards';
    counter = imageId;
    slideImages[counter].style.animation = 'prev2 0.5s ease-in forwards';	
    }
    indicators();
}


document.addEventListener('DOMContentLoaded', function() {
    const faqs = document.querySelectorAll(".faq");

    faqs.forEach((faq) => {
        faq.addEventListener("click", () => {
            faq.classList.toggle("active");
        });
    });
});

const lenis = new Lenis()
function raf(time) {
  lenis.raf(time)
requestAnimationFrame(raf)
}
requestAnimationFrame(raf)



document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.container');
    const element = document.querySelector('.adress');

    function adjustMargin() {
        const containerRect = container.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();

        // Рассчитываем доступное пространство
        const availableSpace = containerRect.right - elementRect.right;
        
        // Если доступного пространства меньше желаемого значения margin-right, уменьшаем его
        let desiredMarginRight = 150; // Задайте желаемое значение margin-right здесь
        if (availableSpace < desiredMarginRight) {
            desiredMarginRight = availableSpace;
        }

        // Устанавливаем динамическое значение margin-right
        element.style.marginRight = desiredMarginRight + 'px';
    }

    // Вызываем функцию при загрузке страницы
    adjustMargin();

    // Вызываем функцию при изменении размера окна
    window.addEventListener('resize', adjustMargin);
});