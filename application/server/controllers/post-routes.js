const router = require('express').Router();
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const { client } = require('../db/db');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

