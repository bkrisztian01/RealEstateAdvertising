using Domain.DTOs;
using Domain.Models;
using Domain.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Authentication;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Services
{
    public class UserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;

        public UserService(IUserRepository userRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;
        }

        public async Task<IdentityResult> SignUpAsync(SignUpDTO user)
        {
            return await _userRepository.SignUpAsync(user);
        }

        public async Task<TokenDTO> LoginAsync(LoginDTO loginDTO)
        {
            var result = await _userRepository.LoginAsync(loginDTO);

            if (!result.Succeeded)
            {
                throw new AuthenticationException(result.ToString());
            }

            var authClaims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, loginDTO.UserName),
                new Claim(Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };
            var authSigninKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));
            const int expiresIn = 1440; // minutes
            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                claims: authClaims,
                expires: DateTime.Now.AddMinutes(expiresIn),
                signingCredentials: new SigningCredentials(authSigninKey, SecurityAlgorithms.HmacSha256Signature)
                );

            var accessToken =  new JwtSecurityTokenHandler().WriteToken(token);

            return new TokenDTO {
                AccessToken = accessToken,
                ExpiresIn = expiresIn,
                UserName = loginDTO.UserName,
            };
        }
    }
}
