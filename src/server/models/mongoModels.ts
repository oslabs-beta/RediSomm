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
    ttl: {type: Number, default: null },
    expirationTime: { type: Date, default: null },
    dataType: { type: String, default: 'string' },
    expired: { type: Boolean, default: false },
    keyspaceMiss: { type: Number, default: 0 },
    keyspaceHits: { type: Number, default: 0 },
    timeAdded: { type: Date, default: Date.now() },
    oldKeyNames: { type: Array, default: []}, 
    oldValues: { type: Array, default: []},
    manualDelete: { type: Boolean, default: false },
    size: Number
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