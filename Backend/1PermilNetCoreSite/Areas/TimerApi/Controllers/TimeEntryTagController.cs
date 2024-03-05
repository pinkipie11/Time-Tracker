using Microsoft.AspNetCore.Mvc;
using _1PermilNetCoreSite.Data;
using _1PermilNetCoreSite.Models.TimeTracker;
using Microsoft.EntityFrameworkCore;

namespace _1PermilNetCoreSite.Areas.TimerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TimeEntryTagsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TimeEntryTagsController(ApplicationDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        // POST: api/TimeEntryTags
        [HttpPost]
        public async Task<ActionResult<TimeEntryTag>> PostTimeEntryTag(TimeEntryTag timeEntryTag)
        {
            if (_context.TimeEntryTags == null)
            {
                return Problem("Entity set 'ApplicationDbContext.TimeEntryTags' is null.");
            }
            _context.TimeEntryTags.Add(timeEntryTag);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTimeEntryTag", new { id = timeEntryTag.TimeEntryId }, timeEntryTag);
        }

        // GET: api/TimeEntryTags/ForTimeEntry/5
        [HttpGet("ForTimeEntry/{timeEntryId}")]
        public async Task<ActionResult<IEnumerable<TimeEntryTag>>> GetTagsForTimeEntry(int timeEntryId)
        {
            if (_context.TimeEntryTags == null)
            {
                return NotFound();
            }

            var timeEntryTags = await _context.TimeEntryTags
                                              .Where(tet => tet.TimeEntryId == timeEntryId)
                                              .ToListAsync();

            if (!timeEntryTags.Any())
            {
                return NotFound();
            }

            return timeEntryTags;
        }

        // DELETE: api/TimeEntryTags/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTimeEntryTag(int id)
        {
            if (_context.TimeEntryTags == null)
            {
                return NotFound();
            }
            var timeEntryTag = await _context.TimeEntryTags.FindAsync(id);
            if (timeEntryTag == null)
            {
                return NotFound();
            }

            _context.TimeEntryTags.Remove(timeEntryTag);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PUT: api/TimeEntryTags/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTimeEntryTag(int id, TimeEntryTag updatedTimeEntryTag)
        {
            if (_context.TimeEntryTags == null)
            {
                return NotFound();
            }

            if (id != updatedTimeEntryTag.TimeEntryId)
            {
                return BadRequest();
            }

            _context.Entry(updatedTimeEntryTag).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TimeEntryTagExists(id))
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

        private bool TimeEntryTagExists(int id)
        {
            return _context.TimeEntryTags != null && _context.TimeEntryTags.Any(e => e.TimeEntryId == id);
        }
    }
}
