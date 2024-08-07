using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Fretworks.Data;
using Fretworks.Models.DTOs;
using Fretworks.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System.Runtime.InteropServices;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using System.Linq.Expressions;
using Npgsql.EntityFrameworkCore.PostgreSQL.Design.Internal;
using System.Reflection.Metadata.Ecma335;
using Microsoft.AspNetCore.Authentication;


namespace Fretworks.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TheRepairTicket : ControllerBase
{
    private FretworksDbContext _dbContext;

    public TheRepairTicket(FretworksDbContext context)
    {
        _dbContext = context;
    }


    //=================================================================================================

    [HttpGet]
    // Authorize
    public IActionResult Get()
    {
        return Ok(_dbContext
            .RepairTickets
            .Include(repairTicket => repairTicket.RepairTicketServices)
            .Include(repairTicket => repairTicket.Customer)
            .Include(repairTicket => repairTicket.Employee)
            .Select(repairTicket => new RepairTicketDTO
            {
                Id = repairTicket.Id,
                CustomerName = repairTicket.CustomerName,
                Email = repairTicket.Email,
                PhoneNumber = repairTicket.PhoneNumber,
                Instrument = repairTicket.Instrument,
                DropOffDate = repairTicket.DropOffDate,
                PickupDate = repairTicket.PickupDate,
                IsRushed = repairTicket.IsRushed,
                IsCompleted = repairTicket.IsCompleted,
                Message = repairTicket.Message,
                RepairTicketServices = repairTicket.RepairTicketServices.Select(rts => new RepairTicketServiceDTO
                {
                    Id = rts.Id,
                    RepairTicketId = rts.RepairTicketId,
                    ServiceId = rts.ServiceId,
                    Service = new ServiceDTO
                    {
                        Id = rts.Service.Id,
                        ServiceName = rts.Service.ServiceName,
                        Cost = rts.Service.Cost
                    }

                }).ToList(),
                CustomerId = repairTicket.CustomerId,
                Customer = new UserProfileDTO
                {
                    Id = repairTicket.Customer.Id,
                    FirstName = repairTicket.Customer.FirstName,
                    LastName = repairTicket.Customer.LastName,
                    Address = repairTicket.Customer.Address,
                    IdentityUserId = repairTicket.Customer.IdentityUserId,
                    IdentityUser = repairTicket.Customer.IdentityUser,
                    IsEmployee = repairTicket.Customer.IsEmployee
                },
                EmployeeId = repairTicket.EmployeeId,
                Employee = repairTicket.Employee != null ? new UserProfileDTO
                {
                    Id = repairTicket.Employee.Id,
                    FirstName = repairTicket.Employee.FirstName,
                    LastName = repairTicket.Employee.LastName,
                    Address = repairTicket.Employee.Address,
                    IdentityUserId = repairTicket.Employee.IdentityUserId,
                    IdentityUser = repairTicket.Employee.IdentityUser,
                    IsEmployee = repairTicket.Employee.IsEmployee
                } : null
            })
            .ToList());
    }


    [HttpPatch("{id}")]
    public IActionResult CompleteStatus(int id)
    {
        var repairTicketToPatch = _dbContext.RepairTickets.SingleOrDefault(rp => rp.Id == id);
        if (repairTicketToPatch == null)
        {
            return NotFound();
        }

        repairTicketToPatch.IsCompleted = !repairTicketToPatch.IsCompleted;
        _dbContext.SaveChanges();

        return Ok();
    }

    [HttpPatch("{userId}/{id}/claim")]
    public IActionResult Claim(int userId, int id)
    {
        var ticketToClaim = _dbContext.RepairTickets.SingleOrDefault(rp => rp.Id == id);
        if (ticketToClaim == null)
        {
            return NotFound();
        }
        ticketToClaim.EmployeeId = userId;
        _dbContext.SaveChanges();

        return Ok();
    }

