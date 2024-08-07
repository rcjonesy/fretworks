namespace Fretworks.Models;

public class RepairTicketService
{
    public int Id { get; set; }
    public int RepairTicketId { get; set; }
    public int ServiceId { get; set; }
    public Service? Service { get; set; }
}