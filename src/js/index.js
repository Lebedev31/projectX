window.addEventListener('DOMContentLoaded', function(){
   
    //слайдер
    (function(){
        'use strict'
        const sliderWrapper = document.querySelector('.slider__wrapper');
        const prev = document.querySelector('.product__prev');
        const next = document.querySelector('.product__next');
        const sliderItemOffsetWidth = document.querySelector('.slider__item').offsetWidth;
        const sliderItem = document.querySelectorAll('.slider__item');
        let step = 0;
        let position = 4;
        const styleSlider = getComputedStyle(sliderWrapper);
        const styleGap = +styleSlider.gap.replace(/px/g, '');

        next.addEventListener('click', function(){
            if(position < sliderItem.length){
                step++;
                sliderWrapper.style.transform = `translateX(${step * (-sliderItemOffsetWidth - styleGap)}px)`;
                position++;
            } 
        })

        prev.addEventListener('click', function(){
            if(position > 4){
                step--;
                sliderWrapper.style.transform = `translateX(${step * (-sliderItemOffsetWidth - styleGap)}px)`;
                position--;
               
            }
           
        })

    }());

    // калькулятор

    (function(){
        const basketItem = document.querySelectorAll('.basket__item');
        basketItem.forEach(function(elem, index){
          
            elem.querySelector('.basket__btn1').addEventListener('click', function has(e){
                let basketAmount = elem.querySelector('.basket__amount');
                let basketUnity = elem.querySelector('.basket__unity');
                let basketTotal = elem.querySelector('.basket__total');
                if(e.target){
                let a = basketAmount.textContent;
                let b = basketUnity.textContent.replace(/₽\/шт./gi, '' );
                let z;
                a--;
                if(a == 0){
                    basketAmount.textContent = 0;
                    z = 0;
                    basketTotal.textContent = z + '₽'; 
                    numberOfPieces();
                }
                else if(a > 0){
                    z = b * a;
                    basketAmount.textContent = a;
                    basketTotal.textContent = z + '₽';
                    numberOfPieces();
                }
               
            }
        })
           elem.querySelector('.basket__btn2').addEventListener('click', function(e){
                let basketAmount = elem.querySelector('.basket__amount');
                let basketUnity = elem.querySelector('.basket__unity');
                let basketTotal = elem.querySelector('.basket__total');
                if(e.target){
                    let a = basketAmount.textContent;
                    let b = basketUnity.textContent.replace(/₽\/шт./gi, '' );
                    a++;
                    let z = b * a;
                    basketAmount.textContent = a;
                    basketTotal.textContent = z + '₽';
                    numberOfPieces();
                }
            })

    })
    function numberOfPieces(){
        'use strict'
        const basketAmountCollection = document.querySelectorAll('.basket__amount');
        const orderText = document.querySelector('.order__text');
        const headerInfo = document.querySelector('#total');
        const total2 = document.querySelector('#total2');
        
        const basketArr = [];
        basketAmountCollection.forEach(function(elem){
            basketArr.push(elem.textContent);
        })
        let total;
        if(basketArr.length > 1){
             total = basketArr.reduce((a, b)=> +a + +b);
        }
        else if(basketArr.length == 1){
            total = +basketArr[0];
        }
      
       if(total == 0){
         orderText.textContent = ' ' + 'ед.товарa';
         headerInfo.textContent = ' ' + 'ед.товарa'
         total2.textContent = ' ' + 'шт';
       }
       else if (total == undefined){
         orderText.textContent = ' ' + 'ед.товарa';
         headerInfo.textContent = ' ' + 'ед.товарa'
         total2.textContent = ' ' + 'шт';

       }
       else{
        orderText.textContent = total + ' ' + 'ед.товара';
        headerInfo.textContent = total + ' ' + 'ед.товарa';
        total2.textContent = total + ' ' + 'шт';
       }  
    totalAmountOfMoney();
    }

    function totalAmountOfMoney(){
        const basketTotalCollection = document.querySelectorAll('.basket__total');
        const basketArr2 = [];
        const sum1 = document.querySelector('#sum1');
        const totalRight = document.querySelector('.total__right');
        const sum = document.querySelector('#sum');
        basketTotalCollection.forEach(function(elem){
            basketArr2.push(elem.textContent.replace(/₽/g, ''));
        })
        let totalRub;
        if(basketArr2.length > 1){
             totalRub = basketArr2.reduce((a, b)=> +a + +b);
        }
        else if(basketArr2.length == 1){
            totalRub = +basketArr2[0];
        }
        if(totalRub == 0){
            sum1.textContent = '' + '₽';
            totalRight.textContent = '' + '₽'
            sum.textContent = '';
          }
          else if (totalRub == undefined){
            sum1.textContent = '' + '0₽';
            totalRight.textContent = '' + '0₽'
            sum.textContent = '';
   
          }
          else{
             sum1.textContent = totalRub + '₽';
             totalRight.textContent = totalRub + '₽';
             sum.textContent =  totalRub + '₽';
          }    
    }
    // передача чекбокса
    const settingCheckbox = document.querySelector('.setting__checkbox');
    const checking = document.querySelector('#checking');
    
    settingCheckbox.addEventListener('click', function(){
        settingCheckbox.checked ? checking.textContent = 'Да': checking.textContent = 'Нет'; 
    })
    // удаление элементов по одному
    const closeItem = document.querySelectorAll('.basket__close');
    const settingBlock = document.querySelector('.setting');
    const basketDynamic = document.querySelector('.basket__dynamic');
    const childrenDynamik = basketDynamic.children;
    let indexZ = 0;
    
    closeItem.forEach(function(elem){
        elem.addEventListener('click', deleteItem)
    })

function deleteItem(){
    this.parentElement.remove();
    numberOfPieces();
    if(childrenDynamik.length < 1){
        settingBlock.remove();
        checking.textContent = 'Нет';
    }
}
// полное очищение корзины
const orderCleaningBasket = document.querySelector('.order__cleaning-basket');
orderCleaningBasket.addEventListener('click', function(){
   for(let elem of basketItem){
    elem.remove();
   }
   settingBlock.remove();
   checking.textContent = 'Нет';
   numberOfPieces();
})

}());
// отправка данных на сервер

(function(){
'use strict'
const totalForm = document.querySelector('.total');

totalForm.addEventListener('submit', async function(e){
       e.preventDefault();
        let response;
               response = await fetch('', {
               method: 'POST',
               body: new FormData(totalForm),
          }
        )   
      if(response.ok){
        alert('Отправка данных прошла успешно');
      }
      else if(response.ok == false){
        alert('ой...что-то пошло не так')
      }
 

   

 
        })







}())

    


})