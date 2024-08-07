namespace Fretworks.Models.DTOs;

public class RepairTicketServiceDTO
{
    public int Id { get; set; }
    public int RepairTicketId { get; set; }
    public int ServiceId { get; set; }
    public ServiceDTO? Service { get; set; }
}