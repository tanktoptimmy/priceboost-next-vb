import mongoose from 'mongoose';

const outcomeSchema = new mongoose.Schema({
  originalOutcome: {
    outcomeId: Number,
    status: {
      suspended: Boolean,
    },
    price: {
      den: Number,
      num: Number,
      decimal: Number,
    },
  },
  outcomeId: Number,
  name: String,
  price: {
    decimal: Number,
    num: Number,
    den: Number,
  },
  status: {
    suspended: Boolean,
    displayable: Boolean,
  },
});

const marketSchema = new mongoose.Schema({
  marketId: Number,
  name: String,
  outcomes: [outcomeSchema],
});

const eventTypeSchema = new mongoose.Schema({
  name: String,
  typeId: Number,
});

const eventSchema = new mongoose.Schema({
  name: String,
  startTime: Date,
  eventId: Number,
  classId: Number,
  eventType: eventTypeSchema,
  markets: [marketSchema],
});

const eventsSchema = new mongoose.Schema({
  _id: Number,
  events: [eventSchema],
});

export const EventsModel = mongoose.models.priceboosts || mongoose.model('priceboosts', eventsSchema);

