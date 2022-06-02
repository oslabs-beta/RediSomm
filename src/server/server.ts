import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
import { apiRouter } from './routes/api';
import { mongoController } from './controller/mongoController';

// const userApiRouter = require('./routers/userApi.js');???
// const reviewApiRouter = require('./routers/reviewApi.js');???
// const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(express.static('../../.Webpack/renderer/assets'));
app.use(require('body-parser').json());
app.use(express.urlencoded());
// app.use(cookieParser());

//PERHAPS READ 6 FOR US
// app.get('/usertable', (req, res) => {
//     let db = require('./models/model.js');
//     const query =
//         `SELECT * FROM "public"."public.User"`;
//     db.query(query)
//       .then(data => {
//         console.log(data.rows)
//         res.status(200).json(data.rows)
//       })
//   })

app.use('/api', apiRouter);

//READ 1 
app.get('/', mongoController.getAllRecords, ({req, res} : {req: any, res: any}) => {
    res.status(200).send(res.locals.allRecords);
}); 

//   app.use('/api/user', userApiRouter);
//   app.use('/api/review', reviewApiRouter);
  
  
//   app.use("*", (req, res) => {
//     console.log('react will handle it')
//     res.sendFile(path.join(__dirname, '../public/build/index.html'));
//   });
  
// GLOBAL ERROR HANDLER
//   app.use((err, req, res, next) => {
//     const defaultErr = {
//       log: 'Express error handler caught unknown middleware error',
//       status: 400,
//       message: { err: 'An error occurred' },
//     };
//     const errorObj = Object.assign({}, defaultErr, err);
//     console.log(errorObj.log);
//     return res.status(errorObj.status).json(errorObj.message);
//   });
  










app.listen(PORT, ()=> {
    console.log(`listening on port ${PORT}`)
});

module.exports = app;