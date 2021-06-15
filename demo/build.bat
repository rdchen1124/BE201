@REM 初始化一個 npm Project
npm init
@REM 安裝 express
npm install express --save
@REM 安裝 body-parser
npm install body-parser
@REM 安裝 express-session
npm install express-session
@REM 安裝 connect-flash
npm install connect-flash
@REM 安裝 ejs
npm install ejs --save
@REM 安裝 bcrypt
npm install bcrypt
@REM 安裝 sequelize
npm install --save sequelize
@REM 安裝 mysql2 for 連接 mysql 資料庫
npm install --save mysql2
@REM 安裝 sequelize CLI for 依指令建立資料表及對應 model
npm install --save-dev sequelize-cli
@REM 初始化 sequelize Project
npx sequelize-cli init
@REM 新增 user 資料表在 be201_demo
npx sequelize-cli model:generate --name User --attributes username:string,nickname:string,password:string
@REM 觸發 migration 建立 User 資料表在 mysql 資料庫
npx sequelize-cli db:migrate
@REM 新增 cooment 資料表在 be201_demo
npx sequelize-cli model:generate --name Comment --attributes comment:text,UserId:integer
@REM 觸發 migration 建立 Comment 資料表在 mysql 資料庫
npx sequelize-cli db:migrate