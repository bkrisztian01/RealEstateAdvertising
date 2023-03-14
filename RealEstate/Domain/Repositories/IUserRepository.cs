using Domain.DTOs;
using Domain.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface IUserRepository
    {
        Task<User> GetByUserName(string userName);
        Task<IdentityResult> SignUpAsync(SignUpDTO signUpDTO);
        Task<SignInResult> LoginAsync(LoginDTO loginDTO);
    }
}
