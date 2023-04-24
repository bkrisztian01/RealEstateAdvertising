using AutoMapper;
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

namespace DAL.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IMapper _mapper;

        public UserRepository(UserManager<User> userManager, SignInManager<User> signInManager, IMapper mapper)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _mapper = mapper;
        }

        public async Task<User> GetByUserName(string userName)
        {
            return await _userManager.FindByNameAsync(userName);
        }

        public async Task<IdentityResult> SignUpAsync(SignUpDTO signUpDTO)
        {
            return await _userManager.CreateAsync(_mapper.Map<User>(signUpDTO), signUpDTO.Password);
        }

        public async Task<SignInResult> LoginAsync(LoginDTO loginDTO)
        {
            return await _signInManager.PasswordSignInAsync(loginDTO.UserName, loginDTO.Password, false, false);
        }
    }
}
