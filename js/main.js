$(document).ready(function () {
    var currentFloor = 2; //переменная с текущем этажом
    var counterUp = $(".counter-up"); //кнопка увеличения этажа
    var counterDown = $(".counter-down"); //кнопка уменьшения этажа
    var floorPath = $(".home-image path"); //каждый отдельный этаж в svg
    var modal = $('.modal');
    var modalCloseButton = $(".modal-close-button");
    var viewFlatsButton = $(".view-flats");
    var flatPath = $(".flats path");
    var flatLink = $(".flat-link");
    var menuButton = $(".menu-button");
    var navbarPanel = $(".navbar-panel")
    //функция при наведении мышкой на этаж
    $(".home-image path").on('mouseover', function () {
        floorPath.removeClass("current-floor"); //удаление класса активного этажа
        currentFloor = $(this).attr("data-floor"); //получение значения текущего этажа
        $(".counter").text(currentFloor); //выведение номера текущего этажа на счётчик     
    });

    floorPath.on('click', toggleModal); /* при клике на этаж открыть модалку */
    modalCloseButton.on('click', toggleModal); /* при клике на крестик закрыть модалку */
    viewFlatsButton.on('click', toggleModal);

    //функция кнопки вверх
    counterUp.on('click', function () { //отслеживаем клик по кнопкве вверх
        if (currentFloor < 18) { //условие по величине этажа
            currentFloor++; //прибавка к счётчику
            usCurrentFloor = currentFloor.toLocaleString("en-US", {
                minimumIntegerDigits: 2,
                useGrouping: false //форматирование для правильного выведения счётчика
            })
            $(".counter").text(usCurrentFloor); //вывод счётчика
            floorPath.removeClass("current-floor"); //удаление класса у всех этажей
            $(`[data-floor=${usCurrentFloor}]`).toggleClass("current-floor"); //добавление класса к текущему
        }
    });

    counterDown.on('click', function () {
        if (currentFloor > 2) {
            currentFloor--;
            usCurrentFloor = currentFloor.toLocaleString("en-US", {
                minimumIntegerDigits: 2,
                useGrouping: false
            });
            $(".counter").text(usCurrentFloor);
            floorPath.removeClass("current-floor");
            $(`[data-floor=${usCurrentFloor}]`).toggleClass("current-floor");
        }
    });

    function toggleModal() {
        /* функция открыть-закрыть модалку (поменять наличие класса is-open) */
        modal.toggleClass("is-open");
    }

    flatPath.on('mouseover', function () {
        flatPath.removeClass("flat-floor-active");
        flatLink.removeClass("flat-active");
        currentFlat = $(this).attr("data-flat");
        $(`[data-flat-floor=${currentFlat}]`).toggleClass("flat-active");
    });

    flatLink.on('mouseover', function () {
        flatLink.removeClass("flat-active");
        flatPath.removeClass("flat-floor-active");
        currentFlatFloor = $(this).attr("data-flat-floor");
        $(`[data-flat=${currentFlatFloor}]`).toggleClass("flat-floor-active");
    });

    menuButton.on('click', function () {
        navbarPanel.toggle("fast");
    });
});