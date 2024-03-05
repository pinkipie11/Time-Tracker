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

namespace _1PermilNetCoreSite.Areas.TimerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    // ??? Maybe later enable just specific CORS policy (in Program.cs) [EnableCors("AllowSpecificOrigin")]
    [EnableCors("AllowAll")]
    public class ClientsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ClientsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Clients
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Client>>> GetClients()
        {
            //// ??? testing data
            //return new List<Client>() { 
            //    new Client { Id = 1, Name = "Client1"},
            //    new Client { Id = 2, Name = "Client2"},
            //    new Client { Id = 3, Name = "Client3"}
            //};

            if (_context.Clients == null)
            {
                return new List<Client>(); // Return 0 Clients
            }
            return await _context.Clients.ToListAsync();
        }

        // GET: api/Clients/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Client>> GetClient(long id)
        {
            if (_context.Clients == null)
            {
                return NotFound();
            }
            var Client = await _context.Clients.FindAsync(id);

            if (Client == null)
            {
                return NotFound();
            }

            return Client;
        }

        // PUT: api/Clients/update/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutClient(long id, Client Client)
        {
            // ??? Add logic that client can change only his own records

            if (id != Client.Id)
            {
                return BadRequest();
            }

            _context.Entry(Client).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClientExists(id))
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

        // POST: api/Clients
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Client>> PostClient(Client Client)
        {
            if (_context.Clients == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Clients'  is null.");
            }
            _context.Clients.Add(Client);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetClient", new { id = Client.Id }, Client);
        }

        // DELETE: api/Clients/delete/5
        [HttpDelete("{id}")]
        // [HttpDelete]
        public async Task<IActionResult> DeleteClient([FromRoute] long id)
        {
            // ??? check logged user and add logic that user can only delete his own records
            if (_context.Clients == null)
            {
                return NotFound();
            }

            var client = await _context.Clients
                .Include(c => c.Projects)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (client == null)
            {
                return NotFound();
            }

            // Uklanjanje veze između klijenta i projekata
            foreach (var project in client.Projects)
            {
                project.ClientId = null;
                _context.Entry(project).State = EntityState.Modified;
            }

            _context.Clients.Remove(client);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ClientExists(long id)
        {
            return (_context.Clients?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
