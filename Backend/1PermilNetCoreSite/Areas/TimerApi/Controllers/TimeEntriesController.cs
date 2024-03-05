using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using _1PermilNetCoreSite.Data;
using _1PermilNetCoreSite.Models.TimeTracker;
using Microsoft.AspNetCore.Cors;
using System.Security.Claims;
using Newtonsoft.Json;

namespace _1PermilNetCoreSite.Areas.TimerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAll")]
    public class TimeEntriesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<TimeEntriesController> _logger;

        public TimeEntriesController(ApplicationDbContext context, ILogger<TimeEntriesController> logger)
        {
            _context = context;
            _logger = logger;
        }


        // GET: api/TimeEntries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TimeEntry>>> GetTimeEntries()
        {
          if (_context.TimeEntries == null)
          {
              return NotFound();
          }
            var timeEntries = await _context.TimeEntries
                 .Include(te => te.TimeEntryTags)
                     .ThenInclude(tet => tet.Tag)
                 .ToListAsync();

            return timeEntries;
        }

        // Stop time entry by setting the end time to now, the method doesn't have input parameter, but looks for the last time entry for the current user
        [HttpGet("stop")]
        public async Task<ActionResult<TimeEntry>> StopTimeEntry()
        {
            long userId = Convert.ToInt64(User.FindFirstValue(ClaimTypes.NameIdentifier));

            if (_context.TimeEntries == null)
            {
                return NotFound();
            }

            var timeEntry = await _context.TimeEntries.Where(t => t.ApplicationUserId == userId).OrderByDescending(t => t.StartTime).FirstOrDefaultAsync();
            
            if (timeEntry == null)
            {
                return NotFound();
            }
            timeEntry.EndTime = DateTime.Now;
            await _context.SaveChangesAsync();
            return timeEntry;
        }

        // GET: api/TimeEntries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TimeEntry>> GetTimeEntry(long id)
        {
          if (_context.TimeEntries == null)
          {
              return NotFound();
          }
            var timeEntry = await _context.TimeEntries.FindAsync(id);

            if (timeEntry == null)
            {
                return NotFound();
            }

            return timeEntry;
        }

        // PUT: api/TimeEntries/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTimeEntry(long id, TimeEntry timeEntry)
        {
            if (id != timeEntry.Id)
            {
                return BadRequest();
            }

            _context.Entry(timeEntry).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TimeEntryExists(id))
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

        // POST: api/TimeEntries
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TimeEntry>> PostTimeEntry(TimeEntry timeEntry)
        {
            _logger.LogInformation($"Received time entry: {JsonConvert.SerializeObject(timeEntry)}");

            if (_context.TimeEntries == null)
          {
              return Problem("Entity set 'ApplicationDbContext.TimeEntries'  is null.");
          }
            _context.TimeEntries.Add(timeEntry);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTimeEntry", new { id = timeEntry.Id }, timeEntry);
        }

        // DELETE: api/TimeEntries/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTimeEntry(long id)
        {
            if (_context.TimeEntries == null)
            {
                return NotFound();
            }
            var timeEntry = await _context.TimeEntries.FindAsync(id);
            if (timeEntry == null)
            {
                return NotFound();
            }

            _context.TimeEntries.Remove(timeEntry);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TimeEntryExists(long id)
        {
            return (_context.TimeEntries?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
