using Microsoft.AspNetCore.Mvc;
using _1PermilNetCoreSite.Data;
using _1PermilNetCoreSite.Models;
using _1PermilNetCoreSite.Dtos;
using _1PermilNetCoreSite.Models.TimeTracker;
using Microsoft.EntityFrameworkCore;

namespace _1PermilNetCoreSite.Areas.TimerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TagsController(ApplicationDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        // GET: api/Tags
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TagDto>>> GetTags()
        {
            return await _context!.Tags!
                .Select(t => new TagDto { TagId = t.TagId, Name = t.Name, Description = t.Description })
                .ToListAsync();
        }

        // POST: api/Tags
        [HttpPost]
        public async Task<ActionResult<TagDto>> PostTag(TagDto tagDto)
        {
            var tag = new Tag { Name = tagDto.Name, Description = tagDto.Description };
            _context!.Tags!.Add(tag);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTag", new { id = tag.TagId }, tagDto);
        }

        // PUT: api/Tags/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTag(int id, TagDto tagDto)
        {
            if (id != tagDto.TagId)
            {
                return BadRequest();
            }

            var tag = await _context!.Tags!.FindAsync(id);
            if (tag == null)
            {
                return NotFound();
            }

            tag.Name = tagDto.Name;
            tag.Description = tagDto.Description;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Tags/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTag(int id)
        {
            var tag = await _context!.Tags!.FindAsync(id);
            if (tag == null)
            {
                return NotFound();
            }

            _context.Tags.Remove(tag);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
