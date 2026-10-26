"use strict";

const connection =
    new signalR.HubConnectionBuilder()
        .withUrl("https://localhost:7001/orderHub")
        .withAutomaticReconnect()
        .build();

const updateButton = document.getElementById("updateButton");
const status = document.getElementById("connectionStatus");
const ordersList = document.getElementById("ordersList");

connection.on("ReceiveOrderNotification", (notification) => {
    const item = document.createElement("li");
    const fecha = new Date(notification.sentAt);

    const hora = fecha.toLocaleTimeString("es-DO", {
        hour: "2-digit",
        minute: "2-digit"
    });

    item.textContent = `[${hora}] Pedido #${notification.orderId}: ${notification.status}`;
    ordersList.appendChild(item);
});

connection.onreconnecting(() => {
    status.textContent = "Reconectando...";
    updateButton.disabled = true;
});

connection.onreconnected(() => {
    status.textContent = "Conectado";
    updateButton.disabled = false;
});

async function startConnection() {
    try {
        await connection.start();
        status.textContent = "Conectado";
        updateButton.disabled = false;
    }
    catch (error) {
        status.textContent = "Error de conexión";
        console.error(error);
    }
}

updateButton.addEventListener("click", async () => {
    const orderId = Number(document.getElementById("orderId").value);
    const status = document.getElementById("orderStatus").value;

    if (!Number.isInteger(orderId) || orderId <= 0) {
        alert("El número de pedido debe ser mayor que cero.");
        return;
    }

    if (connection.state !== signalR.HubConnectionState.Connected) {
        alert("No existe una conexión activa.");
        return;
    }

    try {
        await connection.invoke("UpdateOrder", orderId, status);
    }
    catch (error) {
        console.error("No se pudo actualizar el pedido:", error);
    }
});

startConnection();
