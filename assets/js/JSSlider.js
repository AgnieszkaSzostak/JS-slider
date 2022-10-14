export default class JSSlider {
    constructor(selector){
        console.log(this);
        this.selector = selector;
        this.images = document.querySelectorAll(this.selector);
        this.sliderRootElement = document.querySelector('.js-slider');
        this.sliderRootElement.prototypeClass = 'js-slider__thumbs-item--prototype';
        this.sliderRootElement.currentImageClass = 'js-slider__thumbs-image--current';
        this.sliderRootElement.buttons = [
            this.sliderRootElement.querySelector('.js-slider__nav--next'),
            this.sliderRootElement.querySelector('.js-slider__nav--prev')
        ];
        this.slideInterval = null;
    }

    run(){
    
        this.initEvents();
        this.initCustomEvents();  
    }

    fireCustomEvent(element, name){
        console.log(element.className, '=>', name);
    
        const event = new CustomEvent(name, {
            bubbles: true,
        });
    
        element.dispatchEvent( event );
    }

    initEvents() {
        const [navNext, navPrev] = this.sliderRootElement.buttons;
            
            this.images.forEach(item => item.addEventListener(
                'click', 
                event => this.fireCustomEvent(event.currentTarget, 'js-slider-img-click')))

            this.images.forEach(item => item.addEventListener(
                'click', 
                event => this.fireCustomEvent(event.currentTarget, 'js-slider-start')))
            
            this.sliderRootElement.buttons.forEach( button => button.addEventListener(
                'mouseover',
                event => this.fireCustomEvent(event.currentTarget, 'js-slider-stop')))
            this.sliderRootElement.buttons.forEach( button => button.addEventListener(
                'mouseout',
                event => this.fireCustomEvent(event.currentTarget, 'js-slider-start')))
        
            // console.log(navPrev, navNext);
            // todo: 
            // utwórz event o nazwie [click], który ma uruchomić event [js-slider-img-next]
            // na elemencie [.js-slider__nav--next]
            
            if(navNext) { 
                navNext.addEventListener(
                    'click',
                    event => this.fireCustomEvent(this.sliderRootElement, 'js-slider-img-next'))
            }
        
            // // todo:
            // // utwórz event o nazwie [click], który ma uruchomić event [js-slider-img-prev]
            // // na elemencie [.js-slider__nav--prev]
          
            if(navPrev) { 
                navPrev.addEventListener(
                    'click',  
                    event => this.fireCustomEvent(this.sliderRootElement, 'js-slider-img-prev'))

            }
        
            // // todo:
            // // utwórz event o nazwie [click], który ma uruchomić event [js-slider-close]
            // // tylko wtedy gdy użytkownik kliknie w [.js-slider__zoom]
            const zoom = this.sliderRootElement.querySelector('.js-slider__zoom');
            if(zoom) {
                zoom.addEventListener(
                    'click', 
                    event => {if(event.target === event.currentTarget){ 
                        this.fireCustomEvent(this.sliderRootElement, 'js-slider-close')
                    }})
            }
    }
    
    initCustomEvents () {
            this.images.forEach( img => img.addEventListener(
                    'js-slider-img-click', 
                    event => this.onImageClick(event)));
            this.images.forEach( img => img.addEventListener(
                    'js-slider-start', 
                    event => this.slideImages(event)));
 
            this.sliderRootElement.buttons.forEach(button => button.addEventListener(
                'js-slider-stop', 
                event => this.stopSlideImages(event)));   
            this.sliderRootElement.buttons.forEach(button => button.addEventListener(
                'js-slider-start', 
                event => this.slideImages(event)));   
  
            this.sliderRootElement.addEventListener('js-slider-img-next', event => this.onImageNext(event));
            this.sliderRootElement.addEventListener('js-slider-img-prev', event => this.onImagePrev(event));
            this.sliderRootElement.addEventListener('js-slider-close', (event) => {
                this.onClose(event); 
                this.stopSlideImages(event) 
            });
            

    }
    stopSlideImages(event){
        console.log(this.slideInterval);
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
          }
    }
    slideImages(event){
        this.stopSlideImages();
        this.slideInterval = setInterval(this.onImageNext.bind(this), 3000);
        }

    onClose(event) {
    // todo:
    // 1. należy usunać klasę [js-slider--active] dla [.js-slider]
    // 2. należy usunać wszystkie dzieci dla [.js-slider__thumbs] pomijając [.js-slider__thumbs-item--prototype]
        event.currentTarget.classList.remove('js-slider--active');
        const thumbsList = document.querySelectorAll(`.js-slider__thumbs-item:not(.${this.sliderRootElement.prototypeClass})`);
        thumbsList.forEach( item => item.parentElement.removeChild(item));
    }
    onImageClick(event) {
        console.log('event', event);
            // todo:  
            // 1. dodać klasę [js-slider--active], aby pokazać całą sekcję
            // 2. wyszukać ściężkę do klikniętego elementu i wstawić do [.js-slider__image]
            // 3. pobrać nazwę grupy zapisaną w dataset klikniętego elementu
            // 4. wyszukać wszystkie zdjęcia należące do danej grupy
            // 5. utworzyć na podsawie elementu [.js-slider__thumbs-item--prototype] zawartość dla [.js-slider__thumbs]
            // 6. zaznaczyć przy pomocy klasy [.js-slider__thumbs-image--current], który element jest aktualnie wyświetlany
            this.sliderRootElement.classList.add('js-slider--active');
                
            const src = event.currentTarget.querySelector('img').src;
            this.sliderRootElement.querySelector('.js-slider__image').src = src;
        
            const groupName = event.currentTarget.dataset.sliderGroupName;
            const thumbsList = document.querySelectorAll(`${this.selector}[data-slider-group-name='${groupName}']`);
            const prototype = document.querySelector(`.${this.sliderRootElement.prototypeClass}`);
            thumbsList.forEach( item => {
                const thumbElement = prototype.cloneNode(true);
                thumbElement.classList.remove('js-slider__thumbs-item--prototype');
                const thumbImg = thumbElement.querySelector('img');
                thumbImg.src = item.querySelector('img').src;
                if(thumbImg.src === src) {
                    thumbImg.classList.add('js-slider__thumbs-image--current');
                }
                document.querySelector('.js-slider__thumbs').appendChild(thumbElement);
            })
        }
        onImageNext(event){
                console.log(this, 'onImageNext');
                // console.log(event, 'eventOnImageNext');
                // [this] wskazuje na element [.js-slider]
             
                // todo:
                // 1. wyszukać aktualny wyświetlany element przy pomocy [.js-slider__thumbs-image--current]
                // 2. znaleźć element następny do wyświetlenie względem drzewa DOM
                // 3. sprawdzić czy ten element istnieje
                // 4. przełączyć klasę [.js-slider__thumbs-image--current] do odpowiedniego elementu
                // 5. podmienić atrybut src dla [.js-slider__image]
                const current = document.querySelector(`.${this.sliderRootElement.currentImageClass}`);
                
                const parentCurrent = current.parentElement;
                const nextElement = parentCurrent.nextElementSibling;
                if(nextElement && !nextElement.className.includes(`.${this.sliderRootElement.prototypeClass}`)) {
                    const img = nextElement.querySelector('img')
                    img.classList.add(this.sliderRootElement.currentImageClass);
            
                    document.querySelector('.js-slider__image').src = img.src;
                    current.classList.remove(this.sliderRootElement.currentImageClass);
                }
        }
        onImagePrev(event) {
                console.log(this, 'onImagePrev');
                // [this] wskazuje na element [.js-slider]
                
                // todo:
                // 1. wyszukać aktualny wyświetlany element przy pomocy [.js-slider__thumbs-image--current]
                // 2. znaleźć element poprzedni do wyświetlenie względem drzewa DOM
                // 3. sprawdzić czy ten element istnieje i czy nie posiada klasy [.js-slider__thumbs-item--prototype]
                // 4. przełączyć klasę [.js-slider__thumbs-image--current] do odpowiedniego elementu
                // 5. podmienić atrybut src dla [.js-slider__image]
                const current = document.querySelector(`.${this.sliderRootElement.currentImageClass}`);
            
                const parentCurrent = current.parentElement;
                const prevElement = parentCurrent.previousElementSibling;
                if(prevElement && !prevElement.className.includes(`.${this.sliderRootElement.prototypeClass}`)) {
                    const img = prevElement.querySelector('img')
                    img.classList.add(this.sliderRootElement.currentImageClass);
            
                    document.querySelector('.js-slider__image').src = img.src;
                    current.classList.remove(this.sliderRootElement.currentImageClass);
                }
        }
}

