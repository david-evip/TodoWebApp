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
      > Hosszabban kifejtve, az App egy osztály aminek az állapotában (state) tárolom a columnokat és todokat, ezen felül pár az URL-t hogy bármikor módosítható legyen. Drag-and-drop művelethez mivel a beatufil-dnd használtam, ezért megkövetelte hogy legyen egy onDragEnd függvény ami kezeli a lerakáskor a Todoval történő eseményt. Ezen felül található még CRUD megvalósításához számos handle függvény, amivel az API kéréseket végzem el. Próbáltam mindehol a lehetől egkevesebb API kérést végezni, de például egy Todo létrehozáskaor elkerülhetetlen hogy le is kérjem a POST után, hiszen a todoID-t a back-end intézi.
  - styles:
    - index.css
      Egyetlen .css fájl itt van, a színek és navbar megjelenésért felelős.
  - Components:
    - > A components felépítése fentről lefele: Appon belül van egy Nav és egy MainGrid. A MainGrid a Grid.js-ben található, ezen beül vannak az oszlopok kirenderelve. Minden oszlop egy Category és minden Categoryn belül vannak Card-ok amik pedig a Todok. A CRUD függvények egészen felülről az App.js-ből származnak, mivel az ott lévő állapotot (state) változtatgatom, valamit így könnyeb votl felosztani.
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
