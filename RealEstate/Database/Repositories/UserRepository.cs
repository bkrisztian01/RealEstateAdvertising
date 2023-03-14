using Domain.DTOs;
using Domain.Models;
using Domain.Repositories;
using Microsoft.AspNetCore.Authentication.OAuth.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Database.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;

        public UserRepository(UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
        }

        public async Task<User> GetByUserName(string userName)
        {
            return await _userManager.FindByNameAsync(userName);
        }

        public async Task<IdentityResult> SignUpAsync(SignUpDTO signUpDTO)
        {
            var user = new User()
            {
                UserName = signUpDTO.UserName,
                FullName = signUpDTO.FullName,
                Email = signUpDTO.Email,
                PhoneNumber = signUpDTO.PhoneNumber,
            };

            return await _userManager.CreateAsync(user, signUpDTO.Password);
        }

        public async Task<SignInResult> LoginAsync(LoginDTO loginDTO)
        {
            return await _signInManager.PasswordSignInAsync(loginDTO.UserName, loginDTO.Password, false, false);
        }
    }
}
