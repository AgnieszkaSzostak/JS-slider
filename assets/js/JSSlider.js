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
                event => this.fireCustomEvent(event.currentTarget, 'js-slider-img-click')
            ))

            this.images.forEach(item => item.addEventListener(
                'click', 
                event => this.fireCustomEvent(event.currentTarget, 'js-slider-start')
            ))
            
            this.sliderRootElement.buttons.forEach( button => button.addEventListener(
                'mouseover',
                event => this.fireCustomEvent(event.currentTarget, 'js-slider-stop')
            ))

            this.sliderRootElement.buttons.forEach( button => button.addEventListener(
                'mouseout',
                event => this.fireCustomEvent(event.currentTarget, 'js-slider-start')
            )) 
    
            if(navNext) { 
                navNext.addEventListener(
                    'click',
                    event => this.fireCustomEvent(this.sliderRootElement, 'js-slider-img-next'))
            }

            if(navPrev) { 
                navPrev.addEventListener(
                    'click',  
                    event => this.fireCustomEvent(this.sliderRootElement, 'js-slider-img-prev')
                )
            }
        
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
                    event => this.onImageClick(event)
            ));

            this.images.forEach( img => img.addEventListener(
                    'js-slider-start', 
                    event => this.slideImages(event)
            ));
 
            this.sliderRootElement.buttons.forEach(button => button.addEventListener(
                'js-slider-stop', 
                event => this.stopSlideImages(event)
            ));   

            this.sliderRootElement.buttons.forEach(button => button.addEventListener(
                'js-slider-start', 
                event => this.slideImages(event)
            ));   
  
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

        event.currentTarget.classList.remove('js-slider--active');
        const thumbsList = document.querySelectorAll(`.js-slider__thumbs-item:not(.${this.sliderRootElement.prototypeClass})`);
        thumbsList.forEach( item => item.parentElement.removeChild(item));
    }
    onImageClick(event) {
        console.log('event', event);
        
            this.sliderRootElement.classList.add('js-slider--active');
                
            const src = event.currentTarget.querySelector('img').src;
            this.sliderRootElement.querySelector('.js-slider__image').src = src;
        
            const groupName = event.currentTarget.dataset.sliderGroupName;
            this.createThumbs(groupName, src);
        }
    createThumbs(groupName, src){
        const thumbsList = document.querySelectorAll(`${this.selector}[data-slider-group-name='${groupName}']`);
        
        thumbsList.forEach( item => {
            const thumbElement = this.cloneThumbElement(); 
            const thumbImg = thumbElement.querySelector('img');
            thumbImg.src = item.querySelector('img').src;
            if(thumbImg.src === src) {
                thumbImg.classList.add('js-slider__thumbs-image--current');
            }
            document.querySelector('.js-slider__thumbs').appendChild(thumbElement);
        })
    }
    cloneThumbElement(){
        const prototype = document.querySelector(`.${this.sliderRootElement.prototypeClass}`);
        const thumbElement = prototype.cloneNode(true);
        thumbElement.classList.remove('js-slider__thumbs-item--prototype');

        return thumbElement
    }

    onImageNext(event){
            console.log(this, 'onImageNext');
            const current = document.querySelector(`.${this.sliderRootElement.currentImageClass}`);
            
            const parentCurrent = current.parentElement;
            const nextElement = parentCurrent.nextElementSibling;
            this.changeCurrentImage(nextElement, current);
    }
    onImagePrev(event) {
            console.log(this, 'onImagePrev');

            const current = document.querySelector(`.${this.sliderRootElement.currentImageClass}`);
        
            const parentCurrent = current.parentElement;
            const prevElement = parentCurrent.previousElementSibling;
            this.changeCurrentImage(prevElement, current);
    }

    changeCurrentImage(newCurrent, current){
        if(newCurrent && !newCurrent.className.includes(`${this.sliderRootElement.prototypeClass}`)) {
            const img = newCurrent.querySelector('img')
            img.classList.add(this.sliderRootElement.currentImageClass);
    
            document.querySelector('.js-slider__image').src = img.src;
            current.classList.remove(this.sliderRootElement.currentImageClass);
        }
    }
}

