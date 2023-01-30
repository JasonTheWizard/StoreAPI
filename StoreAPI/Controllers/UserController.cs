using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StoreAPI.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreAPI;
using System;
using System.Text;

[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly StoreDBContext _context;

    public UserController(StoreDBContext context)
    {
        _context = context;
    }

    
    // GET: api/User
    [HttpGet]
    public async Task<ActionResult<IEnumerable<User>>> GetUsers()
    {
        return await _context.Users.ToListAsync();
    }

    
    // GET: api/User/5
    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetUser(int id)
    {
        var user = await _context.Users.FindAsync(id);

        if (user == null)
        {
            return NotFound();
        }

        return user;
    }


    // POST: api/User
    [HttpPost]
    public IActionResult PostUser(User user)
    {
        if (string.IsNullOrEmpty(user.Name))
        {
            return BadRequest("User name is required.");
        }

        if (_context.Users.Any(u => u.Name == user.Name))
        {
            return BadRequest("User name already exists.");
        }

        var password = Encoding.UTF8.GetBytes(user.Password);
        var hashResult = HashUtility.GenerateHash(password);
        user.PasswordHash = hashResult.PasswordHash;
        user.PasswordSalt = hashResult.PasswordSalt;

        _context.Users.Add(user);
        _context.SaveChanges();

        return CreatedAtAction("GetUser", new { id = user.ID }, user);
    }




    // PUT: api/User/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutUser(int id, User user)
    {
        if (id != user.ID)
        {
            return BadRequest();
        }

        _context.Entry(user).State = Microsoft.EntityFrameworkCore.EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!UserExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }
    

    // DELETE: api/User/5
    [HttpDelete("{id}")]
    public async Task<ActionResult<User>> DeleteUser(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound();
        }

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();

        return user;
    }

    private bool UserExists(int id)
    {
        return _context.Users.Any(e => e.ID == id);
    }
}