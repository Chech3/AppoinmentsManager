using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AppoinmentsManager.Server.Data;
using AppoinmentsManager.Server.Data.Models;

namespace AppoinmentsManager.Server.Controllers
{
    [Route("api/appointment")]
    [ApiController]
    public class AppoinmentsController(AppDbContext context) : ControllerBase
    {
        private readonly AppDbContext _context = context;

        // GET: api/Appoinments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Appoinments>>> GetAppoinments()
        {
            return await _context.Appoinments.Where(e => !e.Deleted && !e.Done).ToListAsync();
        }

        // GET: api/Appoinments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Appoinments>> GetAppoinments(int id)
        {
            var appoinments = await _context.Appoinments.FindAsync(id);

            if (appoinments == null)
            {
                return NotFound("No Data Found");
            }

            return appoinments;
        }


        // POST: api/appointment/filters
        [HttpPost("filters")]
        public async Task<ActionResult<IEnumerable<Appoinments>>> FilteredAppointments(Filter filters)
        {
            if (_context.Appoinments == null)
            {
                return NotFound("No Data Found!");
            }

            List<Appoinments> allData = await _context.Appoinments.ToListAsync();

            if (filters.All)
            {
                return allData;
            }

            if (filters.LevelOfImportance != null)
            {
                allData = allData.Where(e => e.LevelOfImportance == filters.LevelOfImportance).ToList();
            }

            if (filters.SpecifiedDate != null)
            {
                allData = allData.Where(e => e.Date == filters.SpecifiedDate).ToList();
            }

            if (filters.StartDate != null && filters.EndDate != null)
            {
                allData = allData.Where(e => e.Date >= filters.StartDate && e.Date <= filters.EndDate).ToList();
            }

            if (filters.SpecifiedTime != null)
            {
                allData = allData.Where(e => e.Time == filters.SpecifiedTime).ToList();
            }

            allData = allData.Where(e => e.Done == filters.Done).ToList();
            allData = allData.Where(e => e.Deleted == filters.Deleted).ToList();

            return allData;
        }


        // PUT: api/Appoinments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAppoinments(int id, Appoinments appoinments)
        {
            if (id != appoinments.ID)
            {
                return BadRequest("You are trying to modidy the wrong enpoint");
            }

            //_context.Entry(appoinments).State = EntityState.Modified;

            try
            {
                Appoinments? entry_ = await _context.Appoinments.FindAsync(appoinments.ID);

                if (entry_ != null)
                {
                    entry_.Title = appoinments.Title;
                    entry_.Description = appoinments.Description;
                    entry_.ModifiedDate = DateTime.Now;
                    entry_.Date = appoinments.Date;
                    entry_.Address = appoinments.Address;
                    entry_.Time = appoinments.Time;
                    entry_.Deleted = appoinments.Deleted;
                    entry_.Done = appoinments.Done;
                    entry_.LevelOfImportance = appoinments.LevelOfImportance;
                }

                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AppoinmentsExists(id))
                {
                    return NotFound("The appoinment with the ID " + "" + id + "does not exist");
                }
                else
                {
                    throw;
                }
            }

            return Ok("Updated successfully");
        }

        // POST: api/Appoinments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Appoinments>> PostAppoinments(Appoinments appoinments)
        {
            if (_context.Appoinments == null)
            {
                return Problem("Entity set appointment is null");
            }

            try
            {
                _context.Appoinments.Add(appoinments);
                await _context.SaveChangesAsync();

            }
            catch (DbUpdateConcurrencyException e)
            {
                return BadRequest("An error occurred while saving the appointment." + e.Message);
            }

            return CreatedAtAction("GetAppoinments", new { id = appoinments.ID }, appoinments);
        }

        // DELETE: api/Appoinments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAppoinments(int id)
        {
            var appoinments = await _context.Appoinments.FindAsync(id);
            if (appoinments == null)
            {
                return NotFound("No Data Found");
            }

            _context.Appoinments.Remove(appoinments);
            await _context.SaveChangesAsync();

            return Ok("Appointment deleted successfully");
        }

        private bool AppoinmentsExists(int id)
        {
            return _context.Appoinments.Any(e => e.ID == id);
        }
    }
}
