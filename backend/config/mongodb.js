import mongoose from "mongoose";

const DEFAULT_LOCAL_URI = 'mongodb://127.0.0.1:27017/Tamanna';

const connectDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log('DB Connected');
    });

    const primaryUri = process.env.MONGODB_URI && process.env.MONGODB_URI.trim() !== ''
        ? process.env.MONGODB_URI
        : null;

    const tryConnect = async (uri) => {
        try {
            await mongoose.connect(uri, {
                // use the new URL parser and unified topology by default in modern drivers
                // options can be adjusted if needed
                // keep minimal options so environment-specific URIs still work
            });
            console.log(`Connected to MongoDB: ${uri.startsWith('mongodb://127.0.0.1') ? 'local' : 'remote'}`);
            return true;
        } catch (err) {
            console.error(`Failed to connect using ${uri.startsWith('mongodb://127.0.0.1') ? 'local' : 'remote'} URI.`);
            console.error(err && err.message ? err.message : err);
            return false;
        }
    };

    // Try primary (cloud) URI if provided
    if (primaryUri) {
        const ok = await tryConnect(primaryUri);
        if (ok) return;
        console.warn('Primary MongoDB connection failed. Attempting local fallback...');
    } else {
        console.warn('No MONGODB_URI provided in environment; attempting local MongoDB at', DEFAULT_LOCAL_URI);
    }

    // Try local fallback
    const fallbackOk = await tryConnect(DEFAULT_LOCAL_URI);
    if (fallbackOk) return;

    // If we reach here, both connections failed. Provide clear instructions and exit.
    console.error('\nFATAL: Could not connect to MongoDB (primary or local).');
    console.error(' - If you intended to use MongoDB Atlas, ensure MONGODB_URI is set and your network allows DNS SRV lookups.');
    console.error(' - For local development, start a local MongoDB server or change the DEFAULT_LOCAL_URI in config.');
    // Exit with non-zero so the caller / process manager knows startup failed.
    process.exit(1);
};

export default connectDB;