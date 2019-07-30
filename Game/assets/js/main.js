$(document).ready(function () {
    let wantToPlayAgain = false;
    function wholeGame() {
        const frontFaceValue = []
        const numberCards = $('#cardsNumber')
        console.log(numberCards.val());
        numberCards.on('input', function () {
            $('label[for="cardsNumber"]').text(`The number of cards is ${numberCards.val()}`)
        })
        $('form').on('submit', function (e) {
            document.documentElement.requestFullscreen();
            e.preventDefault()
            const firstName = document.createElement('td');
            const lastName = document.createElement('td');
            let score = document.createElement('td');
            $(firstName).text(`${$('#firstName').val()}`);
            $(lastName).text(`${$('#lastName').val()}`);
            $(score).text(0);
            $(this).css('display', 'none');
            const newRow = document.createElement('tr');
            newRow.append(firstName, lastName, score)
            $('tbody').append(newRow);
            gameTime();
            for (let i = 1, j = 0; j < numberCards.val(); i++ , j += 2) {
                frontFaceValue[j] = i;
                frontFaceValue[j + 1] = i
            }
            for (let i = 0; i < numberCards.val(); i++) {
                const newCard = document.createElement('div');
                const frontSide = document.createElement('div');
                const backSide = document.createElement('div');
                const numberFront = document.createElement('span')
                let index = Math.floor(Math.random() * frontFaceValue.length);
                $(frontSide).addClass('face front');
                $(backSide).addClass('face back');
                $(newCard).addClass('gameCard');
                $(numberFront).text(frontFaceValue[index]);
                $(frontSide).append(numberFront)
                $(newCard).data('cardNumber', frontFaceValue[index]);
                frontFaceValue.splice(index, 1);
                $(newCard).append(backSide, frontSide);
                $('.custom-container').addClass('cards-container')
                $('.cards-container').append(newCard);
                $(newCard).on('click', function () {
                    let activePair = $('.active')
                    if (activePair.length < 2) {
                        $(newCard).addClass('active');
                        activePair = $('.active')
                    }
                    if (activePair.length == 2) {
                        if ($(activePair[0]).data('cardNumber') == $(activePair[1]).data('cardNumber')) {
                            //WHAT IS WRONG WITH THIS LINE OF CODE???
                            // let score = $('tbody tr').last();     
                            let score = document.querySelector('tbody :last-child :last-child')
                            $(score).text(`${(+$(score).text()) + 1} `)
                            activePair.each(function (index, card) {
                                $(card).removeClass('active');
                                $(card).addClass('foundCard')
                                if (ifWon()) {
                                    setTimeout(() => {
                                        let answer = prompt('CONGRATULATIONS!!! You have won! If you want to play again enter yes').toLowerCase();
                                        if (answer = 'yes') {
                                            wantToPlayAgain = true;
                                            $('form').css('display', 'inline');
                                            score = 0;
                                            bringDefault();
                                        }
                                    }, 1000);
                                };
                            })
                        }
                        else {
                            activePair.each(function (index, card) {
                                setTimeout(function () {
                                    $(card).removeClass('active')
                                }, 1000)

                            })
                        }
                    }
                });
            }
        })

        function bringDefault() {
            $('.gameCard').each(function (index, card) {
                $(card).remove()
            });
        }

        function gameTime() {
            let timeContainer = $('.time-container')
            let counter = 0;
            let time = 180
            const countdown = setInterval(() => {
                timeContainer.text(timeConverter(time - counter));
                if (time - counter == 9) {
                    timeContainer.css('color', 'red')
                }
                if (time - counter == 0) {
                    $('.gameCard').each(function (index, card) {
                        $(card).remove()
                    });
                    setTimeout(() => {
                        let answer = prompt('You lost! If you want to play again enter yes').toLowerCase();
                        if (answer = 'yes') {
                            $('form').css('display', 'inline');
                            wantToPlayAgain = true;
                        }
                    }, 100);
                    clearInterval(countdown);
                }
                if (ifWon()) {
                    clearInterval(countdown)
                }
                counter++;
            }, 1000);
        }

        function timeConverter(time) {
            let minutes = Math.floor(time / 60);
            let seconds = time % 60;
            minutes = checkingDigits(minutes);
            seconds = checkingDigits(seconds);
            return `${minutes} : ${seconds}`
        }

        function checkingDigits(number) {
            if (number < 10) {
                return '0' + number;
            }
            return number;
        }

        function ifWon() {
            if ($('.gameCard').length == $('.foundCard').length) {
                return true;
            }
            return false;
        }
    }
    wholeGame();
    if (wantToPlayAgain == true) {
        wholeGame();
    }
});