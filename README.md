# Dana Heroes uso del Api

[Link api prod](http://vps183761.vps.ovh.ca:5000/api)

- Una vez se tenga una liasta de paises involuclrados. Podemos crear los héroes que pertenezcan a cada uno de ellos.

- El controlador de heroes está securizado mediante JWT, todas las cabeceras deben llevar el token, que previamente obtenemos
  en Auth controller --> Haciendo un registro y luego sacando el token en el login.

- Cuando tengamos el token hay que autenticarlo.

![Pasar el token en las cabeceras](/resources/swagger-auth.gif)

- Una vez autorizados el listado de heroes se puede paginar a nuestro gusto.
- Podemos buscar heroes de un pais mediante el metodo GET /hero/country/{name}

## Datos ejemplo de prueba
- Usuario
```
{
  "email": "prueba@gmail.com",
  "password": "123qweYU€"
}
```
- Access Token
```
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBydWViYUBnbWFpbC5jb20iLCJpYXQiOjE1NzIzNjI3MzIsImV4cCI6MTU3MjM2NjMzMn0.hebdh-rF9dqLXmniVwXPa0KKcsy4reUZbFXyyho75r4"
}
```
- Para buscar un heroe por país simplemente hay que introducir el nombre del país donde se encuentra

- PD: para crear un heroe hay que introducirlo con el Id del País
```
{
  "name": "Aquaman",
  "skill": "Nadar",
  "country": "5db853f6b67aab2dc9ad197b"
}
```

