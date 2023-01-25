using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StoreAPI.Models;

namespace StoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductCategoryController : ControllerBase
    {
        private readonly StoreDBContext _context;

        public ProductCategoryController(StoreDBContext context)
        {
            _context = context;
        }

        // GET: api/ProductCategory
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductCategory>>> GetProductCategories()
        {
            return await _context.ProductCategories.ToListAsync();
        }


        // GET: api/ProductCategory/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductCategory([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var productCategory = await _context.ProductCategories.FindAsync(id);

            if (productCategory == null)
            {
                return NotFound();
            }

            return Ok(productCategory);
        }

        // POST: api/ProductCategory
        [HttpPost]
        public async Task<IActionResult> PostProductCategory([FromBody] ProductCategory productCategory)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.ProductCategories.Add(productCategory);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProductCategory", new { id = productCategory.ID }, productCategory);
        }
        

        // PUT: api/ProductCategory/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductCategory([FromRoute] int id, [FromBody] ProductCategory productCategory)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != productCategory.ID)
            {
                return BadRequest();
            }

            _context.Entry(productCategory).State = Microsoft.EntityFrameworkCore.EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductCategoryExists(id))
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



        // DELETE: api/ProductCategory/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductCategory([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var productCategory = await _context.ProductCategories.FindAsync(id);
            if (productCategory == null)
            {
                return NotFound();
            }

            _context.ProductCategories.Remove(productCategory);
            await _context.SaveChangesAsync();

            return Ok(productCategory);
        }


        private bool ProductCategoryExists(int id)
        {
            return _context.ProductCategories.Any(e => e.ID == id);
        }
    }
}