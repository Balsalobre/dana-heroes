# Dana Heroes uso del Api

[Link api prod](http://vps183761.vps.ovh.ca:5000/api)

- Una vez se tenga una liasta de paises involuclrados. Podemos crear los héroes que pertenezcan a cada uno de ellos.

- El controlador de heroes está securizado mediante JWT, todas las cabeceras deben llevar el token, que previamente obtenemos
  en Auth controller --> Haciendo un registro y luego sacando el token en el login.

- Cuando tengamos el token hay que autenticarlo.

![Pasar el token en las cabeceras](/resources/swagger-auth.gif)

- Una vez autorizados el listado de heroes se puede paginar a nuestro gusto.
- Podemos buscar heroes de un pais mediante el metodo GET /hero/country/{name}