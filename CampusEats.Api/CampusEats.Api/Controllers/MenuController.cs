using CampusEats.Api.Dtos;
using CampusEats.Api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization; 

namespace CampusEats.Api.Controllers;

[ApiController] // Automatically returns 400 on invalid request bodies
[Route("api/[controller]")] // Maps to /api/menu
public class MenuController : ControllerBase
{
    private readonly IMenuService _svc;

    // Constructor injection for the service layer
    public MenuController(IMenuService svc)
        => _svc = svc; // Injected via Dependency Injection (DI)

    [HttpGet] // GET /api/menu
    public ActionResult<IEnumerable<MenuItemDto>> GetAll()
        => Ok(_svc.GetAll());

    [HttpGet("{id}")] // GET /api/menu/{id} (e.g., /api/menu/1)
    public ActionResult<MenuItemDto> GetById(int id)
    {
        var item = _svc.GetById(id);
        return item is null ? NotFound() : Ok(item);
    }

    [HttpPost] // POST /api/menu
    [Authorize(Roles = "Admin")] // create: Admins only
    public ActionResult<MenuItemDto> Create([FromBody] CreateMenuItemDto dto)
    {
        var created = _svc.Create(dto);
        // Returns 201 Created and provides the location of the new resource
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id}")] // PUT /api/menu/1
    [Authorize(Roles = "Admin")] // update: Admins only
    public IActionResult Update(int id, [FromBody] CreateMenuItemDto dto)
    {
        var ok = _svc.Update(id, dto);
        return ok ? NoContent() : NotFound(); // 204/404
    }

    [HttpDelete("{id}")] // DELETE /api/menu/1
    [Authorize(Roles = "Admin")] // delete: Admins only
    public IActionResult Delete(int id)
    {
        var ok = _svc.Delete(id);
        return ok ? NoContent() : NotFound(); // 204/404
    }
}
