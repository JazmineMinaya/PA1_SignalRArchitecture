# SignalR Architecture

Proyecto desarrollado con .NET 10 y SignalR.

## Proyectos

- SignalR.Shared: contiene los contratos compartidos.
- SignalR.Hub: servidor de SignalR.
- SignalR.Client: aplicación web Razor Pages.

## Funcionalidades

### Chat en tiempo real

Permite enviar y recibir mensajes entre clientes conectados.

### Notificaciones de pedidos

Permite notificar cambios de estado de pedidos en tiempo real.

Estados disponibles:

1. Pendiente
2. En preparación
3. Enviado
4. Entregado

Las notificaciones se muestran automáticamente sin recargar la página.

## Requisitos

- .NET 10 SDK
- Visual Studio
- Navegador web

## Ejecución

Abrir una terminal en la carpeta SignalRArchitecture.

### 1. Ejecutar el servidor

```powershell
dotnet run --project SignalR.Hub --urls https://localhost:7001
```

### 2. Ejecutar el cliente

En una segunda terminal:

```powershell
dotnet run --project SignalR.Client --urls https://localhost:7002
```

### 3. Abrir la aplicación

Chat:  
https://localhost:7002

Pedidos:  
https://localhost:7002/Orders

## Pruebas

### 1. Chat en tiempo real

1. Abrir `https://localhost:7002` en dos ventanas del navegador.
2. Comprobar que ambas ventanas muestren el estado **Conectado**.
3. En la primera ventana, escribir un nombre en el campo **Usuario**.
4. Escribir un mensaje en el campo **Mensaje**.
5. Presionar el botón **Enviar**.
6. Comprobar que el mensaje aparezca automáticamente en ambas ventanas, junto con la hora de envío.
7. En la segunda ventana, escribir otro nombre de usuario y enviar una respuesta.
8. Verificar que ambos clientes reciban el nuevo mensaje sin recargar la página.

### 2. Notificaciones de pedidos

1. Abrir `https://localhost:7002/Orders` en dos ventanas del navegador.
2. Comprobar que ambas ventanas muestren el estado **Conectado**.
3. Seleccionar un número de pedido.
4. Elegir un estado: Pendiente, En preparación, Enviado o Entregado.
5. Presionar **Actualizar pedido**.
6. Comprobar que ambas ventanas reciben la notificación automáticamente, sin recargar la página.

## Validaciones

El servidor rechaza:

- Identificadores de pedido menores o iguales a cero.
- Estados vacíos.
- Estados que no pertenecen a las opciones permitidas.

## Tecnologías

- C#
- .NET 10
- ASP.NET Core SignalR
- Razor Pages
- JavaScript
