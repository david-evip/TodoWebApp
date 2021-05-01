# TodoWebApp
## Rövid leírás:
> Ahogy a feladat megkérte három rétegű architektúrát használok, REST API-val, aminek több end pointja is van. Front-end nagyrésze javascript, megjelenítéshez material-ui használtam. Back-enden az adatok tárolása MSSQL adatbázisban történik.
## Szükséges packegek/nugetek:
### Front-end:
- `@material-ui/core`
- `react-beautiful-dnd`
### Back-end
#### TodoAPI
- `Microsoft.AspNetCore.SpaServices`
- `Microsoft.AspNetCore.SpaServices.Extension`
- `Microsoft.EntityFrameworkCore`
- `Microsoft.EntityFrameworkCore.Design`
- `Microsoft.EntityFrameworkCore.SqlServer`
- `Microsoft.EntityFrameworkCore.Tools`
#### Entities
- `Microsfot.EntityFrameworkCore`
#### TodoAPI.Tests
- `MSTest.TestFramework`
- `MSTest.TestAdapter`
- `Moq`
- `Microsfot.NET.Test.Sdk`
- `Converlet.collector`

## 1. TodoAPI
---
### - Controllers
Itt található a Column és Todo controller, mindkettő DI használ, repository patternel.
### - Data
Adatbázi feltöltő adatok, ez a programba van meghívva. (seedelés)
### - ClinetApp
Fronted itt található ennek felépítése:
  - src:
    - App.js
      Ez a front-end szíve-lelke, itt hoztam létre az összes függvényt amit később tovább adok a kisebb componenseknek.
  - styles:
    - index.css
      Egyetlen .css fájl itt van, a színek és navbar megjelenésért felelős.
  - Components:
    - Card.js
      Egy kártya lap megjelenítésért felel.
    - Category.js
      Kártyák megjelenítése.
    - Grid.js
      Category-k megjelenítése.
    - Nav.js
      Todo és Column létrehozása itt jelenik meg.
## 2. Repos
---
### - IRepositories
Itt a leglényegesebb az IRepository, hozzá képest az ITodoRepository és a IColumnRepository minimálisan tér el.
### - Repositories
Hasonlóképp az IRepositorieshoz, itt azonban megvannak valósítva az IRepositories-ban megírt Interfészek.
## 3. Entities
---
RepositoryContext, ezt a context használom az adatbázishoz.
### - Models
Itt található a Todo és Column modelje, DataAnnotations használva.
## 4. TodoAPI.Test
---
### - Repositories
TodoRepositoryTest, ebben található két teszt, mindekettő a FindAllAsync() metódust teszteli.
Az egyik sikeresen le kell fusson, a másik pedig nem, azért hogy bizonyítsam nem egy dummy test.
