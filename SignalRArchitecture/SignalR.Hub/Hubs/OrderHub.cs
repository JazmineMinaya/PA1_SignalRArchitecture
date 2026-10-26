using Microsoft.AspNetCore.SignalR;
using SignalR.Shared.Contracts;

namespace SignalR.HubServer.Hubs;

public sealed class OrderHub 
    : Microsoft.AspNetCore.SignalR.Hub
{
    public async Task UpdateOrder(int orderId, string status)
    {
        if (orderId <= 0 || string.IsNullOrWhiteSpace(status))
        {
            throw new HubException("El pedido y el estado son obligatorios.");
        }

        status = status.Trim();

        if (status != "Pendiente" && status != "En preparación" && status != "Enviado" && status != "Entregado")
        {
            throw new HubException("El estado del pedido no es válido.");
        }

        var notification = new OrderNotification(
            orderId,
            status,
            DateTimeOffset.UtcNow
        );

        await Clients.All.SendAsync("ReceiveOrderNotification", notification);
    }
}
