using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(BakeryWebsite.Startup))]
namespace BakeryWebsite
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
