import express from 'express';
import http from 'http';

const start = async () => {
  const port = 4000;
  const app = express();
};

start().catch((err) => {
  console.log(`oops: ${err.message}`);
});
