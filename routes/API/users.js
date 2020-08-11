const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const config = require('config')
const {check,validationResult} = require('express-validator');
const User = require('../../models/User');
const Jwt = require('jsonwebtoken');

