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


namespace Fretworks.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ServiceController : ControllerBase
{
    private FretworksDbContext _dbContext;

    public ServiceController(FretworksDbContext context)
    {
        _dbContext = context;
    }


    //=================================================================================================

    [HttpGet]
    // Authorize
    public IActionResult Services()
    {
        return Ok(_dbContext
            .Services
            .Select(service => new ServiceDTO
            {
                Id = service.Id,
                ServiceName = service.ServiceName,
                Cost = service.Cost
            })
            .ToList());
    }





}


