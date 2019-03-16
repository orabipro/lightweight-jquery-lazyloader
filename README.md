# Lightweight JQuery LazyLoader

A very lightweight jquery lazy loader with customizeable settings and callbacks

## Version

The latest version is 1.0.1

## Demo

[See how this library works](https://cdn.moutinho.org/lightweight-jquery-lazyloader/example.html)

## Implementation

Make sure to implement JQuery first before the Lightweight JQuery LazyLoader library.

### Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Meta -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">

  <!-- Scripts -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <!-- OR -->
  <!-- <script src="./assets/js/jquery-3.3.1.min.js"></script> -->

  <title></title>
</head>
<body>

  <!-- Make sure to implement this file on the very bottom of the body -->
  <script src="https://cdn.moutinho.org/lightweight-jquery-lazyloader/@latest/lwcLazyLoader.min.js"></script>
  <!-- OR -->
  <!-- <script src="./assets/js/lwcLazyLoader.min.js"></script> -->
</body>
</html>
```

## Usage

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Meta -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">

  <!-- Scripts -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

  <title></title>
</head>
<body>

  <script src="https://cdn.moutinho.org/lightweight-jquery-lazyloader/@latest/lwcLazyLoader.min.js"></script>
  <script>
    // Easy way
    $('html').lwcLazyLoader(); /*lazy loading on all <img>*/

    // Customized way (default values)
    $('html').lwcLazyLoader({
      selector: '.lazy-load', /*class selector*/
      dataSelector: 'data-lazyload', /*lazy load src selector*/
      dataLoadedSelector: 'data-lazyloaded', /*lazy load state selector*/
      dataCSSSelector: 'data-lazyload-css', /*lazy load css selector*/
      onElementLoad: function(el) { /*called when the element is loading*/
        // ...code
      },
      onElementLoaded: function(el) { /*called when the element was loaded*/
        // ...code
      }
    });
  </script>
</body>
</html>
```

## Supported Browsers

* Chrome
* Firefox
* Edge
* Internet Explorer

## Changelog

### 1.0.1

* Fix internet Explorer

### 1.0.0

* Initial Release of LwcLazyLoader