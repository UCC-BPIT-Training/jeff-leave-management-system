import { errorHandlerMiddleware } from '#src/middleware/index.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import {db} from './db.js'

const app = express();


const STATUS = 'pending'
// Add your global middleware here
app.use(cors());
app.use(bodyParser.json());

app.get('/ping', (req, res) => {
  return res.json({ message: 'PONG' });
});

app.get('/requests', async (req, res) => {
    const result = await db
    .selectFrom('employee_leaves')
    .selectAll().execute();

    console.log('Connection successful:', result);
    res.status(200).send(result)
});

app.get('/requests/:id', async (req, res) => {

  const id = req.params.id
  
  const result = await db
  .selectFrom('employee_leaves')
  .selectAll()
  .where('id', '=', id)
  .executeTakeFirst();

  console.log('Connection successful:', result);
  res.status(200).send(result)
});


app.post('/requests', async (req, res) => {

  

  const { name, email, type, reason, date_from, date_to} = req.body;

  if(!name || !email || !type || !reason || !date_from || !date_to){
    return res.status(400).json({ message: 'Details Incomplete' });
  }

 
  try {
    // Inserting data into 'users' table (make sure to adjust the table name and columns)
    const result = await db
      .insertInto('employee_leaves')
      .values({ 
        name: name, 
        email: email, 
        type: type, 
        reason: reason, 
        date_from: date_from, 
        date_to: date_to, 
        status: STATUS })
      .executeTakeFirst();

      console.log(result)

      if (result.numInsertedOrUpdatedRows == 0){
        return res.status(400).json({
          message: 'Insertion failed'
        });
      }
    // Send response back to the client
      res.status(200).json({
        message: 'Data inserted successfully'
      });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Failed to insert data' });
  }
});


app.put('/requests/:id', async (req, res) => {

  const id = req.params.id
  const { name, email, type, reason, date_from, date_to} = req.body;

  if(!name || !email || !type || !reason || !date_from || !date_to){
    return res.status(400).json({ message: 'Details Incomplete' });
  }

  try {
    const result = await db
    .updateTable('employee_leaves')
    .set({
        name: name, 
        email: email, 
        type: type, 
        reason: reason, 
        date_from: date_from, 
        date_to: date_to
    })
    .where('id', '=', id)
    .where('status', '=' , STATUS)
    .executeTakeFirst()

    console.log(result.numUpdatedRows)

    if(result.numUpdatedRows == 0){
      return res.status(400).json({
        message: 'Update failed'
      });
    }

    // Send response back to the client
    res.status(200).json({
      message: 'Data updated successfully'
    });
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ error: 'Failed to update data' });
  }

})




app.delete('/requests/:id', async (req, res) => {

  const id = req.params.id

  try {

    const result = await db
    .deleteFrom('employee_leaves')
    .where('id', '=', id)
    .where('status', '=', STATUS)
    .executeTakeFirst()

    console.log(result)

    if(result.numDeletedRows == 0){
      return res.status(400).json({
        message: 'Deletion failed'
      });
    }

    // Send response back to the client
    res.status(200).json({
      message: 'Data Deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).json({ error: 'Failed to delete data' });
  }
  

})


// Add more of your routes here

// Error Handling Middleware, should always be the last
app.use(errorHandlerMiddleware);

// ❌ DO NOT REMOVE PART BELOW
export default app;
