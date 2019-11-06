# JS Slider w wersji klasowej 

Ostatnio tworzyliśmy pokaz slajdów, który będziemy chcieli przebudować wykorzystując poznane rozwiązania.

Utworzymy klasę będąca modułem, który będzie reprezentował nasz Slider. Wspomniana klasa powinna być umieszczona w osobnym pliku, który importujemy w odpowiednim miejscu (pamiętaj również o eksporcie tej klasy).

Wszędzie, gdzie to możliwe wykorzystuj rozwiązania poznane w ostanio przerabianym materiale tj. destrukturyzacja, rozproszenie, wartości domyślne, funkcje strzałkowe itp.

Pamiętaj, o odpowiednim nazywaniu metod w klasie - im bardziej jednoznacznie określająca jej czynność tym lepiej. 

Każda metoda powinna realizować jedno zadanie (analogicznie jak [zasada pojedyńczej odpowiedzialności w klasach](https://pl.wikipedia.org/wiki/Zasada_jednej_odpowiedzialno%C5%9Bci)). Jeśli tak nie jest spróbują ją podzielić na mniejsze części.

Wykorzystaj Webpack-a, aby napisany kod w JavaScript był wpierany przez starsze przeglądarki tj. wszystkie wydane np. po 2016 roku i posiadający udział w rynku na poziomie co najmniej 1%.


## Implementacja

W plikach znajdziesz kod implementujący Slider wykorzystując funkcję. Jednak nic nie stoi na przeszkodzie, aby użyć rozwiązania, które ostatnio sam napisałeś.

Zadanie ma być tak wykonane, aby poniższy kod uruchamiał całą mechinę:

```
import JSSlider from './modules/JSSlider';

const init = () => {
    const imagesList = document.querySelectorAll('.gallery__item');
    imagesList.forEach( img => {
        img.dataset.sliderGroupName = Math.random() > 0.5 ? 'nice' : 'good';
    });

    const jsSlider = new JSSlider('.gallery__item');
    jsSlider.run();
}

document.addEventListener('DOMContentLoaded', init);
```

Najlepszym sposobem rozwiązania tego zadania będzie zbudowanie klasy od zera stopniowo przenosząc poszczególne rozwiązania z funkcji do metod danej klasy.

Kiedy już przeniesiesz rozwiązania 1 do 1 to wtedy możesz zastanowić sie nad refaktoryzacją kodu.

Pamiętaj, że im cześciej sprawdzasz przenoszony kod tym łatwiej będzie Ci się w nim odnaleźć.