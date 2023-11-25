## Szükséges szoftverek

A fejlesztői környezet felállításához a következő szoftvereket kell feltelepíteni:
- [Microsoft SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
- [.NET 7 SDK](https://dotnet.microsoft.com/en-us/download/visual-studio-sdks)
- [Node.js](https://nodejs.org/)
## Az alkalmazás elindítása
### Backend
1. Nyissuk meg a `RealEstate/RealEstate.sln` fájlt Visual Studio-ban
2. A `WebApi` projektben az `appsettings.json` fájlban írjuk át a `ConnectionStrings/DefaultConnection` értékét az adatbázisunkhoz tartozó connection string-re
	- Példa connection string: `Data Source=.\\SQLExpress;Initial Catalog=RealEstate;Integrated Security=SSPI;TrustServerCertificate=True;`
3.  Állítsuk át a startup projektet a `WebApi` projektre
	- `Project -> Configure Startup Projects... -> Single startup project -> WebApi`
4. Indítsuk el a solution-t

A Rest API alapértelmezett elérési útvonala `https://localhost:7202`
### Frontend
1. Konzolban nyissuk meg a `frontend` mappát
2. Telepítsük a függőségeket: `npm install`
3. Indítsuk el az alkalmazást: `npm run dev`

A klienst alapértelmezett elérési útvonala `https://localhost:5173`. Ha használsz reklámblokkoló kiegészítőt a böngésződön, akkor érdemes kikapcsolni. 