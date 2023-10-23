using Domain.Services;
using Quartz;

namespace WebApi.Jobs
{
    public class CheckSubscriptionsJob : IJob
    {
        private readonly SubscriptionService _subscriptionService;

        public CheckSubscriptionsJob(SubscriptionService subscriptionService)
        {
            _subscriptionService = subscriptionService;
        }

        public Task Execute(IJobExecutionContext context)
        {
            _subscriptionService.CheckSubscriptions();
            return Task.FromResult(true);
        }
    }
}