using Domain.DTOs;
using Domain.Services;
using Microsoft.AspNetCore.Mvc;
using System.Security.Authentication;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserService _userService;

        public AccountController(UserService userService)
        {
            _userService = userService;
        }

        [Route("register")]
        [HttpPost]
        public async Task<IActionResult> SignUp([FromBody] SignUpDTO signUpDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var result = await _userService.SignUpAsync(signUpDTO);

                if (!result.Succeeded)
                {
                    return BadRequest(result.Errors);
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return Problem(ex.Message, statusCode: 500);
            }
        }

        [Route("login")]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                return Ok(await _userService.LoginAsync(loginDTO));
            }
            catch (AuthenticationException ex)
            {
                return Unauthorized();
            }
            catch (Exception ex)
            {
                return Problem($"{ex.Message}", statusCode: 500);
            }
        }
    }
}
