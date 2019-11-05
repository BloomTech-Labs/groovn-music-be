export default {
  connect: async () => {
    await mongoose.connect(
      process.env.MONGO_URL,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
      },
      err => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      }
    );
  },
  disconnect: async () => {
    await mongoose.disconnect();
  },
};