    [HttpGet("{id}")]
    public IActionResult GetCustomerRepairTickets(int id)
    {
        // Assuming _dbContext is an instance of your DbContext class
        var customerRepairTickets = _dbContext.RepairTickets
         .Include(repairTicket => repairTicket.RepairTicketServices)

            .Where(repairTicket => repairTicket.CustomerId == id) // Assuming CustomerId is the property to filter by
            .Select(repairTicket => new RepairTicketDTO
            {
                Id = repairTicket.Id,
                CustomerName = repairTicket.CustomerName,
                Email = repairTicket.Email,
                PhoneNumber = repairTicket.PhoneNumber,
                Instrument = repairTicket.Instrument,
                DropOffDate = repairTicket.DropOffDate,
                PickupDate = repairTicket.PickupDate,
                IsRushed = repairTicket.IsRushed,
                IsCompleted = repairTicket.IsCompleted,
                Message = repairTicket.Message,
                RepairTicketServices = repairTicket.RepairTicketServices.Select(rts => new RepairTicketServiceDTO
                {
                    Id = rts.Id,
                    RepairTicketId = rts.RepairTicketId,
                    ServiceId = rts.ServiceId,
                    Service = new ServiceDTO
                    {
                        Id = rts.Service.Id,
                        ServiceName = rts.Service.ServiceName,
                        Cost = rts.Service.Cost
                    }

                }).ToList(),
                EmployeeId = repairTicket.EmployeeId,
                Employee = repairTicket.Employee != null ? new UserProfileDTO
                {
                    Id = repairTicket.Employee.Id,
                    FirstName = repairTicket.Employee.FirstName,
                    LastName = repairTicket.Employee.LastName,
                } : null
            })
            .ToList();

        return Ok(customerRepairTickets);
    }

    [HttpDelete("{id}")]
    public IActionResult CancelRepair(int id)
    {
        var repairTicketToCancel = _dbContext.RepairTickets.SingleOrDefault(rp => rp.Id == id);
        if (repairTicketToCancel == null)
        {
            return NotFound();
        }

        _dbContext.RepairTickets.Remove(repairTicketToCancel);
        _dbContext.SaveChanges();

        return Ok();
    }


    [HttpPost]
    // [Authorize]
    public IActionResult newRepair(RepairTicket newRepairTicket)
    {
        _dbContext.RepairTickets.Add(newRepairTicket);
        _dbContext.SaveChanges();
        return Created($"/api/concert/{newRepairTicket.Id}", newRepairTicket);
    }

    [HttpGet("repairTicket/{id}")]

    public IActionResult getRepairbyId(int id)
    {
        RepairTicket? repairTicket = _dbContext.RepairTickets
     .Include(rt => rt.RepairTicketServices) // Include related RepairTicketServices
         .ThenInclude(rts => rts.Service)     // Then include related Service entities
     .SingleOrDefault(rt => rt.Id == id);


        if (repairTicket == null)
        {
            return NotFound();
        }

        RepairTicketDTO repairTicketDTO = new RepairTicketDTO
        {
            Id = repairTicket.Id,
            CustomerName = repairTicket.CustomerName,
            Email = repairTicket.Email,
            PhoneNumber = repairTicket.PhoneNumber,
            Instrument = repairTicket.Instrument,
            DropOffDate = repairTicket.DropOffDate,
            PickupDate = repairTicket.PickupDate,
            IsRushed = repairTicket.IsRushed,
            IsCompleted = repairTicket.IsCompleted,
            Message = repairTicket.Message,
            RepairTicketServices = repairTicket.RepairTicketServices.Select(rts => new RepairTicketServiceDTO
            {
                Id = rts.Id,
                RepairTicketId = rts.RepairTicketId,
                ServiceId = rts.ServiceId,
                Service = new ServiceDTO
                {
                    Id = rts.Service.Id,
                    ServiceName = rts.Service.ServiceName,
                    Cost = rts.Service.Cost
                }

            }).ToList(),
        };

        return Ok(repairTicketDTO);


    }
    [HttpPut("{id}")]

    public IActionResult UpdateRepair(int id, RepairTicket incomingTicket)
    {
        RepairTicket? repairTicketToUpdate = _dbContext.RepairTickets
        .Include(rt => rt.RepairTicketServices)
        .SingleOrDefault(rt => rt.Id == id);

        if (repairTicketToUpdate == null)
        {
            return NotFound();
        }

        //properties to update
        repairTicketToUpdate.CustomerName = incomingTicket.CustomerName;
        repairTicketToUpdate.Email = incomingTicket.Email;
        repairTicketToUpdate.PhoneNumber = incomingTicket.PhoneNumber;
        repairTicketToUpdate.Instrument = incomingTicket.Instrument;
        repairTicketToUpdate.DropOffDate = incomingTicket.DropOffDate;
        repairTicketToUpdate.IsRushed = incomingTicket.IsRushed;
        repairTicketToUpdate.Message = incomingTicket.Message;
        repairTicketToUpdate.RepairTicketServices = incomingTicket.RepairTicketServices;


        _dbContext.SaveChanges();

        return Ok("Repair Ticket successfully updated");
    }



}





