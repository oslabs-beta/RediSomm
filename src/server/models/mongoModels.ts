const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Insert link here to connect to Mongo database
const URI = 'mongodb+srv://redisomm:redisomm123@cluster0.7j1xe.mongodb.net/?retryWrites=true&w=majority';

// Connect to Mongo Database 
mongoose.connect(URI, {
    useNewUrlParser: true,
    dbName: 'RediSomm'
})

.then(() => console.log('Connected to Mongo Database'))
.catch((err: NodeJS.ErrnoException) => console.log(err));



const keyDataSchema = new Schema ({
    key: String,
    value: String,
    expirationTime: { type: String, default: null },
    dataType: String,
    expired: { type: Boolean, default: false },
    keyspaceMiss: Number,
    keyspaceHits: Number, 
    timeAdded: Date,
    oldKeyNames: Array, 
    oldValues: Array,
    manualDelete: Boolean
});

const redisMetricSchema = new Schema ({
    database: String,
    memoryUsage: Number,
    hitRate: Number, 
    hitMissesPerSec: Number,
    keyspaceMiss: Number,
    keyspaceHit: Number,
    metricsDate: Date
});

const KeyData = mongoose.model('KeyData', keyDataSchema);
const RedisMetrics = mongoose.model ('RedisMetrics', redisMetricSchema);

export { 
    KeyData,
    RedisMetrics
 };