# __Mi primer proyecto personal en Next.js__
<p align="center">
  <img src="https://miro.medium.com/max/1000/1*htbUdWgFQ3a94PMEvBr_hQ.png" width="80%" height="auto" alt="Next.js logo" title="Next.js logo">
</p>


Este proyecto empezó a realizarse el 10 de septiembre del año 2022, desde entonces a evolucionado hasta la versión presente, en él vertí lo poco que he hido aprendiendo durante todo ese tiempo, en conjunto con mi formación tecnóloga en análisis y desarrollo de sistemas de información. 

El proyecto inició como una aplicación con enfoque __SPA__ para lo cual, inicié con la herramienta __[create-react-app](https://create-react-app.dev/)__, sin embargo, fue migrado a __[Next.js]()__ el 7 de diciembre de 2022 en busca de encontrar una incursión en el enfoque __SSR__ y perfeccionar mis habilidades en el área de desarrollo web. Para este fin mencionaré cuáles fueron las tecnologías empleadas en su desarrollo y los retos que se presentaron hasta su eventual finalización.

## Conocimientos implementados
- __Javascript__

  En el presente proyecto se usó principalmente este lenguaje de programación, entre los temas aplicados y puestos en práctica están:

    - Variables, tipos de datos y operadores
    - Estructuras de control de flujo (if-else, switch, bucles)
    - Funciones y programación funcional
    - Arreglos y objetos
    - Manejo de errores y excepciones
    - Prototipos y herencia
    - Eventos y manejo del DOM
    - ajax fetch api.
    - Asincronía y programación con promesas async/await y then/catch.
    - manipulación de cookies.
    - Modulos y organización del código
    - condiciones ternarias.
    - entre otras.
    - __Retos__:
        Este lenguaje planteó el reto más grande pues, fue necesario comprender sus fundamentos y buenas prácticas para alcanzar resultados satisfactorios.

- __Hojas de estilo en cascada__

  Con la intención de emplear las habilidades aprendidas en __CSS__ me dispuse a no usar herramientas o librerías de estilo, cada hoja de estilo fue creada desde cero, incluyendo las ``media querys`` para el diseño ``responsive``. 
    - __Retos__:
        Esta tecnología significó un reto relativamente alto, el ``responsive design`` debió siempre tenerse en consideración a la hora de estilizar.

- __React.js - JSX__

  Para la realización de las interfaces gráficas del presente proyecto fue necesario dominar la librería de ``javascript`` __[React.js](https://reactjs.org/)__, dentro de la cual se ejercitarion temas como:

    - diseño por composición
    - ciclo de vida de componentes
    - manejo de estado local y global
    - reactividad 
    - asincronía
    - control de virtual DOM
    - Renderizado condicional
    - formularios controlados
    - __Retos__
      - Los retos de esta tecnología estubo en sus fundamentos, había que entender muy bien el manejo del virtualDOM en relación con el ciclo de vida de los componentes. 
      - Otro reto fue manejas adecuadamente los estados locales, las buenas prácticas y su correcta declaración.
      - La transmición de la información entre el arbol de compoentes mediante props y estados globales fue otro de los retos más importantes.

- __Sistema de búsqueda con autocompletado__

  Un sencillo sistema de búsqueda con autocompletado en tiempo real fue implementado con la una dependencia de código abierto llamada __[algolia/autocomplete-core](https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-core/)__.

    - __Retos__:
      El principal reto de esta tecnología estubo en integrarla de forma funcional al proyecto, pues en el proceso quedó patente que, es necesario tener la capacidad de seguir la documentación de dependencias de terceros.

- __Servicio de Api back-end__

  El manejo de servicios de autenticación, lógica de negocio, conexión con base de datos, verificación y generación de ``jewtokens`` de sesión y demás controles desde el servidor implementado directamente en __Next.js__.
      - __Retos__:
      Implementar un sistema de validación por *jsonwebtoken* fue sin duda el mayor reto de esta implementación.

- __Consumo de servicio Api__

  Con la intención de ejercitar lo aprendido en el consumo de __Api rest__ en el presente proyecto se realizó el consumo de una Api pública servida por la empresa __[Marvel]( https://developer.marvel.com)__ en la cual obtenemos información sobre variedad de personajes de la popular casa de comics.
    - __Retos__:
      El reto estuvo en la aplicación de peticiones *HTTP* y todo lo que ello implica: la asincrónía, los manejos de error, etc.

- __MongoDB con Mongoose__

  __[Mongoose](https://mongoosejs.com/)__ es una librería de javascript que proporciona una solución sencilla basada en esquemas para modelar los datos de una aplicación en relación con el manejador de base de datos MongoDB. Incluye funciones integradas de asignación de tipos, validación, creación de consultas, ganchos de lógica de negocio y mucho más. Esta fue la tecnología empleada para el manejo de los datos del presente proyecto, las operaciones realizadas con esta tecnología fueron:

    - Conexión a base de datos.
    - Modelado de colecciones y documentos en base de datos.
    - Declaración de tipos, ponderaciones y relaciones entre colecciones y documentos.
    - Inserciones, Eliminaciones y consultas a base de datos.
    - __Retos__:
      El mayor reto a este respecto fue la integración del manejador de base de datos no relacional *MongoDB*, el cual significó aprender sus fundamentos y aplicaciones.

- __Manejo secillo de canvas__

  Se implementó un pizarrón virtual para dibujar con un único color y posteriormente almacenar el lienzo como una imagen en la base de datos.
    - __Retos__:
      Este fue un reto interesante en el cual se manpuló la api del objeto *canvas* además de integrar una dependencia de terceros para extraer el contenido del lienzo. La mayor dificultad se presentó a la hora de almacenar la información del lienzo, cosa que requirió de un sifrado de la información para hacerla transmisible mediante consulta.





