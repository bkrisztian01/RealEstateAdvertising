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
        Task<IdentityResult> Register(User user, string password);
        Task<SignInResult> Login(string userName, string password);
    }
}
