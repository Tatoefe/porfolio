/*************************************************************************\
 Copiamos el código con las funciones.
 Estas funciones fueron descargadas de la web, no nos importa tanto como
 están hechas, lo que nos interesa es su funcionalidad.
\*************************************************************************/

//*************************************************************************
// Esta función carga las imágenes cuando se ingresa al sitio, esto hace
// que la navegación por la galería sea más rápida.
function preloadImages()
{
  // Document es la referencia al DOM (Document Object Model).
  var doc = document; //En document.images[0] aparece la primer imagen.
  // agarra todas las imágenes del document (property) document.images:
  // HTMLCollectionOf < HTMLImageElement > devuelve un array de imágenes.
  if (doc.images)
  {
    // En javascript podemos crear un atributo del objeto sin la necesidad
    // de tenerlo previamente declarado.
    // Esta condición chequea que no exista el arreglo (validación extra).
    if (!doc.imagesList)
    {
      doc.imagesList = new Array(); // crea un array de imágenes.
    }

    var j = doc.imagesList.length;
    var arguments = preloadImages.arguments;

    for (var i = 0; i < arguments.length; i++)
    {
      if (arguments[i].indexOf("#") != 0)
      {
        // var Image: new (width?: number, height?: number) => 
        // HTMLImageElement(Image es una clase propia del DOM)
        doc.imagesList[j] = new Image;
        doc.imagesList[j++].src = arguments[i];
      }
    }
  }
}

//*************************************************************************
// Esta función nos permite cambiar la imagen de una etiqueta <img>.
function swapImage()
{
  var j = 0;
  var pos;
  var args = swapImage.arguments;
  document.imagesListSource = new Array;
  for (var i = 0; i < (args.length - 2); i += 3)
  {
    // Si encuentra el objeto y valida que no sea NULL.
    if ((pos = findObj(args[i])) != null)
    {
      document.imagesListSource[j++] = pos; // Le asigna esa posición.
      if (!pos.oSrc)
      {
        // Acá es donde se crea un atributo a pos llamado oSrc (oldSource) 
        // y se le asigna el src actual. 
        pos.oSrc = pos.src;
      }

      // pos.src sera pisado por el otro source que cambiamos.
      pos.src = args[i + 2];
    }
  }
}

//*************************************************************************
// Esta función es utilizada por la función anterior swapImage().
function findObj(args, doc)
{
  var p, i, x;  // variables auxiliares
  if (!doc) doc = document;

  // Busca la posición de ese elemento en el array (el signo de pregunta).
  if ((p = args.indexOf("?")) > 0 && parent.frames.length)
  {
    // substring corta la cadena desde donde se le indica.
    doc = parent.frames[args.substring(p + 1)].document;

    // Acá toma lo que esta antes del signo de pregunta.
    args = args.substring(0, p);
  }

  // Si X no contiene los argumentos del DOCUMENT y document.all nos trae
  // tags. 
  if (!(x = doc[args]) && doc.all)
  {
    // Entonces se le asigna a la variable auxiliar todos los argumentos
    // del doc.
    x = doc.all[args];
  }

  /* !x -> si es NULL. (es una forma de decir que no hay contenido). 
  Se usa un condicional adicional.*/
  for (i = 0; !x && i < doc.forms.length; i++)
  {
    x = doc.forms[i][args];
  }

  for (i = 0; !x && doc.layers && i < doc.layers.length; i++)
  {
    x = findObj(args, doc.layers[i].document);
  }

  if (!x && doc.getElementById)
  {
    // Se obtiene el elemento por el id, getElementById es un método propio
    // del DOM.
    x = doc.getElementById(args);
  }
  return x; // al ser una funcion que busca un objeto, debe retornarlo. 
}

//*************************************************************************
// Esta función oculta o muestra el contenido de un contenedor.
function showHideLayers()
{
  var i, visible, obj; //variables aux

  // arguments es propio de Javascript. Toma los argumentos de la función
  // aunque no estén definidos propiamente. 
  // (aca al no ser tipado se pueden pasar argumentos igual)
  var args = showHideLayers.arguments;

  for (i = 0; i < (args.length - 2); i += 3)
  {
    with (document)
    if (getElementById && ((obj = getElementById(args[i])) != null))
    {
      visible = args[i + 2];
      if (obj.style)
      {
        obj = obj.style;
 
        // Para asignarle a visible el string show/hide según venga por 
        // argumentos pasados a la función showHideLayers provenientes del
        // html. Ésta variable podría ser util sobre las clases de CSS.
        // O sino simplemente mediante el atributo style en el html, 
        // oculta o muestra según venga por argumentos.
        if (visible == 'show')
        {
          visible = 'visible';
        }
        else if (visible == 'hide')
        {
          visible = 'hidden';
        }
      }
      obj.visibility = visible;
    }
  }
}