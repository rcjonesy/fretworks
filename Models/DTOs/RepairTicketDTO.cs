namespace Fretworks.Models.DTOs;

public class RepairTicketDTO
{
    public int Id { get; set; }
    public string CustomerName { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public string Instrument { get; set; }
    public DateTime DropOffDate { get; set; }
    public DateTime? PickupDate { get; set; }
    public bool IsRushed { get; set; }
    public bool IsCompleted { get; set; }
    public string? Message { get; set; }
    public List<RepairTicketServiceDTO>? RepairTicketServices { get; set; }
    public int CustomerId { get; set; }
    public UserProfileDTO? Customer { get; set; }
    public int? EmployeeId { get; set; }
    public UserProfileDTO? Employee { get; set; }
    public decimal TotalCost => CalculateTotalCost();

    private decimal CalculateTotalCost()
    {
        if (RepairTicketServices == null)
            return 0m;

        decimal total = 0m;
        foreach (var repairTicketService in RepairTicketServices)
        {
            total += repairTicketService.Service.Cost;
        }

        if(IsRushed)
        {
            total += 75m;
        }
        return total;
    }
}