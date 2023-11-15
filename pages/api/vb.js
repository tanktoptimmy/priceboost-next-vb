import Axios from 'axios';
import mongoose from 'mongoose';
import dbConnect from '@/utils/dbConnect.js'
import { query, variables } from '@/utils/query.js'
import { EventsModel } from "@/models/eventsSchema.js"

const start  = async (req, res) => {
  const { data } = await Axios.post('https://events.green-1-aws.live.skybet.com/graphql', {
    headers: {
      'Content-Type': 'application/json',
    },
    query,
    variables
  })
  console.log(data)
  const {message, status} = await savePriceboosts(data.data)
  res.status(status).json(message);
}

const savePriceboosts = async (boosts) => {
  try {
    console.log("we are going to connect")
    await dbConnect(); 
    console.log("we have CONNECTED")
    const filter = { _id: 5 }; // Assuming _id is present in the fixtureData
    const update = { $set: {_id: 5, events: boosts.events} };
    const options = { upsert: true };
    await EventsModel.updateOne(filter, update, options);
    return {
      message: 'Priceboosts saved successfully',
      status: 200
    };
  } catch (error) {
    return {
      message: 'Priceboosts NOT saved successfully',
      status: 400
    };
    // throw new Error('Error saving Priceboosts:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

export default start;
