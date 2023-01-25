using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StoreAPI.Models;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class ProductController : ControllerBase
{
    private readonly StoreDBContext _context;

    public ProductController(StoreDBContext context)
    {
        _context = context;
    }

    // GET: api/Product
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
    {
        return await _context.Products.ToListAsync();
    }

    // GET: api/Product/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
        var product = await _context.Products.FindAsync(id);

        if (product == null)
        {
            return NotFound();
        }

        return product;
    }

    // POST: api/Product
    [HttpPost]
    public async Task<ActionResult<Product>> PostProduct(Product product)
    {
        _context.Products.Add(product);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetProduct", new { id = product.ID }, product);
    }

    // PUT: api/Product/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutProduct([FromRoute] int id, [FromForm] Product product, [FromForm] IFormFile file)
    {
        if (id != product.ID)
        {
            return BadRequest();
        }
        if (file != null && file.Length > 0)
        {
            var path = Path.Combine(
                        Directory.GetCurrentDirectory(), "wwwroot",
                        file.FileName);

            using (var stream = new FileStream(path, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            product.Image = file.FileName;
        }
        _context.Entry(product).State = Microsoft.EntityFrameworkCore.EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ProductExists(id))
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


    // DELETE: api/Product/5
    [HttpDelete("{id}")]
    public async Task<ActionResult<Product>> DeleteProduct(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null)
        {
            return NotFound();
        }

        _context.Products.Remove(product);
        await _context.SaveChangesAsync();

        return product;
    }

    private bool ProductExists(int id)
    {
        return _context.Products.Any(e => e.ID == id);
    }
}