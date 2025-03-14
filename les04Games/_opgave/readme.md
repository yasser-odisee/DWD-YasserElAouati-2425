# Opzet

Dit is een oefening op Javascript game programming, bedoeld om in groepjes van 3 uit te werken. Je mag vrij gebruikmaken van AI!

# Deel 1: bestudering startcode

De docent zal je de startcode uitleggen. Zie dat je goed alles begrijpt voor je aan de taken hieronder begint. Enkele vragen:

1. welke coderegels en in welke volgorde worden uitgevoerd als ik op de play knop klik?
2. waar zit de game loop, hoe werkt het?
3. vraag aan chatGPT: wat is requestAnimationFrame, hoe werkt het en wat is het voordeel t.o.v. setTimeout?
4. welke property bepaalt de horizontale positie van een sprite?
5. hoe werken de animaties van ground, clouds en helicopter?
6. welke regels code beperken de bewegingsvrijheid van de helicopter?
7. waar staat de implementatie van game.repaint(), en hoe werkt het?
8. hoe komt het dat je op het startscherm de helicopter, clouds en ground niet ziet?
9. wat bepaalt de horizontale snelheid van de groud en clouds, hoe werkt het?

# Deel 2: spel bouwen

Je mag als groep zelf kiezen welke onderdelen je uitwerkt, en in welke volgorde. Je hoeft ze zeker niet allemaal af te hebben tegen het einde van de les. Gebruik HeliRabbit.mp4 als inspiratie (maar je mag zeker afwijken als je wil).

## 1. Springend konijn

Maak nu het springend konijn naar voorbeeld van de helicopter sprite. Tips:
- de afbeeldingen van het konijn is veel te groot; deel alle afmetingen door 4
- als de animatie van het konijn gelukt is, geef het dan een snelheid in de x-richting
- zorg er dan voor dat als het konijn rechts uit beeld verdwijnt, het weer links in beeld komt

## 2. navigatie helicopter met pijltjestoetsen

Definieer een keydown event handler voor de keyboard. Stel de `speedX` of `speedY` property aan van de heli sprite in op -1 of +1, naargelang welke pijltjestoets ingedrukt werd.
Definieer om de beweging te stoppen nu ook een keyup event hander, waarin je `speedX` en `speedY` op 0 zet. 

## 3. Water ballon gooien

Als op de spatiebalk gedrukt wordt, toon je een ballon op de positie van de helicopter. Laat de ballon sneller en sneller vallen door bij elke loop een klein getal bij speedY op te tellen. Controleer wanneer de ballon de grond raakt, en of het dan ook het konijn raakt.

Probeer dan ook het geluid "falling.mp3" af te spelen telkens de spatiebalk ingedrukt wordt.

## 4. Preloader.js class

Voeg een bestand Preloader.js toe aan de classes map. Vraag AI om te helpen een preloader class te bouwen die alle geluiden en afbeeldingen preloadt. Verberg standaard de Play knop; toon het als alles gepreload is. De code in scripts.js zou er ongeveer als volgt kunnen uitzien:

```
function startIntro() {
   // ... toon play button
   // ... lees intro tekst (zie taak 2)
}

const loader = new Preloader();
loader.images = ['/img/balloon.png', '/img/clouds.png', '/img/ground.png', '/img/heli.png', '/img/night.png', '/img/play.png', '/img/rabbit.png', '/img/sky.png', '/img/youlose.png', '/img/youwin.png']; 
loader.sounds = ['/snd/boing.mp3', '/snd/explosion.mp3', '/snd/falling.mp3', '/snd/splash.mp3']; 
loader.preload(startIntro); // callback function
```

Tip: pas de x property van de play button sprite aan zodat het in beeld komt, en roep de `replaint()` methode van de game op. 

## 5. gesproken introductietekst 

Laat een introductietekst voorlezen nadat de preloader klaar is. Dit hoeft niet exact dezelfde tekst te zijn als in de video; vraag b.v. AI een tekst te genereren. Gebruik de [https://rogiervdl.github.io/JS-course/04_games.html#speechsynthesisutterance](SpeechSynthesisUtterance API) uit de Javascript cursus. 

## 6. Sfx.js class

Maak nu een Sfx class om geluidseffecten af te spelen. Voorzie een property `audio` en methodes `play()` en `setVolume()`. 
Voeg nu geluidseffecten toe aan de game.

## 7. Afwerking

Ben je al tot hier geraakt? Sterk! Werk nu het spel af naar voorbeeld van de video (of maak er zelf iets leuks van).

